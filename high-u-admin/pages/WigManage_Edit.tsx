import React from 'react'

// IMPORT COMPONENT
import DrawerBar from '../components/DrawerBar'
import WigEdit from './WigEdit/[id]'

// IMPORT PAGE

function WigManage() {
  return (
    <div>
      <DrawerBar />
      <WigEdit />
    </div>
  )
}

export default WigManage