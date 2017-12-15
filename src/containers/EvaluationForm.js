import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const COLORS = ['green', 'yellow', 'red' ]

class EvaluationForm extends PureComponent {
  constructor(props) {
    super()

    const { date, color, remarks} = props
    this.state = { date, color, remarks, }
  }

  setColor(event) {
   this.setState({
     color: event.target.value
   })
   console.log(event.target.value)
  }

  updateRemarks(event) {
    this.setState({
      remarks: this.refs.remarks.value
    })
  }

  setDate(event) {
   this.setState({
     date: this.refs.date.value
   })
  }


  submitEvaluation() {
   console.log(this.state)
   const evaluation = {
     ...this.state,

   }
   console.table(evaluation)
  }



  render(){
    return(
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
            ref="remarks"
            placeholder="Remarks..."
            defaultValue={this.state.remarks}
            onChange={this.updateRemarks.bind(this)}
            onKeyUp={this.updateRemarks.bind(this)}
          />

        </form>

        <div className="actions">
          <button type="submit" className="primary" onClick={this.submitEvaluation.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

export default EvaluationForm
