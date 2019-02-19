import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  Alert
} from 'react-native'
import Input from '../components/input'
import Button from '../components/button'
import theme from '../theme'
import { connect } from 'react-redux'
import { handleInput, login } from '../actions/login'
import { saveItem } from '../utils'

const mapStateToProps = state => ({ ...state.login })
const mapDispatchToProps = {
  handleInput,
  login
}

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.renderAlert = this.renderAlert.bind(this)
    this.sendToPolizas = this.sendToPolizas.bind(this)
  }

  async componentWillReceiveProps (nextProps) {
    if (nextProps.token) {
      await this.sendToPolizas()
    }
    if (nextProps.error.hasOwnProperty('error')) {
      let { error } = nextProps.error
      if (error === 'no hay un usuario con ese numero de documento') {
        this.renderAlert('Error !', 'por favor verifica tus datos de inicio de sesion')
      } else {
        return this.renderAlert('Lo sentimos!', 'Estamos presentando problemas con nuestros servidores, por favor intenta mas tarde')
      }
    }
  }
  async sendToPolizas () {
    return this.props.navigation.navigate('polizas')
  }

  onSubmit () {
    let { value } = this.props
    let validate = value.split(' ')
    if (validate.length < 2) return this.renderAlert('Error', 'debes  enviar tu codigo de seguridad junto a tu documento')
    if (validate[0].toLowerCase() === validate[1].toLowerCase()) {
      let data = {
        value: validate[0],
        confirmation: validate[1]
      }
      return this.props.login(data)
    }
    return this.renderAlert('Ups !', 'por favor perifica tus datos y vuelve a intentarlo')
  }

  renderAlert (title, message) {
    return Alert.alert(
      title,
      message
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={theme.colors.blue} />
        <View style={styles.containerImage}>
          <Image style={styles.image} source={require('../img/horizontal-logo.png')} resizeMode='stretch' resizeMethod='scale' />
        </View>
        <View style={styles.form}>
          <Text style={[styles.text, styles.welcome]}>Bienvenido</Text>
          <Text style={styles.text}>Número de documento, Nit</Text>
          <Text style={styles.text}>o Placa de su vehículo</Text>
          <Input
            name={'document'}
            value={this.props.value}
            style={styles.input}
            label=''
            handleText={this.props.handleInput}
          />
        </View>
        <Button style={styles.button} text='Ingresar' textStyle={styles.buttonText} onPress={this.onSubmit} />
        <View style={styles.footer}>
          <Text style={[styles.text, styles.footerText]}>Màs Informaciòn</Text>
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
  containerScroll: {
    backgroundColor: theme.colors.blue,
    flex: 1
  },
  container: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: theme.colors.blue
  },
  containerImage: {
    marginTop: 50
  },
  image: {
    height: 80,
    width: 300,
    alignSelf: 'center'
  },
  form: {
    marginTop: 20,
    borderRadius: 10,
    paddingBottom: 20,
    backgroundColor: theme.colors.lightBlue
  },
  welcome: {
    fontSize: theme.sizes.title,
    marginBottom: 10
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.sizes.text,
    textAlign: 'center'
  },
  input: {
    backgroundColor: theme.colors.white,
    marginHorizontal: 20,
    marginBottom: 10
  },
  button: {
    borderTopColor: theme.colors.shadowButton,
    borderTopWidth: 3,
    marginTop: 20,
    backgroundColor: theme.colors.button,
    height: 70,
    borderRadius: 7
  },
  buttonText: {
    color: theme.colors.shadowButton,
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
    fontSize: theme.sizes.subTitle
  },
  footer: {
    backgroundColor: theme.colors.lightBlue,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60
  },
  footerText: {
    textAlignVertical: 'center',
    flex: 1
  }
})
