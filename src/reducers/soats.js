import {
  SUCCESS_GET_SOATS,
  ON_FETCHING_SOATS,
  ERROR_GET_SOATS
} from '../actions/soats/actions'

const initialState = {
  soats: [],
  onFetching: false,
  error: {}
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
        error: action.error
      }
    case SUCCESS_GET_SOATS:
      return {
        ...state,
        onFetching: false,
        error: {},
        soats: [...state.soats, ...action.soats]
      }
    default:
      return state
  }
}
