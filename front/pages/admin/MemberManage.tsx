import Head from 'next/head'
import React from 'react'

// IMPORT COMPONENT
import DrawerBar from '../../components/Navigation/DrawerBar'
import MemberManage_Table from '../../components/Table/MemberManage_Table'

// IMPORT PAGE

function MemberList() {
  return (
    <div>
      <Head><title>Member Manage | High U Administrator</title></Head>
      <DrawerBar />
      <MemberManage_Table />
    </div>
  )
}

export default MemberList