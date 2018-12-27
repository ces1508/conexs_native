import React, { Component } from 'react'
import { View, Text } from 'react-native'
import SoatList from '../components/polizasList'
import Datasource from '../api'
import PolizasList from '../components/polizasList';

export default class Soats extends Component {
  constructor (props) {
    super(props)
    this.state = {
      soats: []
    }
  }

  componentDidMount () {
    this.getPolizas()
  }

  async getPolizas () {
    let { data, status } = await Datasource.getPolizas('36065458')
    if (data.error) {
      console.warn('tenemos un error')
    } else {
      this.setState({ soats: data.filter(item => item.formato === 'SOAT') })
    }
  }

  render () {
    return <PolizasList data={this.state.soats} />
  }
}
