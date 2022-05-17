import React from 'react'
import Player from '../components/Player'
import { MediaProvider } from '../hooks/useMedia'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Background from '../components/Background'

export default function Main() {
    const { id } = useParams()
    const [songs, setSongs] = useState([])
    const [backgrounds, setBackgrounds] = useState([])
    const [displayPlayer,setDisplayPlayer] = useState(true)
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
            const response = await axios.post(url, JSON.stringify(data), config)
            response.data.data && setSongs(response.data.data.songs)
            response.data.data && setBackgrounds(response.data.data.backgrounds)
        }
        fetchAlbums()
    }, [id])
    return (
        <div className="relative w-full h-full flex flex-row justify-center items-center overflow-hidden">
            <h1 className="absolute top-2 px-9 py-2 rounded-full left-1/2 -translate-x-1/2 z-50 text-black bg-white bg-opacity-50 shadow-2xl cursor-pointer" onClick={() => setDisplayPlayer(!displayPlayer)}>
                {displayPlayer === true ? "Hide" : "Unhide"}
            </h1>
            <Background background={backgrounds} />
            <div className="duration-500" style={{opacity: displayPlayer === true ? 100 : 0}}>
                <MediaProvider songs={songs}>
                    <Player />
                </MediaProvider>
            </div>
        </div>
    )
}
