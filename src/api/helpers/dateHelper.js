import moment from 'moment/moment'

export function getMovementsInMonth(movements, date) {
  const startDate = date.clone().startOf('month')

  const endDate = date.clone().endOf('month')

  return movements.filter(movement =>
    moment(movement.date).isBetween(startDate, endDate, null, '[]')
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
