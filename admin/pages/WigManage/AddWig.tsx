import React from 'react'
import Head from 'next/head'

// IMPORT COMPONENT
import AddWig_Form from '../../components/Form/AddWig_Form-old'

function AddWig() {
  return (
    <div>
      <Head><title>Add Wig | High U Administrator</title></Head>
      <AddWig_Form />
    </div>
  )
}

export default AddWig