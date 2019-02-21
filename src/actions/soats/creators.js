import Datasource from '../../api'
import {
  ERROR_GET_SOATS,
  ON_FETCHING_SOATS,
  SUCCESS_GET_SOATS,
  ON_LOADING_MORE_SOATS,
  ON_REFRESHING_SOATS,
  SUCCESS_PAGINATION_SOATS
} from './actions'

export const getSoats = (token) => {
  return async dispatch => {
    dispatch(onFetching())
    makeRequest(token, 0, dispatch, handleSuccess, handleError)
  }
}

export const getMoreSoats = (token, skip) => {
  console.log(skip)
  return async dispatch => {
    dispatch(loadingMore())
    await makeRequest(token, skip, dispatch, onSuccessLodingMore, handleError)
  }
}

export const handleRefresh = (token) => {
  return async dispatch => {
    dispatch(onRefreshing())
    await makeRequest(token, 0, dispatch, handleSuccess, handleError)
  }
}

const makeRequest = async (token, skip, dispatch, handleSuccess, handleError) => {
  let { data, status } = await Datasource.getPolizas(token, 'soats', skip)
  if (status !== 200) {
    if (status === 413 || status === 401) return dispatch(handleError({ message: 'UnAuthorizade' }))
    if (status >= 500) {
      return dispatch(handleError({ message: 'estamos presentando problemas con nuestros servidores, por favor intente mas' }))
    }
  }
  dispatch(handleSuccess(data.soats, skip))
}

function loadingMore () {
  return { type: ON_LOADING_MORE_SOATS }
}
function onRefreshing () {
  return { type: ON_REFRESHING_SOATS }
}
function onSuccessLodingMore (data, skip) {
  return { type: SUCCESS_PAGINATION_SOATS, data, skip }
}
function handleSuccess (data) {
  return { type: SUCCESS_GET_SOATS, data }
}

function handleError (error) {
  return { type: ERROR_GET_SOATS, error }
}

function onFetching () {
  return { type: ON_FETCHING_SOATS }
}
