import { FETCHED_BATCHES, FETCHED_ONE_BATCH } from '../actions/batches/fetch'
import {
  BATCH_CREATED,
  STUDENT_ADDED,
  EVALUATION_ADDED,
  STUDENT_REMOVED

} from '../actions/batches/subscribe'


export default (state = [], {type, payload} = {}) => {
  switch(type) {
    case FETCHED_BATCHES :
      return [ ...payload ]

    case FETCHED_ONE_BATCH :
      const batchIds = state.map(b => b._id)
      if (batchIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((batch) => {
        if (batch._id === payload._id) {
          return { ...payload }
        }
        return batch
      })



    case STUDENT_ADDED:
      return state.map((batch) => {
        if (batch._id === payload._id) {
          return { ...payload }
        }
        return batch
      })

    case EVALUATION_ADDED:
      return state.map((batch) => {
        if (batch._id === payload._id) {
          return { ...payload }
        }
      return batch
    })

    case STUDENT_REMOVED:
      return state.filter((batch) => (batch._id !== payload._id))





    case BATCH_CREATED :
      const newBatch = { ...payload }
      return [newBatch].concat(state)




    default :
      return state
  }
}
