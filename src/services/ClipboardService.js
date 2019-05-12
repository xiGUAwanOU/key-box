class ClipboardService {
  constructor () {
    this.timeout = null
  }

  copy (text) {
    this.copyToClipboard(text)

    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(() => { this.copyToClipboard(' ') }, 10000)
  }

  copyToClipboard (text) {
    const hiddenTextarea = document.createElement('textarea')
    hiddenTextarea.style.opacity = '0'
    hiddenTextarea.style.position = 'fixed'
    hiddenTextarea.style.left = '0'
    hiddenTextarea.style.top = '0'
    hiddenTextarea.value = text
    document.body.appendChild(hiddenTextarea)
    hiddenTextarea.focus()
    hiddenTextarea.select()
    document.execCommand('copy')
    document.body.removeChild(hiddenTextarea)
  }
}

export default new ClipboardService()
