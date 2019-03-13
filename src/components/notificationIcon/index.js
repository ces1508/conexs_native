import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const mapStateToProps = state => ({ newNotifications: state.notifications.newNotifications })

const NotificationIcon = (props) => {
  return (
    <View>
      {props.newNotifications.length > 0 ? <Text style={styles.text}>{props.newNotifications.length}</Text> : null}
      <Icon
        name='bell-outline'
        // style={{ padding: 10 }}
        size={35}
        onPress={() => props.navigation.navigate('notifications')} />
    </View>
  )
}

const styles = StyleSheet.create({
  contNotifications: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    right: 3
  },
  text: {
    position: 'absolute',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    top: 0,
    fontWeight: 'bold',
    right: 2,
    fontSize: 13,
    color: '#fff',
    zIndex: 100,
    backgroundColor: 'red'
  }
})

export default connect(mapStateToProps)(NotificationIcon)
