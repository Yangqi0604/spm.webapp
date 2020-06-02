/**
//  * @name:lijiahui
 */
const KEY_PREFIX = 'spm.web.'

export default {
  KEYS: {
    TOKEN: `${KEY_PREFIX}token`,
    USER_INFO: `${KEY_PREFIX}user.info`,
  },

  get: function (key, isSession) {
    if (!this.isLocalStorage()) {
      return undefined 
    }
    let value = this.getStorage(isSession).getItem(key)
    if (value) return JSON.parse(value)
    return undefined
  },

  set: function (key, value, isSession) {
    if (!this.isLocalStorage()) {
      return undefined
    }
    value = JSON.stringify(value)
    this.getStorage(isSession).setItem(key, value)
  },

  remove: function (key, isSession) {
    if (!this.isLocalStorage()) return undefined
    this.getStorage(isSession).removeItem(key)
  },

  removeAll: function (keys = []) {
    Array.from(keys.concat(['TOKEN', 'USER_INFO'])).forEach(item =>
      this.remove(this.KEYS[item])
    )
  },

  getStorage: function (isSession) {
    return isSession ? sessionStorage : localStorage
  },

  isLocalStorage: function () {
    try {
      if (!window.localStorage) {
        console.warn('不支持本地存储')
        return false
      }
      return true
    } catch (e) {
      console.warn('本地存储已关闭')
      return false
    }
  }
}
