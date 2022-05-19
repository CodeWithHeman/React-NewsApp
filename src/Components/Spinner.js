import React from 'react'
import Loading from '../loading.gif'

const Spinner = ()=> {
    return (
      <div className="text-center">
        <img className='my-3' alt='loading' src={Loading}/>
      </div>
    )  
}
export default Spinner