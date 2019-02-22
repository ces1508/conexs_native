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

const Tabs = createBottomTabNavigator({
  polizas: PolizasScreen,
  soats: SoatsScreen
},
{
  defaultNavigationOptions: ({ navigation }) => {
    let { routeName } = navigation.state
    let label = routeName === 'polizas' ? 'Polizas' : 'Soats'
    return {
      tabBarLabel: label
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
        headerLeft: <MenuIcon navigation={navigation} />,
        headerRight: <NotificationIcon navigation={navigation} />
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
    initialRouteName: isAuthenticate ? 'polizas' : 'login'
  })
}

export default Stack
