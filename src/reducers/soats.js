import {
  SUCCESS_GET_SOATS,
  ON_FETCHING_SOATS,
  ERROR_GET_SOATS,
  ON_LOADING_MORE_SOATS,
  ON_REFRESHING_SOATS,
  SUCCESS_PAGINATION_SOATS
} from '../actions/soats/actions'

const initialState = {
  data: [],
  onFetching: false,
  error: {},
  loadingMore: false,
  refreshing: false,
  isLastPage: false,
  skip: 0,
  limit: 20
}

export default function soatsReducer (state = initialState, action) {
  switch (action.type) {
    case ON_FETCHING_SOATS:
      return {
        ...state,
        onFetching: true
      }
    case ERROR_GET_SOATS:
      return {
        ...state,
        onFetching: false,
        loadingMore: false,
        error: action.error
      }
    case SUCCESS_GET_SOATS:
      return {
        ...state,
        onFetching: false,
        error: {},
        isLastPage: false,
        loadingMore: false,
        refreshing: false,
        data: [...action.data]
      }
    case ON_LOADING_MORE_SOATS:
      return {
        ...state,
        loadingMore: true
      }
    case ON_REFRESHING_SOATS:
      return {
        ...state,
        refreshing: true
      }
    case SUCCESS_PAGINATION_SOATS:
      return {
        ...state,
        loadingMore: false,
        data: [...state.data, ...action.data],
        isLastPage: action.data.length < 5,
        skip: action.skip
      }
    default:
      return state
  }
}
