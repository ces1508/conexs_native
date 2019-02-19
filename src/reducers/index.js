import { combineReducers } from 'redux'
import login from './login'
import polizas from './polizas'
import sinisters from './sinisters'
import soats from './soats'
export default combineReducers({
  login,
  polizas,
  sinisters,
  soats
})
