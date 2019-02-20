import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSinisters } from '../actions/sinisters/creators'
import SinistersList from '../components/sinisters'

const mapStateToProps = state => ({ ...state.sinisters, token: state.login.token })
const mapDispatachToProps = {
  getSinisters
}

class SiniestrosScreen extends Component {
  componentDidMount () {
    let { poliza } = this.props.navigation.state.params
    let { token } = this.props
    this.props.getSinisters(token, poliza)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentSinister !== this.props.currentSinister) {
      this.props.navigation.navigate('sinisterDetail')
    }
  }

  render () {
    let { data, onFetching } = this.props
    return (
      <SinistersList data={data} onFetching={onFetching} />
    )
  }
}

export default connect(mapStateToProps, mapDispatachToProps)(SiniestrosScreen)
