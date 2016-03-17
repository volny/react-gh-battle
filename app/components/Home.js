import React from 'react'
import ReactRouter, { Link } from 'react-router'

import MainContainer from '../containers/MainContainer'

export default function () {
  return (
    <MainContainer>
      <h1>Github Battle</h1>
      <p className='lead'>Some fancy motto</p>
      <Link to='/playerOne'>
        <button type='button' className='btn btn-lg btn-success'>Get started</button>
      </Link>
    </MainContainer>
  )
}
