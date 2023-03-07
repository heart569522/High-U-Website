import React from 'react'
import Head from 'next/head'

// IMPORT COMPONENT
import DrawerBar from '../components/Navigation/DrawerBar'
import AddAR_Form from '../components/Form/AddAR_Form'

export default function AddAR() {
  return (
    <div>
      <Head><title>Add AR | High U Administrator</title></Head>
      <DrawerBar />
      <AddAR_Form />
    </div>
  )
}