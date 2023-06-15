import { saveLocalFile } from "./fileManager"
import moment from "moment"
import { getMovementsInMonth } from "./dateHelper"
import { getAccountList } from "../controllers/accountController"

const accountStorageFileName = 'accounts.json'

export function updateAccount(account) {
  const accountList = getAccountList()

  const accountsPosition = accountList.map(account => account.id).indexOf(account.id)

  if (accountsPosition === -1) {
    throw new Error('Can not find account position')
  }

  account.movements = account.movements.sort((a, b) => new moment(b.date, 'YYYY-MM-DD') - new moment(a.date, 'YYYY-MM-DD'))

  account.currentBalance = account.movements[0].available

  account = updateBudgets(account)

  accountList[accountsPosition] = account

  saveLocalFile(accountList, accountStorageFileName)
}

export function formatMovements(movements) {
  return movements.map(movement => {
    return {
      date: movement.Fecha,
      concept: movement.Concepto,
      amount: movement.Importe,
      currency: movement.Divisa,
      available: movement.Disponible
    }
  })
}

function updateBudgets(account) {
  const currentDate = moment()

  const movements = getMovementsInMonth(account.movements, currentDate)

  account.budgets = account.budgets.map(budget => {
    const imports = []

    budget.associatedConcepts.forEach(associatedConcept => {
      movements
      .filter(movement => movement.concept === associatedConcept)
      .map(movement => movement.amount)
      .forEach(importQuantity => imports.push(importQuantity))
    })
    // TODO:  check why is dont give negative numbers
    budget.currentSpent = Math.round(imports.reduce((sum, a) => sum + a, 0) * 100) / 100

    return budget
  })

  return account
}
