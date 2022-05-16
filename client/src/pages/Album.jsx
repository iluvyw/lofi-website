import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function Album() {
    const [albums, setAlbums] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
        const fetchAlbums = async () => {
            //fetch all user's albums
            const url = "http://localhost:8000/user/"
            const config = {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
            const response = await axios.get(url, config)
            setAlbums(response.data.data.albums)
            setName(response.data.data.fullname)
        } 
        fetchAlbums()
    }, [])

    const createAlbum =  async (name) => {
        const url = "http://localhost:8000/user/create_album"
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
        const data = {
            name: name,
            songs: [],
            backgrounds: []
        }
        const response = await axios.post(url,JSON.stringify(data),config)
        console.log(response)
    }

    return (
        <div className="w-screen h-auto flex flex-col items-center py-10">
            <h1 className="text-black text-5xl mb-6">Hi {name}</h1>
            <h2 className="text-black text-base">Please choose your album</h2>
            {albums && albums.map((item, index) =>
                <div key={index} className="bg-white px-10 rounded-full w-1/3 h-28 shadow-2xl flex flex-row justify-evenly items-center bg-opacity-50 my-6 text-black text-xl">
                    <h1>{item}</h1>
                </div>
            )}
            <button 
                className="bg-white px-10 rounded-full w-1/3 h-28 shadow-2xl flex flex-row justify-evenly items-center bg-opacity-50 my-6 text-black text-xl"
                onClick={() => createAlbum("Tuong Ngu")}
            >
                New Album
            </button>
        </div>
    )
}
