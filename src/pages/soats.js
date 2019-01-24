import React, { Component } from 'react'
import Datasource from '../api'
import PolizasList from '../components/polizasList'
import { getItem } from '../utils'

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
    let user = await getItem('@user')
    let { data, status } = await Datasource.getPolizas(user.item)
    if (data.error) {
      console.warn('tenemos un error')
    } else {
      this.setState({ soats: data.filter(item => item.formato === 'SOAT') })
    }
  }

  render () {
    return <PolizasList data={this.state.soats} navigation={this.props.navigation} />
  }
}
