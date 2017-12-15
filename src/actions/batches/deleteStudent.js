import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import {STUDENT_REMOVED} from './subscribe'


const api = new API()

export const DELETE_STUDENT = 'DELETE_STUDENT'

export default (batchId, studentId) => {
  return (dispatch) => {

    dispatch({ type: APP_LOADING })

    const content = {studentId}

    console.log(content)

    api.delete(`/batches/${batchId}/${studentId}`)
      .then(res => {
        dispatch({ type: STUDENT_REMOVED, payload: res.body })
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
