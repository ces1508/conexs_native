import React, { Component } from 'react'
import PolizasList from '../components/polizasList'
import { getItem } from '../utils'
import { connect } from 'react-redux'
import { getPolizas } from '../actions/polizas/creators'
import { View } from 'react-native'
import { DoubleBounce } from 'react-native-loader'

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
    let { polizas, isFetching } = this.props
    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <DoubleBounce size={30} color='#012b95' />
        </View>
      )
    }
    return (
      <PolizasList data={polizas} navigation={this.props.navigation} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolizasScreen)
