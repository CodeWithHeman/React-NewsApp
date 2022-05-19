import React, { Component } from 'react'
import Loading from '../loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img className='my-3' alt='loading' src={Loading}/>
      </div>
    )
  }
}
