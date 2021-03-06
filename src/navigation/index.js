import React from 'react'
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'
import {
  LoginScreen,
  PolizasScreen,
  SoatsScreen,
  MenuScreen,
  polizaDescription,
  SiniestrosScreen,
  SinisterDetailScreen,
  NotificationScreen,
  NotificationDescription
} from '../pages'
import MenuIcon from '../components/menuIcon'
import NotificationIcon from '../components/notificationIcon'
import { Text } from 'react-native'
import Theme from '../theme'

const Tabs = createBottomTabNavigator({
  polizas: PolizasScreen,
  soats: SoatsScreen
},
{
  defaultNavigationOptions: ({ navigation }) => {
    let { routeName } = navigation.state
    let label = routeName === 'polizas' ? 'Polizas' : 'Soats'
    return {
      tabBarLabel: ({ tintColor }) => (
        <Text style={{
          fontSize: Theme.sizes.text,
          textAlign: 'center',
          textAlignVertical: 'center',
          color: tintColor
        }}>{ label }</Text>
      ),
      tabBarOptions: {
        activeTintColor: Theme.colors.white,
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: Theme.colors.blue,
       }
      }
    }
  }
})

const DrawerNavivagor = createDrawerNavigator({
  polizas: Tabs
}, {
  contentComponent: MenuScreen,
  drawerType: 'something'
})

const Stack = (isAuthenticate = false) => {
  return createStackNavigator({
    login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    polizas: {
      screen: DrawerNavivagor,
      navigationOptions: ({ navigation }) => ({
        title: 'Polizas',
        headerLeft: <MenuIcon navigation={navigation} color={Theme.colors.white} />,
        headerRight: <NotificationIcon navigation={navigation} color={Theme.colors.white} />
      })
    },
    polizaDescription: {
      screen: polizaDescription
    },
    sinisters: {
      screen: SiniestrosScreen,
      navigationOptions: {
        title: 'Siniestros'
      }
    },
    sinisterDetail: {
      screen: SinisterDetailScreen
    },
    notifications: {
      screen: NotificationScreen,
      navigationOptions: {
        title: 'Notificaciones'
      }
    },
    notificationDescription: {
      screen: NotificationDescription
    }
  }, {
    headerMode: 'screen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Theme.colors.blue,
      },
      headerTintColor: Theme.colors.white
    },
    initialRouteName: isAuthenticate ? 'polizas' : 'login'
  })
}

export default Stack
