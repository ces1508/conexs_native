import {
  ERROR_GET_POLIZAS,
  SUCCESS_GET_POLIZAS,
  ON_FETCHING_POLIZAS
} from '../actions/polizas/actions'

const initialState = {
  polizas: [],
  onFetching: false,
  error: {}
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
        error: action.error
      }
    case SUCCESS_GET_POLIZAS:
      return {
        ...state,
        onFetching: false,
        error: {},
        polizas: [...action.polizas]
      }
    default:
      return state
  }
}
