import Datasource from '../../api'
import {
  ERROR_GET_POLIZAS,
  ON_FETCHING_POLIZAS,
  SUCCESS_GET_POLIZAS,
  LOADING_MORE_POLIZAS,
  ON_SUCCESS_PAGINATION,
  ON_REFRESHING_POLIZAS
} from './actions'

export const getPolizas = (token) => {
  return async dispatch => {
    dispatch(onFetching())
    makeRequest(token, 0, dispatch, handleSuccess, handleError)
  }
}

export const getMorePolizas = (token, skip) => {
  return async dispatch => {
    dispatch(loadingMore())
    await makeRequest(token, skip, dispatch, onSuccessLodingMore, handleError)
  }
}

export const handleRefreshing = (token) => {
  return async dispatch => {
    dispatch(onRefreshing())
    await makeRequest(token, 0, dispatch, handleSuccess, handleError)
  }
}

const makeRequest = async (token, skip, dispatch, handleSuccess, handleError) => {
  let { data, status } = await Datasource.getPolizas(token, 'polizas', skip)
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
