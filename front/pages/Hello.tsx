import React, { useState, useEffect } from 'react'

export default function Hello() {
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        fetch('http://localhost:8080/api/hello')
            .then(res => res.text())
            .then(text => setMessage(text))
            .catch(err => console.error(err))
    }, [])

    return (
        <div className='text-black text-6xl'>
            {message}
        </div>
    )
}
