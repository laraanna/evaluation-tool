import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import EvaluationForm from './EvaluationForm'
import addEvaluation from '../actions/batches/addEvaluation'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const COLORS = ['green', 'yellow', 'red' ]
class StudentView extends PureComponent {
  constructor(props) {
    super()

    const { remark, date, color} = props
    this.state = { remark, date, color }
  }
  componentWillMount() {
    const { batch, fetchOneBatch } = this.props
    const { batchId } = this.props.match.params

    if (!batch) { fetchOneBatch(batchId) }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { batch } = nextProps
  // }

  setColor(event) {
   this.setState({
     color: event.target.value
   })
   console.log(event.target.value)
  }

  updateRemarks(event) {
    this.setState({
      remark: this.refs.remark.value
    })
  }

  setDate(event) {
   this.setState({
     date: this.refs.date.value
   })
  }


  submitEvaluation() {
  const { batch } = this.props
  const {studentId} = this.props.match.params
   console.log(this.state)
   const evaluation = {
     ...this.state,

   }
   console.table(evaluation)
   console.log(studentId)
   console.log(batch._id)
   const student = batch.students.filter((s) => (s._id === studentId))[0]

   this.props.addEvaluation(batch, studentId, evaluation, student)
  }

  renderEvaluation = (feedback, index) => {
    return (
       <TableRow key={index}>
        <TableRowColumn>{feedback.color}</TableRowColumn>
        <TableRowColumn>{feedback.remark}</TableRowColumn>
        <TableRowColumn>{feedback.date}</TableRowColumn>
      </TableRow>
    )
  }

  render() {
    const { batch } = this.props
    if (!batch) return null
    const {studentId} = this.props.match.params
    const thisStudent = batch.students.filter((s) => (s._id === studentId))[0]

    return(
      <div className="Batch">
        <h1> {thisStudent.name}  </h1>
        <p> Student id: {studentId} </p>
        <p> Name: {thisStudent.name} </p>
        <p> Batch Number: #{batch.number} </p>
        <img src={thisStudent.picture} />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
               <TableHeaderColumn>COLOR</TableHeaderColumn>
               <TableHeaderColumn>REMARKS</TableHeaderColumn>
               <TableHeaderColumn>DATE</TableHeaderColumn>
             </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {thisStudent.evaluation.map(this.renderEvaluation)}
          </TableBody>
        </Table>

        <div className="EvaluationForm">
          <form id="Evaluation" onSubmit={this.submitEvaluation.bind(this)}>
            <input
              type="date"
              ref="date"
              id="myDate"
              defaultValue={this.state.date}
              onChange={this.setDate.bind(this)}
              onKeyUp={this.setDate.bind(this)}
            />

            {COLORS.map((type) => {
              return <label key={type} htmlFor={type}>
                  <input id={type} type="radio" name="type" value={type} onChange={this.setColor.bind(this)}/>
                  {type}
                </label>
            })}

            <input
              type="text"
              ref="remark"
              placeholder="Remarks..."
              defaultValue={this.state.remark}
              onChange={this.updateRemarks.bind(this)}
              onKeyUp={this.updateRemarks.bind(this)}
            />

          </form>

          <div className="actions">
            <button type="submit" className="primary" onClick={this.submitEvaluation.bind(this)}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  return {
    batch
  }
}

export default connect(mapStateToProps, {fetchOneBatch, push, addEvaluation: addEvaluation})(StudentView)
