import {
  ERROR_GET_POLIZAS,
  SUCCESS_GET_POLIZAS,
  ON_FETCHING_POLIZAS,
  LOADING_MORE_POLIZAS,
  ON_SUCCESS_PAGINATION,
  ON_REFRESHING_POLIZAS
} from '../actions/polizas/actions'

const initialState = {
  polizas: [],
  onFetching: false,
  error: {},
  loadingMore: false,
  skip: 0,
  limit: 20,
  onRefreshing: false
}

export default function polizasReducer (state = initialState, action) {
  switch (action.type) {
    case ON_FETCHING_POLIZAS:
      return {
        ...state,
        onFetching: true
      }
    case ERROR_GET_POLIZAS:
      return {
        ...state,
        onFetching: false,
        loadingMore: false,
        error: action.error
      }
    case SUCCESS_GET_POLIZAS:
      return {
        ...state,
        onFetching: false,
        error: {},
        skip: 0,
        onRefreshing: false,
        polizas: [...action.polizas]
      }
    case LOADING_MORE_POLIZAS:
      return {
        ...state,
        loadingMore: true
      }
    case ON_SUCCESS_PAGINATION:
      return {
        ...state,
        loadingMore: false,
        skip: action.skip,
        polizas: [...state.polizas, ...action.polizas]
      }
    case ON_REFRESHING_POLIZAS:
      return {
        ...state,
        onRefreshing: true
      }
    default:
      return state
  }
}
