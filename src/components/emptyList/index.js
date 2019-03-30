import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome5'

const Empty = props => (
  <View style={styles.main}>
    <Icons name='folder-open' size={100} />
    <Text>usted no cuenta con pólizas de este tipo</Text>
  </View>
)

export default Empty

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    height: Dimensions.get('window').height - 110,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
