import AR_Data from '../../../helper/AR_Data.json';

interface AR {
    id: number;
    image: string;
    title: string;
    color: string;
    use: number;
}

export function getAR(id: number) {
    return new Promise((resolve) => {
        const ar = AR_Data.find((ar) => ar.id === id)
        resolve(ar)
    })
}

export function updateAR(data: AR) {
    return new Promise<void>((resolve) => {
        //   let updated = //update the product
        //   resolve(updated)
        resolve()
    })
}