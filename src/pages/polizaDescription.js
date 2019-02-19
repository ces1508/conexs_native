import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DescriptionItem from '../components/description'
import theme from '../theme'
import RNImmediateCall from 'react-native-immediate-phone-call'
import { permissions } from '../utils'

class PolizaDescription extends Component {
  static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.title }) // eslint-disable-line

  sinisters () {
    let poliza = this.props.navigation.state.params
    if (poliza.amount_sinisters > 0) {
      return (
        <TouchableHighlight style={styles.sinistersSection} onPress={() => this.props.navigation.navigate('sinisters', { poliza })}>
          <Text style={styles.text}>Ver {poliza['AMOUNT_SINISTERS']} Siniestros </Text>
        </TouchableHighlight>
      )
    }
    return null
  }

  renderDescription () {
    let { titular, cedula_nit, placas, tipo_poliza, poliza } = this.props.navigation.state.params
    let description = { Titular: titular, Poliza: poliza, 'CC/Nit': cedula_nit, Placa: placas, tipo: tipo_poliza,  }
    return Object.keys(description).map((key, index) => (
      <DescriptionItem title={key} value={description[key]} key={`${key}-${index}`} />
    ))
  }
  async makeCallPhone () {
    if (Platform.OS === 'android') {
      let payload = {
        title: "Necesitamos el Permiso, para poder realizar la llamada",
        message: 'con este permiso, te comunicaremos directamente con la entidad que presta el seguro.'
      }
      let hasPermission = await permissions(PermissionsAndroid.PERMISSIONS.CALL_PHONE, payload)
      if (hasPermission) {
        return RNImmediateCall.immediatePhoneCall('3203230522')
      } else {
        return Alert.alert(
          'Lo Sentimos...',
          'No podimos iniciar la llamada debido a que no has aceptado el permiso'
        )
      }
    }
    return RNImmediateCall.immediatePhoneCall('3203230522')
  }
  render () {
    let poliza = this.props.navigation.state.params
    return (
      <ScrollView>
        <TouchableHighlight
          onPress={this.makeCallPhone}
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
            <DescriptionItem title='Fecha de adquisicion' value={poliza.fecha_inicial} />
            <DescriptionItem title='Fecha de de vencimiento' value={poliza.fecha_final} />
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
    paddingVertical: 10,
    elevation: 3,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10
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
