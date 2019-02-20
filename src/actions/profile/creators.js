import Datasource from '../../api'
import {
  ERROR_FETCH_PROFILE,
  ON_FETCHING_PROFILE,
  ON_SUCCESS_FETCH_PROFILE
} from './action'

export const getProfile = token =>
  async dispatch => {
    dispatch(onFetching())
    let { data, status } = await Datasource.getProfile(token)
    if (status === 401 || status === 413) return dispatch(handleError({ type: 'unAuthorizade' }))
    if (status === 500 || data.error) return dispatch(handleError({ type: 'FATAL_SERVER_ERROR', message: 'estamos presentando problemas, por favor intenta mas tarde' }))
    dispatch(handleSuccess(data.profile))
  }

function onFetching () {
  return { type: ON_FETCHING_PROFILE }
}
function handleSuccess (profile) {
  return { type: ON_SUCCESS_FETCH_PROFILE, profile }
}
function handleError (e) {
  return { type: ERROR_FETCH_PROFILE, error: e }
}
