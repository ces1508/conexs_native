import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  View
} from 'react-native'
import Separator from './separator'
import { BarIndicator } from 'react-native-indicators'
import theme from '../../theme'

const List = props => {
  if (props.onFetching) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BarIndicator count={5} color={theme.colors.lightBlue} size={40} />
      </View>
    )
  }
  return (
    <FlatList
      style={{ flex: 1 }}
      horizontal={props.horizontal}
      ListEmptyComponent={props.listEmpty}
      ListFooterComponent={props.loadingMore ? <BarIndicator count={5} color={theme.colors.lightBlue} size={20} /> : null}
      ItemSeparatorComponent={() => <Separator height={props.height} />}
      data={props.data}

      {...props}
    />
  )
}

List.propTypes = {
  horizontal: PropTypes.bool,
  data: PropTypes.array,
  listEmpty: PropTypes.func,
  footer: PropTypes.func
}
List.defaultProps = {
  data: [],
  horizontal: false
}

export default List
