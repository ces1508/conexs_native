import {
  ERROR_FETCH_PROFILE,
  ON_FETCHING_PROFILE,
  ON_SUCCESS_FETCH_PROFILE
} from '../actions/profile/action'

const initialState = {
  profile: {},
  error: null,
  onFetching: false
}

export default function profileReducer (state = initialState, action) {
  switch (action.type) {
    case ON_FETCHING_PROFILE:
      return {
        ...state,
        error: false,
        onFetching: true
      }
    case ERROR_FETCH_PROFILE:
      return {
        ...state,
        onFetching: false,
        error: action.error
      }
    case ON_SUCCESS_FETCH_PROFILE:
      return {
        ...state,
        error: null,
        onFetching: false,
        profile: action.profile
      }
    default:
      return state
  }
}
