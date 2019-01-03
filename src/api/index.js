import axios from 'axios'
import setup from './config'

class Datasource {
  constructor (config) {
    this.apiUrl = config.apiUrl
  }

  async makeRequest (url, method = 'get', body = {}, params = {}, headers = {}) {
    try {
      let response = await axios({
        method,
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

  getPolizas (cedula) {
    return this.makeRequest('/list-polizas.php', 'POST', { user: cedula })
  }
  getProfile (cedula) {
    return this.makeRequest('/api-perfil.php', 'POST', { cedula })
  }
}

export default new Datasource(setup)
