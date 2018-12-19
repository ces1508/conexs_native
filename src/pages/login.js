import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native'
import Input from '../components/input'
class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      document: ''
    }
  }
  render () {
    return (
      <ScrollView>
        <View>
          <Input
            name={'document'}
            value={this.state.document}
            handleText={(text) => this.setState({ document: text })}
          />
        </View>
      </ScrollView>
    )
  }
}

export default LoginScreen

const styles = StyleSheet.create({
})
