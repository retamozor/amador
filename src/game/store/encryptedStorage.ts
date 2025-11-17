import { createJSONStorage } from "zustand/middleware";
import CryptoJS from "crypto-js";

// Usa una clave secreta que NO se comparta en el repo
const SECRET_KEY = "clave-super-secreta";

function encrypt(str: string): string {
  return CryptoJS.AES.encrypt(str, SECRET_KEY).toString();
}

function decrypt(str: string): string {
  const bytes = CryptoJS.AES.decrypt(str, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Storage personalizado para persist
export const encryptedStorage = createJSONStorage(() => ({
  getItem: (name: string) => {
    const encrypted = localStorage.getItem(name);
    if (!encrypted) return null;

    try {
      const json = decrypt(encrypted);
      return JSON.parse(json);
    } catch (e) {
      console.error("Error desencriptando save:", e);
      return null;
    }
  },

  setItem: (name: string, value: unknown) => {
    const json = JSON.stringify(value);
    const encrypted = encrypt(json);
    localStorage.setItem(name, encrypted);
  },

  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
}));

