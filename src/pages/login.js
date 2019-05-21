import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView
} from 'react-native'
import Input from '../components/input'
import Button from '../components/button'
import theme from '../theme'
import { connect } from 'react-redux'
import { handleInput, login } from '../actions/login'
// import { saveItem } from '../utils'

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
    this.handleKeyboardShow = this.handleKeyboardShow.bind(this)
    this.handleKeyboardHide = this.handleKeyboardHide.bind(this)
    this.state = {
      keyboard: false
    }
  }

  componentDidMount () {
    this.keyboardShow = Keyboard.addListener('keyboardDidShow', this.handleKeyboardShow)
    this.keyboardHide = Keyboard.addListener('keyboardDidHide', this.handleKeyboardHide)
  }

  componentWillUnmount () {
    Keyboard.removeListener(this.keyboardShow)
    Keyboard.removeListener(this.keyboardHide)
  }

  handleKeyboardShow () {
    this.setState({ keyboard: true })
  }

  handleKeyboardHide () {
    this.setState({ keyboard: false })
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
    let { value, onLogin } = this.props
    if (onLogin) return null
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
    let { onLogin, value } = this.props
    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <ScrollView style={{ flex: 1 }}>
          <StatusBar backgroundColor={theme.colors.blue} />
          <View style={styles.containerImage}>
            <Image style={this.state.keyboard ? styles.hide : styles.image} source={require('../img/horizontal-logo.png')} resizeMode='stretch' resizeMethod='scale' />
          </View>
          <View style={styles.form}>
            <Text style={[styles.text, styles.welcome]}>Bienvenido</Text>
            <Text style={styles.text}>Número de documento, Nit</Text>
            <Text style={styles.text}>o Placa si es un vehículo</Text>
            <Input
              name={'document'}
              value={value}
              style={styles.input}
              label=''
              handleText={this.props.handleInput}
            />
            <Button style={styles.button} text={onLogin ? '...Iniciando sesión' : 'Entrar'} textStyle={styles.buttonText} onPress={this.onSubmit} />
          </View>
          {
            // <View style={styles.footer}>
            //   <Text style={this.state.keyboard ? styles.hide : [styles.text, styles.footerText]}>Màs Informaciòn</Text>
            // </View>
          }
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.blue
  },
  containerImage: {
    flex: 1,
    paddingVertical: 20
  },
  image: {
    height: 80,
    width: 300,
    alignSelf: 'center'
  },
  form: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.lightBlue,
    paddingVertical: 15
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
    marginBottom: 10,
    height: 40
  },
  button: {
    borderTopColor: theme.colors.shadowButton,
    borderTopWidth: 3,
    marginTop: 20,
    backgroundColor: theme.colors.button,
    height: 50,
    borderRadius: 7,
    marginBottom: 70
  },
  buttonText: {
    color: theme.colors.shadowButton,
    textAlignVertical: 'center',
    textAlign: 'center',
    lineHeight: 70,
    flex: 1,
    fontSize: theme.sizes.subTitle
  },
  footer: {
    backgroundColor: theme.colors.lightBlue,
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    flex: 1
  },
  footerText: {
    textAlignVertical: 'center',
    flex: 1
  },
  hide: {
    height: 0,
    width: 0
  }
})
