import { readLocalFile, saveLocalFile } from '@/api/controllers/fileManager'

const accountStorageFile = 'accounts'

export function createAccount(account) {
  if (!validateAccount) {
    throw new Error('Invalid account')
  }

  let accounts

  try {
    accounts = JSON.parse(readLocalFile(accountStorageFile))
  } catch (e) {
    throw new Error('Can not parse account storage')
  }

  const id = accounts.length

  accounts.push({ id, account})

  try {
    saveLocalFile(account, accountStorageFile)
  } catch (e) {
    throw new Error('Can not save account storage')
  }
}

function validateAccount(account) {
  return account.lastFourCardNumber && account.lastFourCardNumber.length === 4 && typeof account.lastFourCardNumber === 'string' && account.currentBalance && typeof account.currentBalance === 'number'
}
