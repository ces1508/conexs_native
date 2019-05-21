import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import theme from '../theme'
import { logout } from '../utils'
import { connect } from 'react-redux'
import { saveItem, getItem } from '../utils/storage'
import { clean } from '../actions/login'
import { getProfile } from '../actions/profile/creators'
import { handlePushNotification } from '../actions/notifications/creators'
import OneSignal from 'react-native-onesignal'
import Datasource from '../api'

const mapStateToProps = state => ({ ...state.profile, token: state.login.token })
const mapDispatchToProps = {
  clean,
  getProfile,
  handlePushNotification
}

class MenuScreen extends Component {
  constructor (props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this._onNotification = this._onNotification.bind(this)
    this._onOpenNotification = this._onOpenNotification.bind(this)
    OneSignal.addEventListener('received', this._onNotification)
    OneSignal.addEventListener('opened', this._onOpenNotification)
    OneSignal.addEventListener('ids', this.onIds)
  }

  async onIds (device) {
    let { item } = await getItem('@user')
    if (item) {
      await Datasource.savePushToken(item, device.pushToken)
    }
  }

  _onNotification (n) {
    this.props.handlePushNotification(n)
  }

  _onOpenNotification (openResult) {
    console.log(openResult)
    this.props.navigation.navigate('notifications')
  }
  async componentDidMount () {
    this.setToken()
  }

  async setToken () {
    let { token } = this.props
    let { item } = await getItem('@user')
    if (!item) {
      await saveItem('@user', token)
    }
    this.getProfile()
  }

  getProfile () {
    let { token } = this.props
    this.props.getProfile(token)
  }

  handleLogout () {
    this.props.clean()
    logout(this.props.navigation)
  }
  render () {
    let { profile } = this.props
    return (
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} style={{ flex: 1, padding: 0, margin: 0 }}>
          <View style={styles.userInformation}>
            <Text
              style={[styles.text, styles.textHeader, styles.name]}
              numberOfLines={1}>
              {profile.titular || 'cargando'}
            </Text>
            <Text style={[styles.text, styles.textHeader]}>{profile.cedula_nit || 'cargando'}</Text>
          </View>
          <View style={styles.polizaContainer}>
            <Text style={styles.text}>Polizas Activas</Text>
            <Text style={[styles.poliza, styles.active]}>{profile.actives || 0}</Text>
          </View>
          <View style={styles.polizaContainer}>
            <Text style={styles.text}>Polizas Inactivas</Text>
            <Text style={[styles.poliza, styles.inactive]}>{profile.inactives || 0}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.handleLogout()}>
              <Text style={[styles.singout, styles.text]}>Salir</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)

const styles = StyleSheet.create({
  userInformation: {
    height: 180,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.blue
  },
  image: {
    width: 0,
    height: 0
    // borderRadius: 30,
    // marginBottom: 10
  },
  polizaContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    backgroundColor: theme.colors.white
  },
  textHeader: {
    color: theme.colors.white
  },
  name: {
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontWeight: '400'
  },
  poliza: {
    color: 'white',
    height: 30,
    width: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 5
  },
  active: {
    backgroundColor: 'green'
  },
  inactive: {
    backgroundColor: 'red'
  },
  singout: {
    marginTop: 20,
    marginLeft: 10,
    paddingVertical: 10
  }
})
