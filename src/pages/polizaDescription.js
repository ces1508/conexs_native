import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
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
import Api from '../api'
import api from '../api';
import HTML from 'react-native-render-html'

class PolizaDescription extends Component {
  constructor (props) {
    super(props)
    this.makeCallPhone = this.makeCallPhone.bind(this)
  }
  static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.title }) // eslint-disable-line

  getNumberByCompany (name) {
    name = name.toLowerCase()
    if (name.includes('aig')) return '#23360'
    if (name.includes('equidad')) return '#23324'
    if (name.includes('estado')) return '#23388'
    if (name.includes('allianz')) return '#23265'
    if (name.includes('mundial')) return '018000515522'
    if (name.includes('previsora')) return '#23345'
    if (name.includes('solidaria')) return '#23789'
    if (name.includes('mapfre')) return '#23624'
    if (name.includes('liberty')) return '#23224'
    if (name.includes('solidaria')) return '#23789'
    if (name.includes('colpatria')) return '#23247'
    if (name.includes('qbe')) return '#23723'
    if (name.includes('sura')) return '#23888'
    if (name.includes('confianza')) return '0316444690'
    return false
  }
  sinisters () {
    let poliza = this.props.navigation.state.params
    if (poliza.amount_sinisters > 0) {
      return (
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('sinisters', { poliza: poliza.poliza })}>
          <View  style={styles.sinistersSection}>
            <Text style={styles.text}>Ver {poliza.amount_sinisters} Siniestro {poliza.amount_sinisters > 1 ? 's' : '' } </Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return null
  }

  async sendEmail () {
    let { titular, cedula, poliza } = this.props.navigation.state.params
    let email = await api.sendEmail({ titular, cedula, poliza })
  }
  renderDescription () {
    let { titular, cedula_nit, placas, tipo_poliza, poliza } = this.props.navigation.state.params
    let description = { Titular: titular, Poliza: poliza, 'CC/Nit': cedula_nit, Placa: placas, tipo: tipo_poliza,  }
    return Object.keys(description).map((key, index) => (
      <DescriptionItem title={key} value={description[key]} key={`${key}-${index}`} />
    ))
  }
  async makeCallPhone () {
    let { estado, aseguradora } = this.props.navigation.state.params
    this.sendEmail()
     if (estado === 'ACTIVO') {
        let number = this.getNumberByCompany(aseguradora)
         if (number) {
          if (Platform.OS === 'android') {
            let payload = {
              title: "Necesitamos el Permiso, para poder realizar la llamada",
              message: 'con este permiso, te comunicaremos directamente con la entidad que presta el seguro.'
            }
            let hasPermission = await permissions(PermissionsAndroid.PERMISSIONS.CALL_PHONE, payload)
            if (hasPermission) {
              return RNImmediateCall.immediatePhoneCall(number)
            } else {
              return Alert.alert(
                'Lo Sentimos...',
                'No podimos iniciar la llamada debido a que no has aceptado el permiso'
              )
            }
          }
          return RNImmediateCall.immediatePhoneCall(number)
       }
       Alert.alert(
         'Lo sentimos',
         'no hemos podido contactar con la aseguradora, pero nuestros asesores pronto se contactarán contigo'
       )
    }
  }
  render () {
    let poliza = this.props.navigation.state.params
    return (
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={this.makeCallPhone}
          underlayColor='rgba(100,0,0,0.3)'>
          <View style={[styles.callContainer, { backgroundColor: poliza.estado === 'ACTIVO' ? 'green' : 'red' }]}>
            <Icon name='phone' size={100} color='#fff' />
            <Text style={styles.callText}>Solictar Asistencia!</Text>
          </View>
          </TouchableWithoutFeedback>
          {this.sinisters()}
          <View style={styles.containerDescription}>
            {this.renderDescription()}
            <DescriptionItem title='Fecha de adquisicion' value={poliza.fecha_inicial} />
            <DescriptionItem title='Fecha de de vencimiento' value={poliza.fecha_final} />
            <Text style={styles.Descriptiontitle}>Observaciones:</Text>
            <HTML html={poliza.observaciones} baseFontStyle={{fontSize: 17, color: '#000'}}/>
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
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.button
  },
  text: {
    fontSize: theme.sizes.text,
    color: theme.colors.normalTexts
  }
})

export default PolizaDescription
