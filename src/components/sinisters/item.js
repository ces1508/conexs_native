import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { handleSetCurrentSinister } from '../../actions/sinisters/creators'

const mapDispatchToProps = {
  handleSetCurrentSinister
}

const Sinister = props => (
  <TouchableOpacity onPress={() => props.handleSetCurrentSinister(props.sinister)}>
    <View style={styles.container}>
      <Text style={styles.causa}>{props.causa}</Text>
      <View style={styles.containerInformation}>
        <View style={styles.containerText}>
          <Text style={styles.text}>N Siniestro: {props.num_siniestro}</Text>
          <Text style={styles.text}>Placa: {props.placas}</Text>
          <Text style={styles.text}>Fecha: {props.fecha_final}</Text>
        </View>
        <Icons name='chevron-right' size={25} style={styles.icon} />
      </View>
    </View>
  </TouchableOpacity>
)

export default connect(null, mapDispatchToProps)(Sinister)

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
