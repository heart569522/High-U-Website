import React from 'react'
import Head from 'next/head'

// IMPORT COMPONENT
import DrawerBar from '../components/Navigation/DrawerBar'
import AddWig_Form from '../components/Form/AddWig_Form'

function AddWig() {
  return (
    <div>
      <Head><title>Add Wig | High U Administrator</title></Head>
      <DrawerBar />
      <AddWig_Form />
    </div>
  )
}

export default AddWig