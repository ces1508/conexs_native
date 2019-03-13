import {
  NEW_NOTIFICATION
} from './'

export const handlePushNotification = notification => {
  return { type: NEW_NOTIFICATION, notification }
}
