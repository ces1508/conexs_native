import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ ...state.sinisters })

class SinisterDetailPage extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.currentSinister !== this.props.currentSinister) {
      this.props.navigation.navigate('sinisterDetail')
    }
  }
  render () {
    return (
      <View>
        <Text>hola mundo</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})

export default connect(mapStateToProps)(SinisterDetailPage)
