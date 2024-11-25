import CryptoJS from 'crypto-js'
//import.meta.env.VITE_PRIVATE_KEY_ENCRYPT,
/**
 * Mã hóa văn bản đơn giản đã cho bằng mã hóa AES bằng khóa riêng.
 *
 * @param {string} plainText - Văn bản đơn giản được mã hóa.
 * @return {string} Văn bản được mã hóa.
 */
export const encryptAESWithKey = (plainText = '') => {
  return CryptoJS.AES.encrypt(
    plainText,
    `${import.meta.env.VITE_PRIVATE_KEY_ENCRYPT}`,
  ).toString()
}

/**
 * Giải mã dữ liệu bằng AES + privateKey.
 *
 * @param {string} cipherText - Văn bản đã mã hóa.
 * @return {string} Văn bản được giải mã.
 */
export const decryptAESWithKey = (cipherText = '') => {
  const bytes = CryptoJS.AES.decrypt(
    cipherText,
    `${import.meta.env.VITE_PRIVATE_KEY_ENCRYPT}`,
  )
  return bytes.toString(CryptoJS.enc.Utf8)
}
