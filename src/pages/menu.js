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
import Datasource from '../api'
import theme from '../theme'
import { getItem, logout } from '../utils'
import { connect } from 'react-redux'
import { clean } from '../actions/login'

const mapStateToProps = state => state
const mapDispatchToProps = {
  clean
}

class MenuScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: {}
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  async getProfile (cedula) {
    let { data } = await Datasource.getProfile(cedula)
    this.setState({
      profile: data.profile
    })
  }

  async componentDidMount () {
    let user = await getItem('@user')
    if (!user.hasOwnProperty('error')) {
      this.getProfile(user.item)
    }
    return null
  }
  handleLogout () {
    this.props.clean()
    logout(this.props.navigation)
  }
  render () {
    let { profile } = this.state
    return (
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} style={{ flex: 1 }}>
          <View>
            <View style={styles.userInformation}>
              <Image style={styles.image} source={{ uri: 'https://picsum.photos/320/320' }} />
              <Text
                style={[styles.text, styles.textHeader, styles.name]}
                numberOfLines={1}>
                {profile.titular}
              </Text>
              <Text style={[styles.text, styles.textHeader]}>{profile.cedula_nit}</Text>
            </View>
            <View>
              <View style={styles.polizaContainer}>
                <Text style={styles.text}>Polizas Activas</Text>
                <Text style={[styles.poliza, styles.active]}>{profile.actives}</Text>
              </View>
              <View style={styles.polizaContainer}>
                <Text style={styles.text}>Polizas Inactivas</Text>
                <Text style={[styles.poliza, styles.inactive]}>{profile.inactives}</Text>
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
