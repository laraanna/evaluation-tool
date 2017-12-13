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




class StudentView extends PureComponent {


  componentWillMount() {
    const { batch, fetchOneBatch } = this.props
    const { batchId } = this.props.match.params

    if (!batch) { fetchOneBatch(batchId) }
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps
  }





  render() {
    const { batch } = this.props

    if (!batch) return null

    return(
      <div className="Batch">
        <h1> TESSSST </h1>

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

export default connect(mapStateToProps, {fetchOneBatch, push})(StudentView)
