// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import updateLayout from './updateLayout'


const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  updateLayout
})

export default rootReducer
