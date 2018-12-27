import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList
} from 'react-native'
import PolizasList from '../components/polizasList'
import Datasource from '../api'

class PolizasScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      polizas: [],
      data: []
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
      this.setState({ data, polizas: data.filter(item => item.formato !== 'SOAT') })
    }
  }

  render () {
    return (
      <PolizasList data={this.state.polizas} />
    )
  }
}

export default PolizasScreen
