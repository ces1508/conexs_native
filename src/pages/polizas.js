import React, { Component } from 'react'
import PolizasList from '../components/polizasList'
import { connect } from 'react-redux'
import { getPolizas } from '../actions/polizas/creators'
import { saveItem, getItem } from '../utils/storage'
import { setToken } from '../actions/login'

const mapStateToProps = state => ({ ...state.polizas, token: state.login.token })
const mapDispatchToProps = {
  getPolizas,
  setToken
}

class PolizasScreen extends Component {
  async componentDidMount () {
    await this.setToken()
    this.getPolizas()
  }

  async setToken () {
    let token = await getItem('@user')
    if (!token.hasOwnProperty('error') && this.props.token === null) {
      this.props.setToken(token.item)
    }
  }

  async getPolizas () {
    let { token } = this.props
    await saveItem('@user', token)
    this.props.getPolizas(this.props.token)
  }

  render () {
    let { polizas, onFetching } = this.props
    return (
      <PolizasList data={polizas} navigation={this.props.navigation} onFetching={onFetching} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolizasScreen)
