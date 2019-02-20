import {
  ERROR_GET_SINISTERS,
  ON_FETCHING_SINISTERS,
  SUCCESS_GET_SINISTERS,
  SET_CURRENT_SINISTER
} from '../actions/sinisters/actions'

const initialState = {
  data: [],
  onFetching: false,
  error: null,
  currentSinister: {}
}

export default function sinistersReducer (state = initialState, action) {
  switch (action.type) {
    case ON_FETCHING_SINISTERS:
      return {
        ...state,
        onFetching: true
      }
    case ERROR_GET_SINISTERS:
      return {
        ...state,
        onFetching: false,
        error: action.error
      }
    case SUCCESS_GET_SINISTERS:
      return {
        ...state,
        onFetching: false,
        data: [...action.data]
      }
    case SET_CURRENT_SINISTER:
      return {
        ...state,
        currentSinister: { ...action.sinister }
      }
    default:
      return state
  }
}
