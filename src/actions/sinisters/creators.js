import Datasource from '../../api'
import {
  ERROR_GET_SINISTERS,
  ON_FETCHING_SINISTERS,
  SUCCESS_GET_SINISTERS
} from './actions'

export const getSinisters = (poliza) => {
  return async dispatch => {
    dispatch(handleOnFetching())
    let { data, status } = await Datasource.getSinisters(poliza)
    console.log(data)
    console.log(status)
    if (status === 401 || status === 413) return dispatch(handleError({ type: 'unAuthorizade' }))
    if (status === 500 || data.error) return dispatch(handleError({ type: 'FATAL_SERVER_ERROR', message: 'estamos presentando problemas, por favor intenta mas tarde' }))
    dispatch(handleSuccess(data))
  }
}
function handleOnFetching () {
  return { type: ON_FETCHING_SINISTERS }
}
function handleError (error) {
  return { type: ERROR_GET_SINISTERS, error }
}
function handleSuccess (data) {
  return { type: SUCCESS_GET_SINISTERS, data }
}
