import Datasource from '../../api'
import {
  ERROR_GET_SOATS,
  ON_FETCHING_SOATS,
  SUCCESS_GET_SOATS
} from './actions'

export const getSoats = (token) => {
  return async dispatch => {
    dispatch(onFetching())
    let { data, status } = await Datasource.getPolizas(token, 'soats')
    if (status !== 200) {
      if (status === 413 || status === 401) return dispatch(handleError({ message: 'UnAuthorizade' }))
      if (status >= 500) {
        return dispatch(handleError({ message: 'estamos presentando problemas con nuestros servidores, por favor intente mas' }))
      }
    }
    return dispatch(handleSuccess(data.soats))
  }
}

function handleSuccess (soats) {
  return { type: SUCCESS_GET_SOATS, soats }
}

function handleError (error) {
  return { type: ERROR_GET_SOATS, error }
}

function onFetching () {
  return { type: ON_FETCHING_SOATS }
}
