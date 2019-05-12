const crypto = window.crypto

export default class CryptographyService {
  async initialize (password) {
    const hashedPassword = await crypto.subtle.digest({ name: 'SHA-256' }, new TextEncoder().encode(password))
    this.cryptoKey = await crypto.subtle.importKey(
      'raw', hashedPassword, { name: 'AES-CBC', length: 256 }, false, ['encrypt', 'decrypt']
    )
  }

  async encrypt (clearText) {
    const iv = crypto.getRandomValues(new Uint8Array(16))

    const encryptedContent = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: iv }, this.cryptoKey, new TextEncoder().encode(clearText)
    )

    const encryptedContentWithIv = new Uint8Array(encryptedContent.byteLength + iv.length)
    encryptedContentWithIv.set(iv)
    encryptedContentWithIv.set(new Uint8Array(encryptedContent), iv.length)

    return JSON.stringify(Array.from(encryptedContentWithIv))
  }

  async decrypt (encryptedText) {
    const encryptedContentWithIv = Uint8Array.from(JSON.parse(encryptedText))
    const iv = encryptedContentWithIv.slice(0, 16)
    const encryptedContent = encryptedContentWithIv.slice(16, encryptedContentWithIv.length)

    const decryptedContent = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: iv }, this.cryptoKey, encryptedContent
    )

    return new TextDecoder('utf-8').decode(decryptedContent)
  }
}
