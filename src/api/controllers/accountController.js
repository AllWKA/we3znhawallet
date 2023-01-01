import { readLocalFile, saveLocalFile } from '@/api/controllers/fileManager'

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

  accounts.push({ id, account })

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
