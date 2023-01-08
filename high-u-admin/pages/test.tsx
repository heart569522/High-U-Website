import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Data {
  id: number;
  title: string;
  image: number;
  fat: number;
  carbs: number;
  protein: number;
}

function test() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<Data[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('./helper/Wig_Product.json');
      setData(response.data);
    };
    fetchData();
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='text-3xl font-bold'>test id : {data.id}</div>
  )
}

export default test