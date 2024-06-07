
import React from 'react'

import ServerUserIndex from './ServerUserIndex';


export default  function dashboard() {
  
  return (
    <main className='gc2'>
    <h1 className='title'>רשימת מתשמשים </h1>
      <ServerUserIndex/>
    
  </main>
  )
}