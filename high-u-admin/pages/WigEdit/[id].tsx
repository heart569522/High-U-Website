import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getWig, updateWig } from '../api/wigApi'

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
  const [wig, setWig] = useState<Wig>({
    id: 0,
    image: '',
    title: '',
    desc: '',
    color: '',
    size: '',
    brand: '',
  });
  
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);
  const router = useRouter()
  // const id = typeof router.query.id === 'string' ? Number(router.query.id) : undefined;
  // const [product, setProduct] = useState<Wig | null>(null)

  // useEffect(() => {
  //   if (id) {
  //     loadProduct(id).then((data) => {
  //       setProduct(data as Wig | null)
  //     })
  //   }
  // }, [id])

  // const handleSubmit = (data: Wig) => {
  //   updateProduct(data).then(() => {
  //     router.push('/')
  //   })
  // }

  // if (!product) {
  //   return <h1 className="text-black text-6xl">Loading...</h1>
  // }

  useEffect(() => {
    const fetchWig = async () => {
      setLoading(true);
      try {
        const id = typeof router.query.id === 'string' ? Number(router.query.id) : undefined;
        const wig = await getWig(id as number);
        setWig(wig as Wig);
        setLoading(false);
      } catch (err) {
        // setError(err);
        setLoading(false);
      }
    };
    fetchWig();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateWig(wig);
      router.push('/wigs');
    } catch (err) {
      // setError(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWig({ ...wig, [name]: value });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <div>
      <h1 className="text-2xl font-medium mb-4">Edit Wig</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={wig.title}
            onChange={handleInputChange}
            className="bg-white text-black focus:outline-none focus:shadow-outline-blue focus:border-blue-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          />
        </label>
        <label className="block mb-2">
          Description:
          <input
            type="text"
            name="description"
            value={wig.desc}
            onChange={handleInputChange}
            className="bg-white text-black focus:outline-none focus:shadow-outline-blue focus:border-blue-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          />
        </label>
        <label className="block mb-2">
          Color:
          <input
            type="text"
            name="color"
            value={wig.color}
            onChange={handleInputChange}
            className="bg-white text-black focus:outline-none focus:shadow-outline-blue focus:border-blue-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          />
        </label>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full" type="submit">Save</button>
      </form>
    </div>
  )
}

export default WigEdit