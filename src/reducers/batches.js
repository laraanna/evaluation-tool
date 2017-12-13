import { FETCHED_BATCHES } from '../actions/batches/fetch'


export default (state = [], {type, payload} = {}) => {
  switch(type) {
    case FETCHED_BATCHES :
      return [ ...payload ]



    default :
      return state
  }
}
