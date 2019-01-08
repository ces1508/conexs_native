import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DescriptionItem from '../components/description'
import theme from '../theme'
import Datasource from '../api'

class PolizaDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sinisters: 0
    }
    this.getSinisters = this.getSinisters.bind(this)
  }
  static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.title }) // eslint-disable-line

  async getSinisters () {
    let { poliza } = this.props.navigation.state.params
    let { data } = await Datasource.hasSinisters(poliza)
    data = data[0]
    this.setState({ sinisters: data['count(*)'] })
  }

  componentDidMount () {
    this.getSinisters()
  }

  sinisters () {
    if (this.state.sinisters > 0) {
      return (
        <TouchableHighlight style={styles.sinistersSection}>
          <Text style={styles.text}>Ver {this.state.sinisters} Siniestros </Text>
        </TouchableHighlight>
      )
    }
    return null
  }

  renderDescription () {
    let { titular, cedula_nit, placas, tipo_poliza, poliza } = this.props.navigation.state.params
    let description = { Titular: titular, Poliza: poliza, 'CC/Nit': cedula_nit, Placa: placas, tipo: tipo_poliza }
    return Object.keys(description).map((key, index) => <DescriptionItem title={key} value={description[key]} key={`${key}-${index}`} />)
  }
  render () {
    let poliza = this.props.navigation.state.params
    console.log(poliza)
    return (
      <ScrollView>
        <TouchableHighlight
          onPress={() => console.log('llamar a la aseguradora')}
          underlayColor='rgba(100,0,0,0.3)'
          style={[styles.callContainer, { backgroundColor: poliza.estado === 'ACTIVO' ? 'green' : 'red' }]}>
          <View>
            <Icon name='phone' size={100} color='#fff' />
            <Text style={styles.callText}>Solictar Asistencia!</Text>
          </View>
          </TouchableHighlight>
          {this.sinisters()}
          <View style={styles.containerDescription}>
            {this.renderDescription()}
            <Text style={styles.Descriptiontitle}>Observaciones: <Text style={styles.Descriptionvalue}>{poliza.observaciones}</Text></Text>
          </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  callContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomWidth: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  callText: {
    fontSize: theme.sizes.text,
    color: theme.colors.white
  },
  containerDescription: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  Descriptiontitle: {
    fontSize: theme.sizes.text,
    fontWeight: 'bold',
    color: theme.colors.normalText
  },
  Descriptionvalue: {
    fontSize: theme.sizes.text,
    marginLeft: 8,
    fontWeight: 'normal'
  },
  sinistersSection: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.button
  },
  text: {
    fontSize: theme.sizes.text,
    color: theme.colors.normalTexts
  }
})

export default PolizaDescription
