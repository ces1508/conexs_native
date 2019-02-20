import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import DescriptionItem from '../components/description'
import HTML from 'react-native-render-html'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ ...state.sinisters })

class SinisterDetailPage extends Component {
  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.currentSinister !== this.props.currentSinister) {
  //     this.props.navigation.navigate('sinisterDetail')
  //   }
  // }
  render () {
    let { num_siniestro, causa, titular, observaciones } = this.props.currentSinister
    return (
      <View style={styles.container}>
        <View>
          <DescriptionItem title='Causa' value='hola mundo' />
          <DescriptionItem title='Numero de siniestro' value={num_siniestro} />
          <DescriptionItem title='Causa' value={causa} />
          <DescriptionItem title='Titular' value={titular} />
          <Text style={styles.text}>Observaciones:</Text>
          <HTML html={observaciones} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default connect(mapStateToProps)(SinisterDetailPage)
