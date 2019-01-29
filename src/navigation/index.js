import React from 'react'
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'
import {
  LoginScreen,
  PolizasScreen,
  SoatsScreen,
  MenuScreen,
  polizaDescription,
  SiniestrosScreen
} from '../pages'
import MenuIcon from '../components/menuIcon'
const Tabs = createBottomTabNavigator(
  {
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
  }
)

const DrawerNavivagor = createDrawerNavigator({
  polizas: {
    screen: Tabs
  }
},
{
  contentComponent: MenuScreen,
  drawerType: 'something'
})

const Stack = (isAuthenticate = false) => {
  console.log(isAuthenticate)
  return createStackNavigator(
    {
      login: {
        screen: LoginScreen,
        navigationOptions: {
          header: null
        }
      },
      polizas: {
        navigationOptions: ({ navigation }) => ({
          title: 'Polizas',
          headerLeft: <MenuIcon navigation={navigation} />
        }),
        screen: DrawerNavivagor
      },
      polizaDescription: {
        screen: polizaDescription
      },
      sinisters: {
        screen: SiniestrosScreen,
        navigationOptions: {
          title: 'Siniestros'
        }
      }
    },
    {
      headerMode: 'screen',
      initialRouteName: isAuthenticate ? 'polizas' : 'login'
    }
  )
}

export default Stack
