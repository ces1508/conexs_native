import axios from 'axios'
import setup from './config'

class Datasource {
  constructor (config) {
    this.apiUrl = config.apiUrl
  }

  async makeRequest (url, method = 'get', body = {}, params = {}, headers = {}) {
    try {
      let response = await axios({
        method: method,
        url: `${this.apiUrl}/${url}`,
        data: body,
        params,
        headers
      })
      return { data: response.data, status: response.status }
    } catch (e) {
      console.log(e.response)
      return { data: e.response.data, status: e.response.status }
    }
  }

  signin (data) {
    return this.makeRequest('auth', 'POST', data)
  }
  getPolizas (token, path = 'polizas', skip) {
    return this.makeRequest(path, 'get', {}, { skip }, {
      'Authorization': `Bearer ${token}`
    })
  }
  getProfile (token) {
    return this.makeRequest('profile', 'get', {}, {}, {
      'Authorization': `Bearer ${token}`
    })
  }
  getSinisters (token, poliza) {
    return this.makeRequest(`siniestros/${poliza}`, 'get', {}, {}, {
      'Authorization': `Bearer ${token}`
    })
  }
  notifications (token, skip) {
    return this.makeRequest('notifications', 'get', {}, { skip }, {
      'Authorization': `Bearer ${token}`
    })
  }
  savePushToken (token, regId) {
    return this.makeRequest('devices', 'post', { regId }, {}, {
      'Authorization': `Bearer ${token}`
    })
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
