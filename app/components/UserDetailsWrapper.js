import React, { PropTypes } from 'react'

export default function (props) {
  return (
      <div className="col-sm-6">
        <p className="lead">{props.header}</p>
        {props.children}
      </div>
  )
}
