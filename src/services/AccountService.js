import CryptographyService from '@/services/CryptographyService'
import PasswordFileService from '@/services/PasswordFileService'

const os = window.os
const path = window.path

class AccountService {
  async initialize (password) {
    const passwordFilePath = path.join(os.homedir(), '.shoppinglist3')

    this.cryptographyService = new CryptographyService()
    await this.cryptographyService.initialize(password)

    this.passwordFileService = new PasswordFileService()
    await this.passwordFileService.initialize(passwordFilePath)

    try {
      await this.getAll()
      return true
    } catch (err) {
      return false
    }
  }

  async mergeFromFile (filePath) {
    const anotherPasswordFileService = new PasswordFileService()
    await anotherPasswordFileService.initialize(filePath)
    if (!anotherPasswordFileService.isFileExisting()) {
      return
    }

    const encryptedFileContent = await anotherPasswordFileService.read()
    const accountsInAnotherFile = JSON.parse(await this.cryptographyService.decrypt(encryptedFileContent))

    const accounts = await this.getAll()

    accountsInAnotherFile.forEach(accountInAnotherFile => {
      const matchingAccountIndex = accounts.findIndex(account => account.id === accountInAnotherFile.id)
      if (matchingAccountIndex >= 0) {
        if (accounts[matchingAccountIndex].modifiedAt < accountInAnotherFile.modifiedAt) {
          accounts[matchingAccountIndex] = accountInAnotherFile
        }
      } else {
        accounts.push(accountInAnotherFile)
      }
    })

    await this.saveAll(accounts)
  }

  getNew () {
    return {
      id: this.generateRandomId(),
      name: 'New Account',
      username: '',
      password: this.generateRandomPassword(),
      description: '',
      modifiedAt: ''
    }
  }

  async getAll () {
    if (!this.passwordFileService.isFileExisting()) {
      await this.writeToFile([])
    }
    return this.readFromFile()
  }

  async saveAll (accounts) {
    await this.writeToFile(accounts)
  }

  async readFromFile () {
    const encryptedFileContent = await this.passwordFileService.read()
    return JSON.parse(await this.cryptographyService.decrypt(encryptedFileContent))
  }

  async writeToFile (content) {
    const encryptedFileContent = await this.cryptographyService.encrypt(JSON.stringify(content))
    await this.passwordFileService.write(encryptedFileContent)
  }

  generateRandomPassword () {
    const AVAILABLE_CHARACTERS = '!@#$%^&*()_+-=,.?[]|{}ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const ID_DIGITS = 16

    return this.generateRandomString(AVAILABLE_CHARACTERS, ID_DIGITS)
  }

  generateRandomId () {
    const AVAILABLE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const ID_DIGITS = 16

    return this.generateRandomString(AVAILABLE_CHARACTERS, ID_DIGITS)
  }

  generateRandomString (availableCharacters, length) {
    let randomString = ''
    for (let i = 0; i < length; i++) {
      randomString += availableCharacters.charAt(Math.floor(Math.random() * availableCharacters.length))
    }

    return randomString
  }
}

export default new AccountService()
