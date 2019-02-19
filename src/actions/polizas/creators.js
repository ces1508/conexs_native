import Datasource from '../../api'
import {
  ERROR_GET_POLIZAS,
  ON_FETCHING_POLIZAS,
  SUCCESS_GET_POLIZAS
} from './actions'

export const getPolizas = (token) => {
  return async dispatch => {
    dispatch(onFetching())
    let { data, status } = await Datasource.getPolizas(token)
    if (status !== 200) {
      if (status === 413 || status === 401) return dispatch(handleError({ message: 'UnAuthorizade' }))
      if (status >= 500) {
        return dispatch(handleError({ message: 'estamos presentando problemas con nuestros servidores, por favor intente mas' }))
      }
    }
    return dispatch(handleSuccess(data.polizas))
  }
}

function handleSuccess (polizas) {
  return { type: SUCCESS_GET_POLIZAS, polizas }
}

function handleError (error) {
  return { type: ERROR_GET_POLIZAS, error }
}

function onFetching () {
  return { type: ON_FETCHING_POLIZAS }
}
