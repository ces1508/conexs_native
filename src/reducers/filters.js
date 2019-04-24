import {
  TOOGLE_FILTER,
  SET_FILTER,
  RESET_FILTERS,
  APPLYFILTERS
} from '../actions/filters'

const initialState = {
  show: false,
  siniesters: false,
  actives: false,
  applyFilters: 0
}

export default function filterReducer (state = initialState, actions) {
  switch (actions.type) {
    case TOOGLE_FILTER:
      return {
        ...state,
        show: !state.show
      }
    case SET_FILTER:
      return {
        ...state,
        [actions.name]: !state[actions.name]
      }
    case RESET_FILTERS:
      return {
        ...state,
        show: false,
        onlyActives: false,
        onlySinisters: false
      }
    case APPLYFILTERS:
      return {
        ...state,
        applyFilters: state.applyFilters + 1
      }
    default:
      return state
  }
}
