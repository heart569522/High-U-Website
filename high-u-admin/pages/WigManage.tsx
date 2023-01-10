import React from 'react'

// IMPORT COMPONENT
import DrawerBar from '../components/DrawerBar'
import WigManage_Table from '../components/Table/WigManage_Table'

// IMPORT PAGE

function WigManage() {
  return (
    <div>
      <DrawerBar />
      <WigManage_Table />
    </div>
  )
}

export default WigManage