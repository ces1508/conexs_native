import {
  ERROR_GET_POLIZAS,
  ON_FETCHING,
  SUCCESS_GET_POLIZAS
} from '../actions/polizas/actions'

const initialState = {
  polizas: [],
  soats: [],
  onFetching: false,
  error: {}
}

export default function polizasReducer (state = initialState, action) {
  switch (action.type) {
    case ON_FETCHING:
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
        polizas: action.polizas,
        soats: action.soats
      }
    default:
      return initialState
  }
}
