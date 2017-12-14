import ApiClient from '../../api/client'
import {push} from 'react-router-redux'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'


export const FETCHED_BATCHES = 'FETCHED_BATCHES'
export const FETCHED_ONE_BATCH = 'FETCH_ONE_GAME'
export const FETCHED_LUCKYSTUDENT = 'FETCHED_LUCKYSTUDENT'

const api = new ApiClient()

export default () => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get('/batches')
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_BATCHES,
          payload: res.body
        })
        console.log(res.body)
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


export const fetchOneBatch = (id) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/batches/${id}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_BATCH,
          payload: result.body
        })
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


export const fetchLuckyStudent = (batch) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/batches/${batch._id}/ask`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_LUCKYSTUDENT,
          payload: result.body
        })
        dispatch(push(`/students-path/${batch._id}/${result.body._id}`))
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
