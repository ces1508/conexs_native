import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Switch
} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import {
  toogleSettings,
  setFilter,
  filterConfirm
} from '../../actions/filters/cretors'
import theme from '../../theme'

const mapStatetoProps = state => ({ ...state.filters, token: state.login.token })
const mapDispatchtoProps = {
  toogleSettings,
  setFilter,
  filterConfirm
}

const Settings = props => (
  <View style={[{ height: props.show ? 170 : 40 }, styles.main]}>
    <Icons
      name={props.show ? 'close' : 'tune'}
      size={25}
      style={styles.icon}
      onPress={props.toogleSettings} />
    <View style={styles.actionsContainer}>
      <View style={styles.action}>
        <Text style={styles.text}>sólo Activas</Text>
        <Switch
          value={props.actives}
          onValueChange={() => props.setFilter('actives')}
        />
      </View>
      <View style={styles.action}>
        <Text style={styles.text}>sólo con Siniestros</Text>
        <Switch
          value={props.siniesters}
          onValueChange={() => props.setFilter('siniesters')}
        />
      </View>
      <Text
        style={styles.confirm}
        onPress={() => props.filterConfirm(props.token, props.sinisters, props.actives)}>Aplicar Filtros</Text>
    </View>
  </View>
)

export default connect(mapStatetoProps, mapDispatchtoProps)(Settings)

const styles = StyleSheet.create({
  main: {
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  icon: {
    marginTop: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginRight: 5
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  action: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 10
  },
  text: {
    fontSize: 17
  },
  confirm: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.lightBlue
  }
})
