import axios from 'axios'
import { API } from '@commons/constants'
import isEmpty from 'lodash/isEmpty'

const Service = {
  API: API,

  REQUEST_CACHE: {}, // API请求池

  METHODS: {
    GET: 'get',
    POST: 'post',
    DELETE: 'delete',
    PATCH: 'patch',
    PUT: 'put'
  },

  generateDefaultConfig () {
    return {
      isRequest: false
    }
  },
  has: function (key) {
    return !!this.REQUEST_CACHE[key]
  },

  gather (config) {
    let key =
      config.url +
      (isEmpty(config.params) ? '' : JSON.stringify(config.params))
    if (!this.has(key)) {
      let ajaxConfig = this.generateDefaultConfig()
      Object.assign(ajaxConfig, config, { key })
      this.REQUEST_CACHE[key] = ajaxConfig
    }
    return key
  },

  get (url, params, method) {
    let key = this.gather({ url, params, method: method || this.METHODS.GET })
    return this.request(key)
  },

  post (url, params) {
    return this.get(url, params, this.METHODS.POST)
  },

  put (url, params) {
    return this.get(url, params, this.METHODS.PUT)
  },

  delete (url) {
    return this.get(url, {}, this.METHODS.DELETE)
  },

  patch (url, params) {
    return this.get(url, params, this.METHODS.PATCH)
  },

  request (key) {
    let config = this.REQUEST_CACHE[key]
    return new Promise((resolve, reject) => {
      if (!config.isRequest) {
        config.isRequest = true
        axios[config.method.toLowerCase()](this.API + config.url, config.params)
          .then(res => {
            this.reset(key)
            resolve(res)
          })
          .catch(err => {
            this.reset(key)
            return reject(err)
          })
      }
    })
  },

  reset (key) {
    this.REQUEST_CACHE[key] = null
  }
}

/**
 * 对外暴露的API
 */

export default {
  get: Service.get.bind(Service),
  post: Service.post.bind(Service),
  delete: Service.delete.bind(Service),
  patch: Service.patch.bind(Service),
  put: Service.put.bind(Service)
}
