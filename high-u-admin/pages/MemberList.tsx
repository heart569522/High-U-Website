import React from 'react'

// IMPORT COMPONENT
import DrawerBar from '../components/DrawerBar'
import MemberList_table from '../components/MemberList_table'

// IMPORT PAGE

function MemberList() {
  return (
    <div>
      <DrawerBar />
      <MemberList_table />
    </div>
  )
}

export default MemberList