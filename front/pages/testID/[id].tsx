import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const drawerWidth = 240;

type Member = {
    id: number;
    image: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
}

const test_edit = () => {
    const router = useRouter()
    const { id } = router.query

    const [member, setMember] = useState<Member>({
        id: 0,
        image: '',
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
    })
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (id) {
            setLoading(true)
            fetch(`http://localhost:3000/testID/${id}`)
                .then((res) => res.json())
                .then((member) => {
                    setMember(member[0])
                    setLoading(false)
                })
        }
    }, [id])
    console.log(id)

    if (isLoading) return <p>Loading...</p>
    if (!member) return <p>No data</p>

    return (
        <div>
            <p>{member.firstname}</p>
            <p>{member.lastname}</p>
        </div>
    )
}

export default test_edit
