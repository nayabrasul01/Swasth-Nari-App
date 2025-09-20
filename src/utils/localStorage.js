import CryptoJS from "crypto-js";

const SECRET_KEY = "T84WD5ht7UqU8dndpA4eJTmLXU83XoPm";

// export function setItem(key, value) {
//   localStorage.setItem(key, JSON.stringify(value));
// }
// export function getItem(key, fallback = null) {
//   const v = localStorage.getItem(key);
//   if (!v) return fallback;
//   try {
//     return JSON.parse(v);
//   } catch (e) {
//     return fallback;
//   }
// }

export function setItem(key, value) {
  try {
    const stringValue = JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(stringValue, SECRET_KEY).toString();
    localStorage.setItem(key, encrypted);
  } catch (e) {
    console.error("Encryption failed:", e);
  }
}

export function getItem(key, fallback = null) {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return fallback;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  } catch (e) {
    console.error("Decryption failed:", e);
    return fallback;
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}
