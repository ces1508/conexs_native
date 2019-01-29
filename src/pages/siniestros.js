import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { getSinisters } from '../actions/sinisters/creators'
import SinistersList from '../components/sinisters'

const mapStateToProps = state => ({ ...state.sinisters })
const mapDispatachToProps = {
  getSinisters
}

class SiniestrosScreen extends Component {
  componentDidMount () {
    let { poliza } = this.props.navigation.state.params
    this.props.getSinisters(poliza)
  }
  render () {
    let { data, onFetching } = this.props
    return (
      <SinistersList data={data} onFetching={onFetching} />
    )
  }
}

export default connect(mapStateToProps, mapDispatachToProps)(SiniestrosScreen)
