import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

const Sinister = props => (
  <View style={styles.container}>
    <Text style={styles.causa}>{props.causa}</Text>
    <View style={styles.containerInformation}>
      <View style={styles.containerText}>
        <Text style={styles.text}>N Siniestro: {props.num_siniestro}</Text>
        <Text style={styles.text}>Placa: {props.placa}</Text>
        <Text style={styles.text}>Fecha: {props.fecha_acci}</Text>
      </View>
      <Icons name='chevron-right' size={25} style={styles.icon} />
    </View>
  </View>
)

export default Sinister

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  causa: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20
  },
  containerInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerText: {
    flex: 1
  },
  text: {
    color: 'gray',
    fontWeight: '200',
    fontSize: 14
  },
  icon: {
    alignSelf: 'center',
    marginRight: 10
  }
})
