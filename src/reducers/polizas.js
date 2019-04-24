import {
  ERROR_GET_POLIZAS,
  SUCCESS_GET_POLIZAS,
  ON_FETCHING_POLIZAS,
  LOADING_MORE_POLIZAS,
  ON_SUCCESS_PAGINATION,
  ON_REFRESHING_POLIZAS
} from '../actions/polizas/actions'

const initialState = {
  data: [],
  onFetching: false,
  error: {},
  loadingMore: false,
  skip: 0,
  limit: 20,
  refreshing: false,
  initLoad: false,
  isLastPage: false
}

export default function polizasReducer (state = initialState, action) {
  switch (action.type) {
    case ON_FETCHING_POLIZAS:
      return {
        ...state,
        onFetching: true,
        initLoad: true
      }
    case ERROR_GET_POLIZAS:
      return {
        ...state,
        onFetching: false,
        loadingMore: false,
        refreshing: false,
        error: action.error
      }
    case SUCCESS_GET_POLIZAS:
      return {
        ...state,
        onFetching: false,
        error: {},
        skip: 0,
        refreshing: false,
        isLastPage: false,
        data: action.polizas
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
        data: [...state.data, ...action.polizas],
        isLastPage: action.polizas.length < 5
      }
    case ON_REFRESHING_POLIZAS:
      return {
        ...state,
        refreshing: true
      }
    default:
      return state
  }
}
