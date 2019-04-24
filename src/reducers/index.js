import { combineReducers } from 'redux'
import login from './login'
import polizas from './polizas'
import sinisters from './sinisters'
import soats from './soats'
import profile from './profile'
import notifications from './notifications'
import filters from './filters'
export default combineReducers({
  login,
  polizas,
  sinisters,
  soats,
  profile,
  notifications,
  filters
})
