import { AsyncStorage } from 'react-native'

export const getItem = async (key) => {
  try {
    let item = await AsyncStorage.getItem(key)
    return { item }
  } catch (e) {
    return { error: e.message }
  }
}

export const saveItem = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data)
    return { status: 'saved' }
  } catch (e) {
    return { error: e.message }
  }
}
