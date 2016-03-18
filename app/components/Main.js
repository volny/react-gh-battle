import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import '../main.css'

export default function ({children, location}) {
  return (
    <div className='mainContainer'>
      <ReactCSSTransitionGroup
        transitionName='appear'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        {React.cloneElement(children, {key: location.pathname})}
      </ReactCSSTransitionGroup>
    </div>
  )
}
