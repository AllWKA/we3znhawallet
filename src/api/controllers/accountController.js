import {readLocalFile, saveLocalFile} from '@/api/controllers/fileManager'
import excelToJson from 'convert-excel-to-json'
import moment from 'moment'
import {readFileSync} from 'fs'

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

  accounts.push({id, ...account, movements: [], budgets: []})

  try {
    saveLocalFile(accounts, accountStorageFileName)
  } catch (e) {
    throw new Error('Can not save account storage')
  }
}

export function getAccountList() {
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

  try {
    accounts = readLocalFile(accountStorageFileName)

    return accounts.find(account => account.id.toString() === id)
  } catch (e) {
    throw new Error('Can not parse account storage')
  }
}

export function deleteAccount(id) {
  let accounts

  try {
    accounts = readLocalFile(accountStorageFileName)

    accounts = accounts.filter(account => account.id.toString() !== id)

    saveLocalFile(accounts, accountStorageFileName)
  } catch (e) {
    throw new Error('Can not delete account')
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

  const fileBuffer = readFileSync(filePath)

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
      movement.Concepto === newMovement.Concepto &&
      movement.Importe === newMovement.Importe &&
      movement.Divisa === newMovement.Divisa &&
      movement.Disponible === newMovement.Disponible
    )

    if (movementFound) {
      repeatedMovement.push(newMovement)
    } else {
      addedMovement.push(newMovement)
    }
  }

  return {
    repeatedMovement,
    addedMovement
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

  account.budgets.push({...budget, currentSpent: 0})

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

function updateAccount(account) {
  const accountList = getAccountList()

  const accountsPosition = accountList.map(account => account.id).indexOf(account.id)

  account.movements = account.movements.sort((a, b) => b.FechaCruda - a.FechaCruda)

  account.currentBalance = account.movements[0].Disponible

  account = updateBudgets(account)

  accountList[accountsPosition] = account

  saveLocalFile(accountList, accountStorageFileName)
}

function updateBudgets(account) {
  const movements = getMovementsInCurrentMonth(account.movements)

  account.budgets = account.budgets.map(budget => {
    const imports = []

    budget.associatedConcepts.forEach(associatedConcept => {
      movements
        .filter(movement => movement.Concepto === associatedConcept)
        .map(movement => movement.Importe)
        .forEach(importQuantity => imports.push(importQuantity))
    })

    budget.currentSpent = imports.reduce((sum, a) => sum + a, 0)

    return budget
  })

  return account
}

function getMovementsInCurrentMonth(movements) {
  const format = 'DD/MM/YYYY'

  const daysInMonth = moment().daysInMonth()

  const currentMonth = moment().month() + 1

  const currentYear = moment().year()

  const startDate = moment(`1/${currentMonth}/${currentYear}`, format)

  const endDate = moment(`${daysInMonth}/${currentMonth}/${currentYear}`, format)

  return movements
    .filter(movement =>
      moment(movement.Fecha, format).isBetween(startDate, endDate)
    )
}
