import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Data {
  id: number;
  image: string;
  title: string;
  desc: string;
  color: string;
  size: string;
  brand: string;
}

function test() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('./helper/Wig_Product.json');
      const data: Data[] = await response.json();
      let item;
      if (typeof id === 'string') {
        item = data.find((i) => i.id === parseInt(id));
      } else {
        item = null;
      }
      setData(item as Data[] | null);
    }
    fetchData();
  }, [id]);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Detail page for ID: {id}</h1>
      <p>Name: {data[0].title}</p>
      <p>Description: {data[0].desc}</p>
        // ...
    </div>
  )
}

export default test