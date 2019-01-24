import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Datasource from '../api'
import theme from '../theme'
import { getItem } from '../utils'
class MenuScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: {}
    }
  }

  async getProfile (cedula) {
    let { data, status } = await Datasource.getProfile(cedula)
    console.log(data)
    if (status === 200) {
      let actives = data.filter(item => item.estado === 'ACTIVO').reduce((prev, current) => {
        return prev + 1
      }, 0)
      let inactives = data.filter(item => item.estado !== 'ACTIVO').reduce((prev, current) => {
        return prev + 1
      }, 0)
      this.setState({
        profile: {
          ...data[0],
          inactives,
          actives
        }
      })
    }
  }

  async componentDidMount () {
    let user = await getItem('@user')
    if (!user.hasOwnProperty('error')) {
      console.log(user)
      this.getProfile(user.item)
    }
    return null
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
            <Text style={[styles.singout, styles.text]}>Salir</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default MenuScreen

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
