import Head from 'next/head'
import React from 'react'

// IMPORT COMPONENT
import WigManage_Table from '../components/Table/WigManage_Table'

// IMPORT PAGE

function WigManage() {
  return (
    <div>
      <Head><title>Wig Manage | High U Administrator</title></Head>
      <WigManage_Table />
    </div>
  )
}

export default WigManage