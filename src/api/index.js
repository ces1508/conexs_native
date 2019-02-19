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
      return { data: e.response.data, status: e.response.status }
    }
  }

  signin (data) {
    return this.makeRequest('auth', 'POST', data)
  }
  getPolizas (token, path = 'polizas') {
    return this.makeRequest(path, 'get', {}, {}, {
      'Authorization': `Bearer ${token}`
    })
  }
  getProfile (token) {
    return this.makeRequest('profile', 'get', {}, {}, {
      'Authorization': `Bearer ${token}`
    })
  }
  hasSinisters (poliza) {
    return this.makeRequest('/count_siniestros.php', 'get', {}, { poliza })
  }
  getSinisters (poliza) {
    return this.makeRequest('/listSiniestros.php', 'get', {}, { poliza })
  }
}

export default new Datasource(setup)
