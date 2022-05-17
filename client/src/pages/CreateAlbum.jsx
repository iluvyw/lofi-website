import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateAlbum() {
    const [name, setName] = useState("")
    const [songList, setSongList] = useState("")
    const [backgroundList, setBackgroundList] = useState([])
    const navigate = useNavigate()
    const defaultSongs = [
        'https://od.lk/s/NzJfNDI4NTk5NzFf/camellia.mp3',
        'https://od.lk/s/NzJfNDI4NTk5NDRf/a%20night%20like%20tonight.mp3',
        'https://od.lk/s/NzJfNDI4NTk5NjJf/burn%20the%20memory.mp3',
        'https://od.lk/s/NzJfNDI4NTk5NTRf/angel.mp3',
        'https://od.lk/s/NzJfNDI4NTk5NTVf/blue.mp3',
        'https://od.lk/s/NzJfNDI4NTk5Njdf/bye%20bye%20my%20blue.mp3',
        'https://od.lk/s/NzJfNDI4NTk5NDVf/cold%20hands.mp3',
        'https://od.lk/s/NzJfNDI4NTk5NDNf/for%20you.mp3',
    ]
    const defaultBackgrounds = [
        'https://wallpaperaccess.com/full/1959300.jpg',
        'https://www.ixpap.com/images/2021/11/4K-Chillwave-Wallpaper.jpg',
        'https://cdn.wallpapersafari.com/54/80/MTn6lP.jpg',
        'https://wallpaperaccess.com/full/8064369.jpg',
        'https://wallpapercave.com/wp/wp9322386.jpg',
        'https://wallpaperaccess.com/full/1077119.jpg'
    ]

    const createAlbum = async () => {
        const url = "http://localhost:8000/user/create_album"
        const config = {
            headers: {
                Authorization: localStorage.getItem('token'),
                "content-type": "application/json"
            }
        }
        const data = {
            name: name,
            songs: songList,
            // songs: [
            //     'https://od.lk/s/NzJfNDI4NTk5NzFf/camellia.mp3',
            //     'https://od.lk/s/NzJfNDI4NTk5NDRf/a%20night%20like%20tonight.mp3',
            //     'https://od.lk/s/NzJfNDI4NTk5NjJf/burn%20the%20memory.mp3',
            //     'https://od.lk/s/NzJfNDI4NTk5NTRf/angel.mp3',
            //     'https://od.lk/s/NzJfNDI4NTk5NTVf/blue.mp3',
            //     'https://od.lk/s/NzJfNDI4NTk5Njdf/bye%20bye%20my%20blue.mp3',
            //     'https://od.lk/s/NzJfNDI4NTk5NDVf/cold%20hands.mp3',
            //     'https://od.lk/s/NzJfNDI4NTk5NDNf/for%20you.mp3',
            // ],
            backgrounds: backgroundList
        }
        console.log(data)
        const response = await axios.post(url, JSON.stringify(data), config)
        response.data && navigate('/choose-album')
    }

    const addSong = (song) => {
        setSongList([...songList, song])
    }

    const removeSong = (song) => {
        setSongList(songList.filter(item => item !== song))
    }

    const addBackground = (background) => {
        setBackgroundList([...backgroundList, background])
    }

    const removeBackground = (background) => {
        setSongList(backgroundList.filter(item => item !== background))
    }

    const handleChangeSong = (e, song) => {
        if (e.target.checked === false) {
            removeSong(song)
        }
        else {
            addSong(song)
        }
    }

    const handleChangeBackground = (e, background) => {
        if (e.target.checked === false) {
            removeBackground(background)
        }
        else {
            addBackground(background)
        }
    }

    const handleNameInput = (e) => {
        setName(e.target.value)
        console.log(name)
    }

    return (
        <div className="flex flex-col items-center justify-evenly h-full w-full">
            <h1 className="text-black text-5xl">New Album</h1>
            <input onChange={(e) => handleNameInput(e)} value={name} placeholder="Album name" className="text-black rounded-full py-2 px-4 outline-none" />
            <div className="flex flex-row w-full justify-between px-72 h-[70vh]">
                <div className="w-1/2 h-full flex flex-col items-center justify-evenly">
                    {defaultSongs && defaultSongs.map((item, index) =>
                        <div key={index} className="text-black w-1/2 my-4 flex flex-row justify-between items-center bg-white bg-opacity-50 h-1/6 shadow-2xl rounded-full px-10">
                            <h1>Song {index + 1}</h1>
                            <input type="checkbox" onChange={(e) => handleChangeSong(e, item)} />
                        </div>
                    )}
                </div>
                <div className="relative w-1/2 h-full grid grid-cols-2 -translate-y-4 grid-rows-3 gap-4">
                    {defaultBackgrounds && defaultBackgrounds.map((item, index) =>
                        <div key={index} className="relative text-black w-full my-4 flex flex-row justify-between items-center bg-white bg-opacity-50 h-full shadow-2xl rounded-2xl overflow-hidden">
                            {/* <h1>Image {index + 1}</h1> */}
                            <img src={item} alt="background" className="relative z-0 w-auto h-full object-cover opacity-90" />
                            <input type="checkbox" className="absolute z-50 top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2" onChange={(e) => handleChangeBackground(e, item)} />
                        </div>
                    )}
                </div>
            </div>
            <button className="bg-white bg-opacity-50 text-black uppercase px-10 py-4 rounded-full shadow-2xl" onClick={() => createAlbum()}>Create</button>
        </div>
    )
}
