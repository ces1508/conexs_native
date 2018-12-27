import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import {
  LoginScreen,
  PolizasScreen,
  SoatsScreen
} from '../pages'

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

const TabsNavigator = createAppContainer(Tabs)

const Stack = (isAuthenticate = false) => {
  return createStackNavigator(
    {
      login: {
        screen: LoginScreen,
        navigationOptions: {
          header: null
        }
      },
      polizas: {
        screen: Tabs,
        navigationOptions: {
          title: 'Polizas'
        }
      }
    },
    {
      headerMode: 'screen',
      initialRouteName: isAuthenticate ? 'login' : 'polizas'
    }
  )
}

export default Stack
