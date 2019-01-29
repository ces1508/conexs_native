import { AsyncStorage, Alert } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

export const resetRouter = router => {
  let reset = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'login' })]
  })
  return router.dispatch(reset)
}

export const logout = async router => {
  try {
    await AsyncStorage.removeItem('@user')
    return resetRouter(router)
  } catch (e) {
    Alert.alert(
      'ups !',
      'lo sentimos ha ocurrido un error'
    )
  }
}
