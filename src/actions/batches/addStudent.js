import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import {STUDENT_ADDED} from './subscribe'


const api = new API()

export const ADD_STUDENT = 'ADD_STUDENT'

export default (student, batch) => {
  return (dispatch) => {

    dispatch({ type: APP_LOADING })

    const content = {student, batch}

    console.log(content)

    api.patch(`/batches/${batch._id}`, content)
      .then(res => {
        dispatch({ type: STUDENT_ADDED, payload: res.body })
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
