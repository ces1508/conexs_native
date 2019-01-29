import Datasource from '../api'

export const HANDLE_INPUT = 'HANDLE_INPUT'
export const ON_FETCHING = 'ON_FETCHING'
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export const ERROR_LOGIN = 'ERROR_LOGIN'
export const CLEAN = 'CLEAN'

export function handleInput (value) {
  return { type: HANDLE_INPUT, value }
}

export function clean () {
  return { type: CLEAN }
}
export function login (auth, value) {
  console.log(auth, value)
  return async dispatch => {
    let { data } = await Datasource.signin(value, auth)
    if (data.ok) {
      return dispatch(handleSuccess())
    } else {
      dispatch(handleError(data))
    }
  }
}

function handleSuccess () {
  return { type: 'SUCCESS_LOGIN' }
}
function handleError (error) {
  return { type: ERROR_LOGIN, error }
}
