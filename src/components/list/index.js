import React from 'react'
import PropTypes from 'prop-types'
import {
  FlatList
} from 'react-native'
import Separator from './separator'

const List = props => {
  return (
    <FlatList
      horizontal={props.horizontal}
      ListEmptyComponent={props.listEmpty}
      ListFooterComponent={props.footer}
      ItemSeparatorComponent={props.separator || <Separator />}
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
