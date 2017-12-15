import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../actions/batches/fetch'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import AddBatchButton from '../components/batches/AddBatchButton'
import BatchEditor from './BatchEditor'



class BatchesContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
  }

  goToBatch = batchId => event => this.props.push(`/batches/${batchId}`)



   renderBatch = (batch, index) => {

     const number = batch.number
     const students = batch.students

     return (
       <MenuItem
        key={index}
        primaryText={`Batch #${number}`}
        secondaryText={`Number of Students: ${students.length}`}
        onClick={this.goToBatch(batch._id)}
        />
     )
   }


  render(){
    const { batches } = this.props

    return(
      <div>
        <h1>OVERVIEW OF BATCHES</h1>
        <Menu>
        {batches.map(this.renderBatch)}

        </Menu>
        <BatchEditor />


      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches})

export default connect(mapStateToProps,{fetchBatches, push})(BatchesContainer)
