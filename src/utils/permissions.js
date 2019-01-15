import { PermissionsAndroid } from 'react-native'

const requestPermissions = async (permission, payload) => {
  try {
    const granted = await PermissionsAndroid.request(permission, payload)
    return granted === PermissionsAndroid.RESULTS.GRANTED
  } catch (e) {
    return false
  }
}

export default requestPermissions
