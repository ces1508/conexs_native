import React, { Component } from 'react'
import Stack from './src/navigation'
import { createAppContainer } from 'react-navigation'
import store from './src/store'
import { Provider } from 'react-redux'
import { getItem } from './src/utils'
import { BarIndicator } from 'react-native-indicators'
import { View } from 'react-native'
import theme from './src/theme'
import { setToken } from './src/actions/login'
import OneSignal from 'react-native-onesignal'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuthenticate: false,
      appReady: false
    }
    OneSignal.init('1be32096-2997-4d1d-b97c-59b64fa5e6ae', { kOSSettingsKeyAutoPrompt: true })
    OneSignal.inFocusDisplaying(0)
    OneSignal.enableSound(true)
  }

  async componentWillMount () {
    let user = await getItem('@user')
    if (!user.hasOwnProperty('error')) {
      if (user.item !== null) {
        store.dispatch(setToken(user.item))
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
