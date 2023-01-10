import { useRouter } from 'next/router'

const EditProduct = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Edit Product {id}</h1>
      {/* form to edit product */}
    </div>
  )
}

export default EditProduct