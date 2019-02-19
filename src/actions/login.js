import Datasource from '../api'

export const HANDLE_INPUT = 'HANDLE_INPUT'
export const ON_FETCHING = 'ON_FETCHING'
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export const ERROR_LOGIN = 'ERROR_LOGIN'
export const CLEAN = 'CLEAN'
export const SET_TOKEN = 'SET_TOKEN'

export function handleInput (value) {
  return { type: HANDLE_INPUT, value }
}

export function setToken (token) {
  return { type: SET_TOKEN, token }
}

export function clean () {
  return { type: CLEAN }
}
export function login (userData) {
  return async dispatch => {
    let { data, status } = await Datasource.signin(userData)
    if (status === 201 && data.token) {
      return dispatch(handleSuccess(data.token))
    } else {
      dispatch(handleError(data))
    }
  }
}

function handleSuccess (token) {
  return { type: 'SUCCESS_LOGIN', token }
}
function handleError (error) {
  return { type: ERROR_LOGIN, error }
}
