import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DrawerActions } from 'react-navigation-drawer'
const MenuIcon = (props) => {
  return (
    <Icon
      name='menu'
      {...props}
      size={35} onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())} />
  )
}

export default MenuIcon
