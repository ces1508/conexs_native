import { combineReducers } from 'redux'
import login from './login'
import polizas from './polizas'
import sinisters from './sinisters'
export default combineReducers({
  login,
  polizas,
  sinisters
})
