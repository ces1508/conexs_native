import {
  HANDLE_INPUT,
  ERROR_LOGIN,
  ON_FETCHING,
  SUCCESS_LOGIN,
  CLEAN,
  SET_TOKEN
} from '../actions/login'

const initialState = {
  value: '',
  successLogin: false,
  error: {},
  onFetching: false,
  token: null
}

export default function LoginReducers (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
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
        successLogin: true,
        token: action.token
      }
    case ERROR_LOGIN:
      return {
        ...state,
        onFetching: false,
        error: action.error
      }
    case CLEAN:
      return {
        ...initialState
      }
    default:
      return state
  }
}
