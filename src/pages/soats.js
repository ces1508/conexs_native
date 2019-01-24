import React, { Component } from 'react'
import PolizasList from '../components/polizasList'
import { connect } from 'react-redux'
import { getPolizas } from '../actions/polizas/creators'

const mapStateToProps = state => ({ ...state.polizas })
const mapsDispatchToProps = {
  getPolizas
}

class Soats extends Component {
  render () {
    let { soats } = this.props.soats
    return <PolizasList data={soats} navigation={this.props.navigation} />
  }
}

export default connect(mapStateToProps, mapsDispatchToProps)(Soats)
