import {
  getDistanceInMonths,
  getMovementsInMonth,
  lostMonthsInTransfersToSavingsAccountsRegister
} from '../../src/api/helpers/dateHelper'
import moment from 'moment/moment'

const decemberMovements = require('../data/Movements-December_MOCK.json')
const januaryMovements = require('../data/Movements-January_MOCK.json')
const februaryMovements = require('../data/Movements-February_Mock.json')
const marchMovements = require('../data/Movements-March_MOCK.json')

const allMonths = decemberMovements
.concat(januaryMovements)
.concat(februaryMovements)
.concat(marchMovements)

describe('Distance in months', () => {
  const marchDate = new Date('2022-03-25')

  const aprilDate = new Date('2022-04-25')

  const mayDate = new Date('2022-05-25')

  const julyDate = new Date('2022-07-25')


  it('A month should have passed', () => {
    const distance = getDistanceInMonths(marchDate, aprilDate)

    expect(distance).toBe(1)
  })

  it('Two month should have passed', () => {
    const distance = getDistanceInMonths(mayDate, julyDate)

    expect(distance).toBe(2)
  })

  it('No month should have passed', () => {
    const almostAMonth = new Date('2022-04-20')

    const distance = getDistanceInMonths(marchDate, almostAMonth)

    expect(distance).toBe(0)
  })
})

describe('Checking lost months in Transfers to Savings Accounts Register', () => {
  it('Should be no lost months', () => {
    const lastMonthRegistered = new Date('2020-03-20')

    const lostMonths = lostMonthsInTransfersToSavingsAccountsRegister(lastMonthRegistered, lastMonthRegistered)

    expect(lostMonths.length).toBeFalsy()
  })

  it('Should have one lost month', () => {
    const lastMonthRegistered = moment('2020-03-20')

    const newestDate = moment('2020-04-20')

    const lostMonths = lostMonthsInTransfersToSavingsAccountsRegister(lastMonthRegistered, newestDate)

    expect(lostMonths.length).toBe(1)
  })

  it('Should have six lost month', () => {
    const lastMonthRegistered = moment('2020-03-20')

    const newestDate = moment('2020-09-20')

    const lostMonths = lostMonthsInTransfersToSavingsAccountsRegister(lastMonthRegistered, newestDate)

    expect(lostMonths.length).toBe(6)
  })

  it('Should have a year', () => {
    const lastMonthRegistered = moment('2020-03-20')

    const newestDate = moment('2021-03-20')

    const lostMonths = lostMonthsInTransfersToSavingsAccountsRegister(lastMonthRegistered, newestDate)

    expect(lostMonths.length).toBe(12)
  })
})

describe('Movements in month', () => {
  it('Should be have a 31 movements', () => {
    const movements = getMovementsInMonth(allMonths, moment('2023-01-05', 'YYYY-MM-DD'))

    expect(movements.length).toBe(31)
  })

  it('Should be have a 62 movements', () => {
    const firstMovements = getMovementsInMonth(allMonths, moment('2023-01-05', 'YYYY-MM-DD'))

    const secondMovements = getMovementsInMonth(allMonths, moment('2023-03-05', 'YYYY-MM-DD'))

    const movements = firstMovements.concat(secondMovements)

    expect(movements.length).toBe(62)
  })
})
