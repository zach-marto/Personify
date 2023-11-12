import React from 'react'

import './topbar.css'

function Topbar() {
  return (
    <div className="topbar" style={{display:"flex",  justifyContent:"stretch"}}>
      <div  className='topbar-left'>
        <h1>Personify</h1>
      </div>
     <div className='topbar-right'>
      <button >Profile</button>
      </div>
    </div>
  )
}

export default Topbar