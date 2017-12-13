import { FETCHED_BATCHES } from '../actions/batches/fetch'
import {
  BATCH_CREATED,

} from '../actions/batches/subscribe'


export default (state = [], {type, payload} = {}) => {
  switch(type) {
    case FETCHED_BATCHES :
      return [ ...payload ]

    case BATCH_CREATED :
      const newBatch = { ...payload }
      return [newBatch].concat(state)




    default :
      return state
  }
}
