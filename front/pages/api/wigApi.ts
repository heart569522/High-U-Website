import Wig_Product from '../../helper/Wig_Product.json';

interface Wig {
  id: number;
  image: string;
  title: string;
  desc: string;
  color: string;
  size: string;
  brand: string;
}

export function getWig(id: number) {
  return new Promise((resolve) => {
    const product = Wig_Product.find((product) => product.id === id)
    resolve(product)
  })
}

export function updateWig(data: Wig) {
  return new Promise<void>((resolve) => {
    //   let updated = //update the product
    //   resolve(updated)
    resolve()
  })
}

export function deleteWig() {
  
}