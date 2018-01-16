import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchOneBatch } from "../actions/batches/fetch";
import { Link } from "react-router-dom";
import addStudent from "../actions/batches/addStudent";
import deleteStudent from "../actions/batches/deleteStudent";
import PercentageBar from "../components/batches/PercentageBar";
import Avatar from "material-ui/Avatar";
import FileFolder from "material-ui/svg-icons/file/folder";
import FontIcon from "material-ui/FontIcon";
import { List, ListItem } from "material-ui/List";
import { fetchLuckyStudent } from "../actions/batches/fetch";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from "material-ui/IconButton";
import DeleteCan from "material-ui/svg-icons/action/delete";
import { red900 } from "material-ui/styles/colors";
import "./Batch.css";

const style = {
  margin: 12
};

const styles = {
  smallIcon: {
    width: 36,
    height: 36
  },
  small: {
    width: 72,
    height: 72,
    padding: 16
  }
};

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
      students: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          name: PropTypes.string,
          picture: PropTypes.string,
          evaluation: PropTypes.arrayOf(
            PropTypes.shape({
              color: PropTypes.string,
              date: PropTypes.string,
              remark: PropTypes.string
            })
          )
        })
      )
    })
  };
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      picture: null
    };

    this.addStudent = this.addStudent.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePicture = this.handlePicture.bind(this);
  }

  handleName(event, name) {
    this.setState({ name: name });
  }

  handlePicture(event, picture) {
    this.setState({ picture: picture });
  }

  componentWillMount() {
    const { batch, fetchOneBatch } = this.props;
    const { batchId } = this.props.match.params;
    if (!batch) {
      fetchOneBatch(batchId);
    }
  }

  goToStudent = (batchId, studentId) => event =>
    this.props.push(`/students-path/${batchId}/${studentId}`);

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps;
  }

  addStudent(event) {
    event.preventDefault();
    const { batch } = this.props;
    const student = {
      ...this.state,
      evaluation: [
        {
          color: "red",
          remarks: "",
          date: Date.now
        }
      ]
    };
    this.props.addStudent(student, batch);
    this.setState({ name: "", picture: "" });
  }

  percentageCount(color) {
    const { batch } = this.props;
    const countArray = batch.students.filter(function(el) {
      return el.evaluation[el.evaluation.length - 1].color === color;
    });
    return countArray;
  }

  deleteStudent = (batchId, studentId) => event => {
    console.log("delete");
    console.log(batchId);
    console.log(studentId);
    this.props.deleteStudent(batchId, studentId);
  };

  renderOneStudent = (student, index) => {
    const { batch } = this.props;
    const lastColor = student.evaluation[student.evaluation.length - 1].color;

    return (
      <ListItem
        key={index}
        leftAvatar={<Avatar src={student.picture} size={50} />}
      >
        <h2 onClick={this.goToStudent(batch._id, student._id)}>
          {" "}
          {student.name}{" "}
        </h2>
        <p> Last Evaluated Color: {lastColor} </p>
        <IconButton
          iconStyle={styles.smallIcon}
          style={styles.small}
          onClick={this.deleteStudent(batch._id, student._id)}
        >
          <DeleteCan color={red900} />
        </IconButton>
      </ListItem>
    );
  };

  selectStudent = () => {
    const { batch } = this.props;
    this.props.fetchLuckyStudent(batch);
  };

  render() {
    const { batch } = this.props;
    if (!batch) return null;

    const green = this.percentageCount("green").length;
    const red = this.percentageCount("red").length;
    const yellow = this.percentageCount("yellow").length;
    const totalCount = batch.students.length;

    return (
      <div className="Batch">
        <h1>BATCH #{batch.number}</h1>
        <PercentageBar
          green={green}
          red={red}
          yellow={yellow}
          totalCount={totalCount}
        />
        <p> Total Count of Students: {totalCount} </p>
        <List>{batch.students.map(this.renderOneStudent)}</List>

        <div className="StudentEditor">
          <form onSubmit={this.addStudent.bind(this)}>
            <TextField
              id="text-field-controlled"
              value={this.state.name}
              onChange={this.handleName}
              placeholder="Students Name"
            />
            <br />
            <TextField
              id="text-field-controlled"
              value={this.state.picture}
              onChange={this.handlePicture}
              placeholder="Image URL"
            />
          </form>
          <div className="actions">
            <RaisedButton
              label="Add Student to Batch"
              style={style}
              secondary={true}
              onClick={this.addStudent.bind(this)}
            />
          </div>
        </div>

        <RaisedButton
          label="ASK A QUESTION"
          style={style}
          primary={true}
          onClick={this.selectStudent}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ currentUser, batches }, { match }) => {
  const batch = batches.filter(b => b._id === match.params.batchId)[0];

  return {
    batch
  };
};

export default connect(mapStateToProps, {
  fetchOneBatch,
  push,
  fetchLuckyStudent,
  addStudent: addStudent,
  deleteStudent: deleteStudent
})(Batch);
