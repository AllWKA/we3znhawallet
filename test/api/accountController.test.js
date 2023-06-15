import {
  getDistanceInMonths,
  getMovementsInMonth,
  lostMonthsInTransfersToSavingsAccountsRegister
} from '../../src/api/helpers/dateHelper'
import moment from 'moment/moment'
import { createAccount, deleteAccount, getAccount } from '../../src/api/controllers/accountController'
import { readFileSync, writeFileSync } from 'fs'
import { updateAccount } from "../../src/api/helpers/accountHelper";

const decemberMovements = require('../data/Movements-December_MOCK.json')
const januaryMovements = require('../data/Movements-January_MOCK.json')
const februaryMovements = require('../data/Movements-February_MOCK.json')
const marchMovements = require('../data/Movements-March_MOCK.json')

const allMonths = decemberMovements
.concat(januaryMovements)
.concat(februaryMovements)
.concat(marchMovements)

const exampleAccount = {
  "id": 0,
  "cardNumbers": "1233",
  "type": "account",
  "movements": [],
  "budgets": [],
  "savingsAccounts": []
}

const localFilesPath = `${__dirname}/../localFiles-Mock/we3znhawallet`

const accountFilePath = `${localFilesPath}/accounts.json`

const nonExistingId = 99

const accountId = 0

jest.mock('electron', () => ({
  app: {
    getPath: jest.fn(() => `${__dirname}/../localFiles-Mock`)
  }
}))

describe('Distance in months', () => {
  const marchDate = new Date('2022-03-25')

  const aprilDate = new Date('2022-04-25')

  const mayDate = new Date('2022-05-25')

  const julyDate = new Date('2022-07-25')


  it('A month has passed', () => {
    const distance = getDistanceInMonths(marchDate, aprilDate)

    expect(distance).toBe(1)
  })

  it('Two month has passed', () => {
    const distance = getDistanceInMonths(mayDate, julyDate)

    expect(distance).toBe(2)
  })

  it('No month has passed', () => {
    const almostAMonth = new Date('2022-04-20')

    const distance = getDistanceInMonths(marchDate, almostAMonth)

    expect(distance).toBe(0)
  })
})

describe('Checking lost months in Transfers to Savings Accounts Register', () => {
  it('No lost months', () => {
    const lastMonthRegistered = new Date('2020-03-20')

    const lostMonths = lostMonthsInTransfersToSavingsAccountsRegister(lastMonthRegistered, lastMonthRegistered)

    expect(lostMonths.length).toBeFalsy()
  })

  it('One lost month', () => {
    const lastMonthRegistered = moment('2020-03-20')

    const newestDate = moment('2020-04-20')

    const lostMonths = lostMonthsInTransfersToSavingsAccountsRegister(lastMonthRegistered, newestDate)

    expect(lostMonths.length).toBe(1)
  })

  it('Six lost month', () => {
    const lastMonthRegistered = moment('2020-03-20')

    const newestDate = moment('2020-09-20')

    const lostMonths = lostMonthsInTransfersToSavingsAccountsRegister(lastMonthRegistered, newestDate)

    expect(lostMonths.length).toBe(6)
  })

  it('A year lost', () => {
    const lastMonthRegistered = moment('2020-03-20')

    const newestDate = moment('2021-03-20')

    const lostMonths = lostMonthsInTransfersToSavingsAccountsRegister(lastMonthRegistered, newestDate)

    expect(lostMonths.length).toBe(12)
  })
})

describe('Movements in month', () => {
  it('Has 31 movements', () => {
    const movements = getMovementsInMonth(allMonths, moment('2023-01-05', 'YYYY-MM-DD'))

    expect(movements.length).toBe(31)
  })

  it('Has 62 movements', () => {
    const firstMovements = getMovementsInMonth(allMonths, moment('2023-01-05', 'YYYY-MM-DD'))

    const secondMovements = getMovementsInMonth(allMonths, moment('2023-03-05', 'YYYY-MM-DD'))

    const movements = firstMovements.concat(secondMovements)

    expect(movements.length).toBe(62)
  })
})

describe('Create account', () => {
  afterAll(() => {
    writeFileSync(accountFilePath, '')
  })

  it('Throws an error for an undefined account number', () => {
    const undefinedCardNumberAccount = { ...exampleAccount, cardNumbers: undefined }

    expect(() => createAccount(undefinedCardNumberAccount)).toThrow()
  })

  it('Throws an error for an null account number', () => {
    const nullCardNumberAccount = { ...exampleAccount, cardNumbers: null }

    expect(() => createAccount(nullCardNumberAccount)).toThrow()
  })

  it('Create account', () => {
    expect(() => createAccount(exampleAccount)).not.toThrow()
  })
})

describe('Get account', () => {
  beforeAll(() => {
    writeFileSync(accountFilePath, JSON.stringify([exampleAccount], null, 4))
  })

  afterAll(() => {
    writeFileSync(accountFilePath, '')
  })

  it('Get non-existing account', () => {
    const account = getAccount(nonExistingId)

    expect(account).toBeUndefined()
  })

  it('Get account', () => {
    const account = getAccount(accountId)

    expect(account).not.toBeUndefined()
  })
})

describe('Delete account', () => {
  beforeEach(() => {
    writeFileSync(accountFilePath, JSON.stringify([exampleAccount], null, 4))
  })

  afterAll(() => {
    writeFileSync(accountFilePath, '')
  })

  it('Can not delete non-existing account', () => {
    expect(() => deleteAccount(nonExistingId)).toThrow()
  })

  it('Delete account', () => {
    expect(() => deleteAccount(accountId)).not.toThrow()
  })
})

describe('Update account', () => {
  beforeEach(() => {
    writeFileSync(accountFilePath, JSON.stringify([exampleAccount], null, 4))
  })

  afterAll(() => {
    writeFileSync(accountFilePath, '')
  })

  it('Update non-existing account', () => {
    expect(() => updateAccount({ ...exampleAccount, id: nonExistingId })).toThrow()
  })

  it('Movements sorted', () => {
    const disorderedMovements = [februaryMovements[0], marchMovements[0], januaryMovements[0]]

    const account = { ...exampleAccount, movements: disorderedMovements }

    updateAccount(account)

    const sortedMovements = JSON.parse(readFileSync(accountFilePath).toString())[0].movements

    expect(sortedMovements[0].date).toEqual("2023-03-01")

    expect(sortedMovements[1].date).toEqual("2023-02-01")

    expect(sortedMovements[2].date).toEqual("2023-01-01")
  })

  it('Update the current balance', () => {
    const account = { ...exampleAccount, movements: [].concat(januaryMovements, marchMovements) }

    updateAccount(account)

    const currentBalance = JSON.parse(readFileSync(accountFilePath).toString())[0].currentBalance

    const expectedCurrentBalance = marchMovements[marchMovements.length - 1].available

    expect(currentBalance).toBe(expectedCurrentBalance)
  })
})
