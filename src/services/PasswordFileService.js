const fs = window.fs

export default class PasswordFileService {
  initialize (passwordFilePath) {
    this.passwordFilePath = passwordFilePath
  }

  isFileExisting () {
    return fs.existsSync(this.passwordFilePath)
  }

  read () {
    return new Promise((resolve, reject) => {
      fs.readFile(
        this.passwordFilePath,
        { encoding: 'utf8' },
        (err, data) => err ? reject(err) : resolve(data)
      )
    })
  }

  write (content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        this.passwordFilePath,
        content,
        { encoding: 'utf8', flag: 'w+' },
        err => err ? reject(err) : resolve()
      )
    })
  }
}
