import { createStackNavigator } from 'react-navigation'
import {
  LoginScreen
} from '../pages'

const Stack = (isAuthenticate = false) => {
  return createStackNavigator(
    {
      login: {
        screen: LoginScreen,
        navigationOptions: {
          header: null
        }
      }
    },
    {
      headerMode: 'screen',
      initialRouteName: isAuthenticate ? 'login' : 'login'
    }
  )
}

export default Stack
