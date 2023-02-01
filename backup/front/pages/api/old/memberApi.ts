import Member_Data from '../../helper/Member_Data.json';

interface Member {
    id: number;
    image: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
}

export function getMember(id: number) {
    return new Promise((resolve) => {
        const user = Member_Data.find((user) => user.id === id)
        resolve(user)
    })
}

export function updateMember(data: Member) {
    return new Promise<void>((resolve) => {
        //   let updated = //update the product
        //   resolve(updated)
        resolve()
    })
}