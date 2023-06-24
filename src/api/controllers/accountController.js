import { readLocalFile, saveLocalFile } from '../helpers/fileManager'
import excelToJson from 'convert-excel-to-json'
import uniqid from 'uniqid'
import { readFileSync } from 'fs'
import { formatMovements, updateAccount } from "../helpers/accountHelper";

const accountStorageFileName = 'accounts.json'

export function createAccount(account) {
  if (!(account.cardNumbers && account.cardNumbers.length === 4 && typeof account.cardNumbers === 'string')) {
    throw new Error('Invalid account')
  }

  if (!account.currentBalance) {
    account.currentBalance = 0
  }

  let accounts

  try {
    accounts = readLocalFile(accountStorageFileName)
  } catch (e) {
    accounts = []
  }

  const id = accounts.length

  // TODO: CRUD rules
  accounts.push({ id, ...account, movements: [], budgets: [], savingsAccounts: [], rules: [] })

  try {
    saveLocalFile(accounts, accountStorageFileName)
  } catch (e) {
    throw new Error(`Can not save account storage, ${e.message}`)
  }
}

export function getAccountList() {
  //TODO: test?
  let accounts

  try {
    accounts = readLocalFile(accountStorageFileName)
  } catch (e) {
    throw new Error('Can not parse account storage')
  }

  return accounts
}

export function getAccount(id) {
  let accounts

  const parsedId = Number.parseInt(id)

  try {
    accounts = readLocalFile(accountStorageFileName)

    return accounts.find(account => account.id === parsedId)
  } catch (e) {
    throw new Error('Can not parse account storage')
  }
}

export function deleteAccount(id) {
  let accounts

  const parsedId = Number.parseInt(id)

  try {
    accounts = readLocalFile(accountStorageFileName)

    const accountsLength = accounts.length

    accounts = accounts.filter(account => account.id !== parsedId)

    if (accounts.length === accountsLength) {
      throw new Error('No account deletes')
    }

    saveLocalFile(accounts, accountStorageFileName)
  } catch (e) {
    throw new Error(`Can not delete account: ${e.message}`)
  }
}

export function addMovementsInAccount(movements, accountId) {
  const account = getAccount(accountId)

  account.movements = account.movements.concat(movements)

  updateAccount(account)
}

export function processBankAccountMovements(filePath, accountId) {
  let account

  try {
    account = getAccount(accountId)
  } catch (e) {
    throw new Error(e.message)
  }

  let fileBuffer

  try {
    fileBuffer = readFileSync(filePath)
  } catch (e) {
    throw new Error(`Can not read excel file: ${e.message}`)
  }

  const excelResults = excelToJson({
    source: fileBuffer,
    header: {
      rows: 5
    },
    columnToKey: {
      B: 'Fecha',
      C: 'F.Valor',
      D: 'Concepto',
      E: 'Movimiento',
      F: 'Importe',
      G: 'Divisa',
      H: 'Disponible',
      I: 'Divisa',
      J: 'Observaciones'
    }
  })

  const newMovements = excelResults[Object.keys(excelResults)[0]]

  const repeatedMovement = []

  const addedMovement = []

  const accountMovements = account.movements

  for (let i = 0; i < newMovements.length; i++) {
    const newMovement = newMovements[i]

    const date = new Date(newMovement.Fecha)

    newMovement.FechaCruda = Date.parse(date.toString())

    newMovement.Fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    const movementFound = accountMovements.find(movement =>
      movement.Fecha === newMovement.Fecha &&
      movement.concept === newMovement.concept &&
      movement.amount === newMovement.amount &&
      movement.currency === newMovement.currency &&
      movement.available === newMovement.available
    )

    if (movementFound) {
      repeatedMovement.push(newMovement)
    } else {
      addedMovement.push(newMovement)
    }
  }

  return {
    repeatedMovement: formatMovements(repeatedMovement),
    addedMovement: formatMovements(addedMovement)
  }
}

export function createNewBudget(budget, accountId) {
  let account

  try {
    account = getAccount(accountId)
  } catch (e) {
    throw new Error(e.message)
  }

  const budgetAlreadyExist = account.budgets.find(budgetIn => budgetIn.name === budget.name)

  if (budgetAlreadyExist) {
    throw new Error('Budget already exist')
  }

  account.budgets.push({ ...budget, currentSpent: 0, id: uniqid() })

  updateAccount(account)
}

export function deleteBudget(budget, accountId) {
  let account

  try {
    account = getAccount(accountId)
  } catch (e) {
    throw new Error(e.message)
  }

  account.budgets = account.budgets.filter(budgetIn => budgetIn.name !== budget.name)

  updateAccount(account)
}

export function updateBudget(budget, accountId) {
  let account

  try {
    account = getAccount(accountId)
  } catch (e) {
    throw new Error(e.message)
  }

  account.budgets = account.budgets.map(budgetIn => budgetIn.id === budget.id ? budget : budgetIn)

  updateAccount(account)
}

export function createSavesAccount(savingsAccount, accountId) {
  let account

  try {
    account = getAccount(accountId)
  } catch (e) {
    throw new Error(e.message)
  }

  const savingsAccountAlreadyExist = account
  .savingsAccounts
  .find(savingsAccountInList => savingsAccountInList.name === savingsAccount.name)

  if (!savingsAccountAlreadyExist) {
    throw new Error('Savings account already exist')
  }

  account.savingsAccounts.push(savingsAccount)

  updateAccount(account)
}

export function updateSavesAccounts() {
  // TODO: loop through the rules and transfer money to saves accounts
}
