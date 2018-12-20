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
export default class App extends Component {
  render () {
    let Container = createAppContainer(Stack(false))
    return <Container />
  }
}
