import React from 'react'
import spinnerImg from '../../assets/spinnerImg.gif'

let spinner = () => {
  return (
   <React.Fragment>
    <div>
        <img  className='d-block m-auto' style={{width:'200px'}} src={spinnerImg} alt='' />
    </div>
   </React.Fragment>
  )
}

export default spinner;