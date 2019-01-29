import Datasource from '../../api'
import {
  ERROR_GET_POLIZAS,
  ON_FETCHING,
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
    return dispatch(handleSuccess(data))
  }
}
function handleSuccess (data) {
  let polizas = data.filter(item => item.formato === 'POLIZA')
  let soats = data.filter(item => item.formato === 'SOAT')
  return { type: SUCCESS_GET_POLIZAS, soats, polizas }
}

function handleError (error) {
  return { type: ERROR_GET_POLIZAS, error }
}

function onFetching () {
  return { type: ON_FETCHING }
}
