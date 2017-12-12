import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import RecipesContainer from './recipes/RecipesContainer'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={BatchesContainer} />
      </div>
    )
  }
}
