import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { loadProduct, updateProduct } from '../api/api'

interface Wig {
    id: number;
    image: string;
    title: string;
    desc: string;
    color: string;
    size: string;
    brand: string;
}

const WigEdit = () => {
  const router = useRouter()
  const id = typeof router.query.id === 'string' ? Number(router.query.id) : undefined;
  const [product, setProduct] = useState<Wig | null>(null)

  useEffect(() => {
    if (id) {
      loadProduct(id).then((data) => {
        setProduct(data as Wig | null)
      })
    }
  }, [id])

  const handleSubmit = (data: Wig) => {
    updateProduct(data).then(() => {
      router.push('/')
    })
  }

  if (!product) {
    return <h1 className="text-black text-6xl">Loading...</h1>
  }

  return (
    <div>
      <h1 className="text-black text-6xl">Edit Product : {id}</h1>
      {/* <h1 className="text-black text-6xl">Product : {product.title}</h1> */}
      {/* form to edit product */}
      <h1 className="text-black text-6xl">Product : {product.title}</h1>
    </div>
  )
}

export default WigEdit