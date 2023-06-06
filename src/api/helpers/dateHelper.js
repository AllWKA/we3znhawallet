import moment from 'moment/moment'

export function getMovementsInMonth(movements, date) {
  const format = 'YYYY/MM/DD'

  const daysInMonth = date.daysInMonth()

  const month = date.month() + 1

  const year = date.year()

  const startDate = moment(`1/${month}/${year}`, format)

  const endDate = moment(`${daysInMonth}/${month}/${year}`, format)

  console.log('start date', startDate)
  console.log('end date', endDate)

  return movements
    .filter(movement =>
      moment(movement.date, format).isBetween(startDate, endDate)
    )
}

export function getDistanceInMonths(oldestDate, newestDate) {
  const momentDate1 = moment(newestDate)

  const momentDate2 = moment(oldestDate)

  const diff = momentDate1.diff(momentDate2, 'months', true)

  return Number.parseInt(diff.toString())
}

export function lostMonthsInTransfersToSavingsAccountsRegister(lastMonthRegistered, newestDate) {
  const numberOfMonthsPassed = getDistanceInMonths(lastMonthRegistered, newestDate)

  const lostMonths = []

  if (numberOfMonthsPassed <= 0) {
    return lostMonths
  }

  for (let i = 1; i <= numberOfMonthsPassed; i++) {
    const lostMonth = lastMonthRegistered.clone().add(i, 'M')

    lostMonths.push(lostMonth)
  }

  return lostMonths
}
