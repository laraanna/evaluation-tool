import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createBatch from '../actions/batches/create'


class BatchEditor extends PureComponent {

  submitBatch(event){
    event.preventDefault()

    const batch = {
      number: this.refs.number.value,
      startDate: this.refs.startDate.value,
      endDate: this.refs.endDate.value
    }

    this.props.createBatch(batch)
  }


  render() {
    return (
      <div classname="BatchEditor">
        <form onSubmit={this.submitBatch.bind(this)}>
          <input
            type="number"
            ref="number"
            placeholder="Batch Number"
          />

          <input
            type="date"
            ref="startDate"
            placeholder="Start Date"
          />

          <input
            type="date"
            ref="endDate"
            placeholder="End Date"
          />
        </form>

        <div className="actions">
          <button className="primary" onClick={this.submitBatch.bind(this)}>Add Batch</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { createBatch: createBatch }

export default connect(null, mapDispatchToProps)(BatchEditor)
