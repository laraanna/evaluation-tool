import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import {push} from 'react-router-redux'



const api = new API()

export const DELETE_STUDENT = 'DELETE_STUDENT'

export default (student, batch) => {
  return (dispatch) => {

    dispatch({ type: APP_LOADING })

    api.delete(`/batches/${batch._id}/${student._id}`)
      .then(res => {
        dispatch({ type: STUDENT_REMOVED, payload: res.body })
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch(push(`/batches/${batch._id}`))
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
