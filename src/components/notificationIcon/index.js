import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const NotificationIcon = (props) => {
  return (
    <Icon
      name='bell-outline'
      // style={{ padding: 10 }}
      size={35}
      onPress={() => props.navigation.navigate('notifications')} />
  )
}

export default NotificationIcon
