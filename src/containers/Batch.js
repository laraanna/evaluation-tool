import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import { Link } from 'react-router-dom'
import addStudent from '../actions/batches/addStudent'
import PercentageBar from '../components/batches/PercentageBar'
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';


class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        picture: PropTypes.string,
        evaluation: PropTypes.arrayOf(PropTypes.shape({
          color: PropTypes.string,
          date: PropTypes.string,
          remark: PropTypes.string,
        }))
      }))
    }),
  }

  componentWillMount() {
    const { batch, fetchOneBatch } = this.props
    const { batchId } = this.props.match.params
    if (!batch) { fetchOneBatch(batchId) }
  }

  goToStudent = (batchId, studentId) => event => this.props.push(`/students-path/${batchId}/${studentId}`)

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps
  }



  addStudent(event){
    event.preventDefault()
    const { batch } = this.props
    const student = {
      name: this.refs.name.value,
      picture: this.refs.picture.value,
      evaluation: [{
        color: "red",
        remarks: "",
        date: Date.now
      }]
    }
    this.props.addStudent(student, batch)
  }

  percentageCount(color){
    const { batch } = this.props
    const countArray = batch.students.filter(function(el){
      return el.evaluation[el.evaluation.length-1].color === color
    })
    return countArray
  }

  renderOneStudent = (student, index) => {
    const {batch} = this.props
    const lastColor = student.evaluation[student.evaluation.length-1].color

    return(
      <ListItem onClick={this.goToStudent(batch._id, student._id)} key={index}  secondaryText={lastColor} leftAvatar={ <Avatar src={student.picture} size={50} />}  >
        {student.name}
      </ListItem>
    )
  }

  render() {
    const { batch } = this.props
    if (!batch) return null
    // const green = batch.students.find(function (red) { return red.color === "green"; });
    const green = this.percentageCount('green').length
    const red = this.percentageCount('red').length
    const yellow = this.percentageCount('yellow').length
    const totalCount = batch.students.length


    return(
      <div className="Batch">
        <h1>BATCH #{batch.number}</h1>
        <PercentageBar green={green} red={red} yellow={yellow} totalCount={totalCount}/>
        <p> Total Count of Students: {totalCount} </p>
        {/*<p> Green: {green} </p>
        <p> Red: {red} </p>
        <p> Yellow: {yellow} </p>
        */}
        <List>
          {batch.students.map(this.renderOneStudent) }
        </List>

        <div className="StudentEditor">
          <form onSubmit={this.addStudent.bind(this)}>
            <input type="string" ref="name" placeholder="Students Name"/>
            <input type="string" ref="picture" placeholder="Image URL" />
          </form>
          <div className="actions">
            <button className="primary" onClick={this.addStudent.bind(this)}>Add Student to Batch</button>
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

export default connect(mapStateToProps, {fetchOneBatch, push, addStudent: addStudent})(Batch)
