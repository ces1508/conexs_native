import React, { PureComponent } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Html from 'react-native-render-html'
import { Linking } from 'react-native'

export default class Notification extends PureComponent {
  static navigationOptions  = ({ navigation }) => {
    let notification = navigation.getParam('notification')
    return {
      title: notification.titulo
    }
  }
  render () {
    let notification = this.props.navigation.getParam('notification')
    console.log(notification)
    return (
      <View style={styles.container}>
        <Html html={notification.body} baseFontStyle={styles.html} />
        {notification.link_nombre !== "" ? <Text onPress={() => Linking.openURL(notification.url)} style={styles.link}>{notification.link_nombre}</Text> : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  html: {
    marginTop: 15,
    fontSize: 18,
    color: '#000',
    textAlign: 'center'
  },
  link: {
    marginTop: 10,
    fontSize: 18,
    color: 'blue'
  }
})
