import React from 'react'
import {
  View,
  Text
} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Card from '../cardListItem'
import ConexsLogo from '../../img/logos/conex_logo.png'

const NotificationItem = props => {
  let { titulo } = props.notification
  return (
    <Card
      image={ConexsLogo}
      onPress={() => props.navigation.navigate('notificationDescription', { notification: props.notification })}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
        <Text
          textBreakStrategy='highQuality'
          style={{ fontSize: 17, height: '100%', flex: 1, marginRight: 5 }}>
          {titulo}
        </Text>
        <Icons name='chevron-right' size={30} />
      </View>
    </Card>
  )
}

export default NotificationItem
