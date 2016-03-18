import React, { Component } from 'react'

import { transparentBg } from '../styles'

export default class MainContainer extends Component {
  render () {
    return (
      <div className="jumbotron col-sm-12 text-center" style={transparentBg}>
        {this.props.children}
      </div>
    )
  }
}
