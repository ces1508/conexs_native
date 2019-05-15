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

  async makeRequest (url, method = 'GET', body = {}, params = {}, headers = {}) {
    try {
      console.log("making request")
      let response = await axios({
        method: method,
        url: `${this.apiUrl}/${url}`,
        data: body,
        params,
        headers
      })
      return { data: response.data, status: response.status }
    } catch (e) {
      return { data: e.response.data, status: e.response.status }
    }
  }

  signin (data) {
    return this.makeRequest('auth', 'POST', data)
  }
  getPolizas (token, path = 'polizas', params) {
    console.log("params =========== ", params)
    return this.makeRequest(`${path}/`, 'GET', {}, { ...params }, {
      'Authorization': `Bearer ${token}`
    })
  }
  getProfile (token) {
    return this.makeRequest('profile/', 'GET', {}, {}, {
      'Authorization': `Bearer ${token}`
    })
  }
  getSinisters (token, poliza) {
    return this.makeRequest(`siniestros/${poliza}`, 'GET', {}, {}, {
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
