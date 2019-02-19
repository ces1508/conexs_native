import React, { Component } from 'react'
import PolizasList from '../components/polizasList'
import { connect } from 'react-redux'
import { getSoats } from '../actions/soats/creators'

const mapStateToProps = state => ({ ...state.soats, token: state.login.token })
const mapsDispatchToProps = {
  getSoats
}

class Soats extends Component {
  componentDidMount () {
    this.props.getSoats(this.props.token)
  }
  render () {
    let { soats, onFetching } = this.props
    return <PolizasList data={soats} navigation={this.props.navigation} onFetching={onFetching} />
  }
}

export default connect(mapStateToProps, mapsDispatchToProps)(Soats)
