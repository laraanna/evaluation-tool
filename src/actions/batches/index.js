import fetch, {FETCHED_BATCHES, FETCHED_ONE_BATCH, FETCHED_LUCKYSTUDENT} from './fetch'
import create, {BATCH_CREATED} from './create'
import addStudent, {STUDENT_ADDED} from './addStudent'
import addEvaluation, {EVALUATION_ADDED} from './addEvaluation'
import deleteStudent, {STUDENT_REMOVED} from './deleteStudent'

export {
  FETCHED_BATCHES,
  FETCHED_ONE_BATCH,
  FETCHED_LUCKYSTUDENT,
  STUDENT_ADDED,
  STUDENT_REMOVED,
  BATCH_CREATED,
  fetch,
  create,
  addStudent,
  deleteStudent,
  addEvaluation

}
