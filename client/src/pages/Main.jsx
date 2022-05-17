import React from 'react'
import Player from '../components/Player'
import { MediaProvider } from '../hooks/useMedia'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Main() {
    const { id } = useParams()
    const [songs,setSongs] = useState([])
    useEffect(() => {
        const fetchAlbums = async () => {
            //fetch all user's albums
            const url = "http://localhost:8000/album/find_album"
            const config = {
                headers: {
                    // Authorization: localStorage.getItem('token'),
                    "content-type": "application/json"
                }
            }
            const data = {
                id: id
            }
            const response = await axios.post(url,JSON.stringify(data),config)
            response.data.data && setSongs(response.data.data.songs)
        } 
        fetchAlbums()
    },[id])
    return (
        <div className="w-full h-screen flex flex-row justify-center items-center">
            {id}
            <MediaProvider songs={songs}>
                <Player />
            </MediaProvider>
        </div>
    )
}
