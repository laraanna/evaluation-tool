import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import {EVALUATION_ADDED} from './subscribe'

const api = new API()

export const ADD_EVALUATION = 'ADD_EVALUATION'

export default (student, batch) => {
  return (dispatch) => {
