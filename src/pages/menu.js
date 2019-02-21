import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import theme from '../theme'
import { logout } from '../utils'
import { connect } from 'react-redux'
import { clean } from '../actions/login'
import { saveItem, getItem } from '../utils/storage'
import { setToken } from '../actions/login'
import { getProfile } from '../actions/profile/creators'

const mapStateToProps = state => ({ ...state.profile, token: state.login.token })
const mapDispatchToProps = {
  clean,
  setToken,
  getProfile
}

class MenuScreen extends Component {
  constructor (props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  async componentDidMount () {
    console.log('montnando side menu')
    this.setToken()
  }

  async setToken () {
    // let token = await getItem('@user')
    // console.log(token)
    // if (token) {
    //   if (!token.hasOwnProperty('error') && this.props.token === null) {
    //     this.props.setToken(token.item)
    //   }
    // } else if (this.props.token) {
    //   await setToken(this.props.token)
    // }
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
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} style={{ flex: 1 }}>
          <View>
            <View style={styles.userInformation}>
              <Image style={styles.image} source={{ uri: 'https://picsum.photos/320/320' }} />
              <Text
                style={[styles.text, styles.textHeader, styles.name]}
                numberOfLines={1}>
                {profile.titular || 'cargando'}
              </Text>
              <Text style={[styles.text, styles.textHeader]}>{profile.cedula_nit || 'cargando'}</Text>
            </View>
            <View>
              <View style={styles.polizaContainer}>
                <Text style={styles.text}>Polizas Activas</Text>
                <Text style={[styles.poliza, styles.active]}>{profile.actives || 0}</Text>
              </View>
              <View style={styles.polizaContainer}>
                <Text style={styles.text}>Polizas Inactivas</Text>
                <Text style={[styles.poliza, styles.inactive]}>{profile.inactives || 0}</Text>
              </View>
            </View>
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
    backgroundColor: theme.colors.lightBlue
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10
  },
  polizaContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  textHeader: {
    color: theme.colors.white
  },
  name: {
    fontSize: 16
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
