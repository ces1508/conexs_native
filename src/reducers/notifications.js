import {
  NEW_NOTIFICATION
} from '../actions/notifications'

const initialState = {
  newNotifications: []
}

export default function notificationsReducer (state = initialState, action) {
  switch (action.type) {
    case NEW_NOTIFICATION:
      return {
        ...state,
        newNotifications: [...state.newNotifications, action.notification]
      }
    default:
      return state
  }
}
