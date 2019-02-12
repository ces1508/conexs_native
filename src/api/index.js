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

  signin (user, method = 'cedula') {
    let data = {}
    if (method === 'cedula') {
      data.cedula = user
    } else {
      data.placa = user
    }
    return this.makeRequest('loginapi.php', 'POST', data, { auth: method })
  }
  getPolizas (cedula) {
    return this.makeRequest('/list-polizas.php', 'POST', { user: cedula })
  }
  getProfile (cedula) {
    return this.makeRequest('/api-perfil.php', 'POST', { cedula })
  }
  hasSinisters (poliza) {
    return this.makeRequest('/count_siniestros.php', 'get', {}, { poliza })
  }
  getSinisters (poliza) {
    return this.makeRequest('/listSiniestros.php', 'get', {}, { poliza })
  }
}

export default new Datasource(setup)
