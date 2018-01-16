import React, { PureComponent } from "react";
import { connect } from "react-redux";
import createBatch from "../actions/batches/create";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const style = {
  margin: 12
};

class BatchEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      number: null,
      startDate: null,
      endDate: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
  }

  handleNumber(event, number) {
    this.setState({ number: number });
    console.log(number);
  }

  handleStartDate(event, startDate) {
    this.setState({ startDate: startDate });
    console.log(startDate);
  }

  handleEndDate(event, endDate) {
    this.setState({ endDate: endDate });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    const batch = {
      ...this.state
    };
    console.table(batch);
    this.props.createBatch(batch);
    this.setState({ number: "", endDate: "", startDate: "" });
  }

  render() {
    return (
      <div className="BatchEditor">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <TextField
            id="text-field-controlled"
            value={this.state.number}
            onChange={this.handleNumber}
            placeholder="Batch Number"
          />
          <DatePicker
            value={this.state.startDate}
            onChange={this.handleStartDate}
            hintText="Start Date"
          />
          <DatePicker
            value={this.state.endDate}
            onChange={this.handleEndDate}
            hintText="End Date"
          />
        </form>

        <div className="actions">
          <RaisedButton
            label="Add Batch"
            style={style}
            secondary={true}
            onClick={this.handleSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { createBatch: createBatch };

export default connect(null, mapDispatchToProps)(BatchEditor);
