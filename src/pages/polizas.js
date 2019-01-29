import React, { Component } from 'react'
import PolizasList from '../components/polizasList'
import { getItem } from '../utils'
import { connect } from 'react-redux'
import { getPolizas } from '../actions/polizas/creators'

const mapStateToProps = state => ({ ...state.polizas })
const mapDispatchToProps = {
  getPolizas
}

class PolizasScreen extends Component {
  async componentDidMount () {
    this.getPolizas()
  }
  async getPolizas () {
    let user = await getItem('@user')
    if (!user.hasOwnProperty('error')) {
      this.props.getPolizas(user.item)
    }
  }

  render () {
    let { polizas, onFetching } = this.props
    return (
      <PolizasList data={polizas} navigation={this.props.navigation} onFetching={onFetching} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolizasScreen)
