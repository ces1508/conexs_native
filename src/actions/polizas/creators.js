import Datasource from '../../api'
import {
  ERROR_GET_POLIZAS,
  ON_FETCHING_POLIZAS,
  SUCCESS_GET_POLIZAS,
  LOADING_MORE_POLIZAS,
  ON_SUCCESS_PAGINATION,
  ON_REFRESHING_POLIZAS
} from './actions'

export const getPolizas = (token, filters) => {
  return async dispatch => {
    dispatch(onFetching())

    makeRequest(token, 0, filters, dispatch, handleSuccess, handleError)
  }
}

export const getMorePolizas = (token, skip, filters) => {
  return async dispatch => {
    dispatch(loadingMore())
    await makeRequest(token, skip, filters, dispatch, onSuccessLodingMore, handleError)
  }
}

export const handleRefreshing = (token, filters) => {
  return async dispatch => {
    dispatch(onRefreshing())

    await makeRequest(token, 0, filters, dispatch, handleSuccess, handleError)
  }
}

const makeRequest = async (token, skip, filters, dispatch, handleSuccess, handleError) => {
  console.log('=============== action polizas ===============')
  let { data, status } = await Datasource.getPolizas(token, 'polizas', { skip, ...filters })
  console.log(' ========== getting polizas ======= data', data)
  if (status !== 200) {
    if (status === 413 || status === 401) return dispatch(handleError({ message: 'UnAuthorizade' }))
    if (status >= 500) {
      return dispatch(handleError({ message: 'estamos presentando problemas con nuestros servidores, por favor intente mas' }))
    }
  }
  dispatch(handleSuccess(data.polizas, skip))
}

function onRefreshing () {
  return { type: ON_REFRESHING_POLIZAS }
}

function onSuccessLodingMore (polizas, skip) {
  return { type: ON_SUCCESS_PAGINATION, polizas, skip }
}

function loadingMore () {
  return { type: LOADING_MORE_POLIZAS }
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
