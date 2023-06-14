import {
  getDistanceInMonths,
  getMovementsInMonth,
  lostMonthsInTransfersToSavingsAccountsRegister
} from '../../src/api/helpers/dateHelper'
import moment from 'moment/moment'
import { createAccount, deleteAccount, getAccount } from '../../src/api/controllers/accountController'
import { writeFileSync } from 'fs'

const decemberMovements = require('../data/Movements-December_MOCK.json')
const januaryMovements = require('../data/Movements-January_MOCK.json')
const februaryMovements = require('../data/Movements-February_Mock.json')
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
    writeFileSync(`${localFilesPath}/accounts.json`, '')
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
    writeFileSync(`${localFilesPath}/accounts.json`, JSON.stringify([exampleAccount], null, 4))
  })

  afterAll(() => {
    writeFileSync(`${localFilesPath}/accounts.json`, '')
  })

  it('Get non-existing account', () => {
    const nonExistingId = 99

    const account = getAccount(nonExistingId)

    expect(account).toBeUndefined()
  })

  it('Get account', () => {
    const id = 0

    const account = getAccount(id)

    expect(account).not.toBeUndefined()
  })
})

describe('Delete account', () => {
  beforeEach(() => {
    writeFileSync(`${localFilesPath}/accounts.json`, JSON.stringify([exampleAccount], null, 4))
  })

  afterAll(() => {
    writeFileSync(`${localFilesPath}/accounts.json`, '')
  })

  it('Can not delete non-existing account', () => {
    const nonExistingId = 99

    expect(() => deleteAccount(nonExistingId)).toThrow()
  })

  it('Delete account', () => {
    const id = 0

    expect(() => deleteAccount(id)).not.toThrow()
  })
})
