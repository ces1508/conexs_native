import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text
} from 'react-native'
import Input from '../components/input'
import Button from '../components/button'
import theme from '../theme'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      document: ''
    }
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
            value={this.state.document}
            style={styles.input}
            label=''
            handleText={(text) => this.setState({ document: text })}
          />
        </View>
        <Button style={styles.button} text='Ingresar' textStyle={styles.buttonText} />
        <View style={styles.footer}>
          <Text style={[styles.text, styles.footerText]}>Màs Informaciòn</Text>
        </View>
      </View>
    )
  }
}

export default LoginScreen

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
