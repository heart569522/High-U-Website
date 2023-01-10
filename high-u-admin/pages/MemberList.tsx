import React from 'react'

// IMPORT COMPONENT
import DrawerBar from '../components/DrawerBar'
import MemberList_Table from '../components/Table/MemberList_table'

// IMPORT PAGE

function MemberList() {
  return (
    <div>
      <DrawerBar />
      <MemberList_Table />
    </div>
  )
}

export default MemberList