import React, { Component } from 'react'
import Stack from './src/navigation'
import { createAppContainer } from 'react-navigation'
import store from './src/store'
import { Provider } from 'react-redux'
import { getItem } from './src/utils'
import { BarIndicator, SkypeIndicator } from 'react-native-indicators'
import { View } from 'react-native'
import theme from './src/theme'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuthenticate: false,
      appReady: false
    }
  }
  async componentWillMount () {
    let user = await getItem('@user')
    if (!user.hasOwnProperty('error')) {
      if (user.item !== null) {
        return this.setState({ isAuthenticate: true, appReady: true })
      }
    }
    this.setState({ appReady: true })
  }

  render () {
    let Container = createAppContainer(Stack(this.state.isAuthenticate))
    if (this.state.appReady) {
      return (
        <Provider store={store}>
          <Container />
        </Provider>
      )
    }
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.blue, justifyContent: 'center', alignItems: 'center' }}>
        <BarIndicator count={5} size={40} color={theme.colors.yellow} />
      </View>
    )
  }
}
