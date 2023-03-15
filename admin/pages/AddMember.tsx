import React from 'react'
import Head from 'next/head'

// IMPORT COMPONENT
import AddMember_Form from '../components/Form/AddMember_Form'

function AddMember() {
  return (
    <div>
      <Head><title>Add Member | High U Administrator</title></Head>
      <AddMember_Form />
    </div>
  )
}

export default AddMember