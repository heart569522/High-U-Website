import Head from 'next/head'
import React from 'react'

// IMPORT COMPONENT
import DrawerBar from '../components/Navigation/DrawerBar'
import WigManage_Table from '../components/Table/WigManage_Table'

// IMPORT PAGE

function WigManage() {
  return (
    <div>
      <Head><title>Wig Manage | High U Administrator</title></Head>
      <DrawerBar />
      <WigManage_Table />
    </div>
  )
}

export default WigManage