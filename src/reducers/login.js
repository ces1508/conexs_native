import {
  HANDLE_INPUT,
  ERROR_LOGIN,
  ON_FETCHING,
  SUCCESS_LOGIN
} from '../actions/login'

const initialState = {
  value: '',
  successLogin: false,
  error: {},
  onFetching: false
}

export default function LoginReducers (state = initialState, action) {
  switch (action.type) {
    case HANDLE_INPUT:
      return {
        ...state,
        value: action.value,
        error: {}
      }
    case ON_FETCHING:
      return {
        ...state,
        onFetching: false
      }
    case SUCCESS_LOGIN:
      return {
        ...state,
        onFetching: false,
        successLogin: true
      }
    case ERROR_LOGIN:
      return {
        ...state,
        onFetching: false,
        error: action.error
      }
    default:
      return state
  }
}
