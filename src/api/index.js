import axios from 'axios'
import setup from './config'

axios.interceptors.request.use(config => {
  console.log(config)
  return config
}, err => {
  console.log('error ============' , err)
  return Promise.reject(err)
})

axios.interceptors.response.use(res => {
  console.log('========= response ========= ', res)
  return res
}, err => {
  console.log('======== error response =========', err)
  return Promise.reject(err)
})


class Datasource {
  constructor (config) {
    this.apiUrl = config.apiUrl
  }

  async makeRequest (url, method = 'GET', body = null, params = null, headers = {}) {
    try {
      let options = {
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        method
      }
      if (body) options.body = JSON.stringify(body)
      let fullPath = `${this.apiUrl}/${url}`
      if (params) {
        fullPath = `${fullPath}?${this.getQueryString(params)}`
      }
      console.log(fullPath)
      let response = await fetch(fullPath, options)
      let json = await response.json()
      return { data: json, status: response.status }
    } catch (e) {
      console.log(e)
      return { data: e.response.data, status: e.response.status }
    }
  }

  getQueryString(params) {
    var esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  }

  signin (data) {
    return this.makeRequest('auth', 'POST', data)
  }
  getPolizas (token, path = 'polizas', params) {
    return this.makeRequest(path, 'GET', null, { ...params }, {
      'Authorization': `Bearer ${token}`
    })
  }
  getProfile (token) {
    return this.makeRequest('profile/', 'GET', null, null, {
      'Authorization': `Bearer ${token}`
    })
  }
  getSinisters (token, poliza) {
    return this.makeRequest(`siniestros/${poliza}`, 'GET', null, null, {
      'Authorization': `Bearer ${token}`
    })
  }
  notifications (token, skip) {
    return this.makeRequest('notifications', 'GET', {}, { skip }, {
      'Authorization': `Bearer ${token}`
    })
  }
  savePushToken (token, regId) {
    // return this.makeRequest('devices', 'post', { regId }, {}, {
    //   'Authorization': `Bearer ${token}`
    // })
    return true
  }
  async sendEmail (data) {
    try {
      await axios.post('http://api.conexseguros.com/send-mail.php', data)
      return true
    } catch (e) {
      return false
    }
  }
}

export default new Datasource(setup)
