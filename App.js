/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import Stack from './src/navigation'
import { createAppContainer } from 'react-navigation'
import store from './src/store'
import { Provider } from 'react-redux'
import { getItem } from './src/utils'
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAuthenticate: false
    }
  }
  async componentWillMount () {
    let user = await getItem('@user')
    if (!user.hasOwnProperty('error')) {
      if (user.item !== null) {
        this.setState({ isAuthenticate: true })
      }
    }
  }

  render () {
    let Container = createAppContainer(Stack(this.state.isAuthenticate))
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}
