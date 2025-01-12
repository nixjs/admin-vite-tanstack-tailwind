import { LocalStorageKey } from '@/consts/localstorage'
import { LocalStorageStatic as LocalStorage } from '@nixjs23n6/web-storage'

export class AuthStorageServices {
  static storeAccessToken(value: string, key?: string) {
    LocalStorage.setItem(key ?? LocalStorageKey.ACCESS_TOKEN, value)
  }

  static getAccessToken(key?: string) {
    return LocalStorage.getItem<string>(key ?? LocalStorageKey.ACCESS_TOKEN)
  }

  static removeAccessToken(key?: string) {
    LocalStorage.removeItem(key ?? LocalStorageKey.ACCESS_TOKEN)
  }

  static storeRefreshToken(value: string, key?: string) {
    LocalStorage.setItem(key ?? LocalStorageKey.REFRESH_TOKEN, value)
  }

  static getRefreshToken(key?: string) {
    return LocalStorage.getItem<string>(key ?? LocalStorageKey.REFRESH_TOKEN)
  }

  static removeRefreshToken(key?: string) {
    LocalStorage.removeItem(key ?? LocalStorageKey.REFRESH_TOKEN)
  }
}
