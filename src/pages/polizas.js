import React, { Component } from 'react'
import PolizasList from '../components/polizasList'
import Datasource from '../api'
import { getItem } from '../utils'
import { connect } from 'react-redux'
import { getPolizas } from '../actions/polizas/creators'

const mapStateToProps = state => ({ ...state.polizas })
const mapDispatchToProps = {
  getPolizas
}

class PolizasScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      polizas: [],
      data: []
    }
  }

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
    let { polizas } = this.props
    return (
      <PolizasList data={polizas} navigation={this.props.navigation} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolizasScreen)
