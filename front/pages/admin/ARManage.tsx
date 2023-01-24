import React from 'react'

// IMPORT COMPONENT
import DrawerBar from '../../components/Navigation/DrawerBar'
import ARManage_Table from '../../components/Table/ARManage_Table'

// IMPORT PAGE

function ARManage() {
  return (
    <div>
      <DrawerBar />
      <ARManage_Table />
    </div>
  )
}

export default ARManage