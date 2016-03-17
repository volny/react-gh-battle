import React, { PropTypes } from 'react'

export default function ({header, children}) {
  return (
      <div className="col-sm-6">
        <p className="lead">{header}</p>
        {children}
      </div>
  )
}
