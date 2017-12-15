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

export default (batch, studentId, evaluation, student) => {
  return (dispatch) => {

    dispatch({ type: APP_LOADING })

    const content = {batch, studentId, evaluation, student}

    console.log(content)

    api.put(`/batches/${batch._id}`, content)
      .then(res => {
        dispatch({ type: EVALUATION_ADDED, payload: res.body })
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
    }
