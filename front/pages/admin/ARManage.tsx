import Head from 'next/head'
import React from 'react'

// IMPORT COMPONENT
import DrawerBar from '../../components/Navigation/DrawerBar'
import ARManage_Table from '../../components/Table/ARManage_Table'

// IMPORT PAGE

function ARManage() {
  return (
    <div>
      <Head><title>AR Manage | High U Administrator</title></Head>
      <DrawerBar />
      <ARManage_Table />
    </div>
  )
}

export default ARManage