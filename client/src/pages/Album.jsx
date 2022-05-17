import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import PlusIcon from '../assets/icon/plus.png'

export default function Album() {
    const [albums, setAlbums] = useState([])
    const [name, setName] = useState("")
    const navigate = useNavigate()

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
            // console.log(response.data.data.albums)
            setName(response.data.data.user.fullname)
            setAlbums(response.data.data.albumList)
            // console.log(response)
            console.log(response.data.data.albumList)
        } 
        fetchAlbums()
    }, [])

    // const createAlbum = async (name) => {
    //     const url = "http://localhost:8000/user/create_album"
    //     const config = {
    //         headers: {
    //             Authorization: localStorage.getItem('token'),
    //             "content-type": "application/json"
    //         }
    //     }
    //     const data = {
    //         name: name,
    //         songs: [
    //             'https://od.lk/s/NzJfNDI4NTk5NzFf/camellia.mp3',
    //             'https://od.lk/s/NzJfNDI4NTk5NDRf/a%20night%20like%20tonight.mp3',
    //             'https://od.lk/s/NzJfNDI4NTk5NjJf/burn%20the%20memory.mp3',
    //             'https://od.lk/s/NzJfNDI4NTk5NTRf/angel.mp3',
    //             'https://od.lk/s/NzJfNDI4NTk5NTVf/blue.mp3',
    //             'https://od.lk/s/NzJfNDI4NTk5Njdf/bye%20bye%20my%20blue.mp3',
    //             'https://od.lk/s/NzJfNDI4NTk5NDVf/cold%20hands.mp3',
    //             'https://od.lk/s/NzJfNDI4NTk5NDNf/for%20you.mp3',
    //         ],
    //         backgrounds: []
    //     }
    //     const response = await axios.post(url,JSON.stringify(data),config)
    //     // console.log(response)
    //     response.data.data && setAlbums([...albums,response.data.data])
    // }

    const removeAlbum = async (id) => {
        const url = "http://localhost:8000/user/remove_album"
        const config = {
            headers: {
                Authorization: localStorage.getItem('token'),
                "content-type": "application/json"
            }
        }
        const data = {
            id: id
        }
        const response = await axios.post(url,JSON.stringify(data),config)
        console.log(response)
        response.data.data && setAlbums(albums.filter(album => album._id !== id))
    }

    return (
        <div className="w-screen h-auto flex flex-col items-center py-10">
            <h1 className="text-black text-5xl mb-6">Hi {name}!</h1>
            <h2 className="text-black text-base">Please choose your album</h2>
            {albums && albums.map((item, index) =>
                <div key={index} className="bg-white px-20 rounded-full w-1/3 h-28 shadow-2xl flex flex-row justify-between items-center bg-opacity-50 my-6 text-black text-xl">
                    <h1 className="cursor-pointer" onClick={() => {navigate(`/album/${item._id}`)}}>{item.name}</h1>
                    <h2 className="text-red-500 cursor-pointer" onClick={() => removeAlbum(item._id)}>Remove</h2>
                </div>
            )}
            <button 
                className="bg-white p-4 rounded-full w-20 h-20 shadow-2xl flex flex-row justify-evenly items-center bg-opacity-50 my-6 text-black text-xl"
                onClick={() => navigate('/create-album')}
            >
                <img src={PlusIcon} alt="plus" className="w-full h-full object-containe" />
            </button>
        </div>
    )
}
