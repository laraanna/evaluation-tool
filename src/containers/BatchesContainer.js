import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../actions/batches/fetch'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'



class BatchesContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
  }



   renderBatch = (batch, index) => {

     const number = batch.number

     return (
       <MenuItem key={index} primaryText={batch.number} />
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

      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches})

export default connect(mapStateToProps,{fetchBatches, push})(BatchesContainer)
