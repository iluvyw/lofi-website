import React from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function CreateAlbum() {
    const [name,setName] = useState("")
    const [songList, setSongList] = useState("")
    const [backgroundList, setBackgroundList] = useState([])
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
        const response = await axios.post(url,JSON.stringify(data),config)
        console.log(response)
        // response.data.data && setAlbums([...albums,response.data.data])
    }

    const addSong = (song) => {
        setSongList([...songList, song])
    }

    const removeSong = (song) => {
        setSongList(songList.filter(item => item !== song))
    }

    const handleChange = (e,song) => {
        if (e.target.checked === false) {
            removeSong(song)
        }
        else {
            addSong(song)
        }
    }

    const handleNameInput = (e) => {
        setName(e.target.value)
        console.log(name)
    }

    return (
        <div>
            <input onChange={(e) => handleNameInput(e)} value={name} placeholder="Album name" className="text-black" />
            {defaultSongs && defaultSongs.map((item, index) => 
                <div key={index} className="text-black my-4 flex flex-row">
                    <h1>Song {index+1}</h1>
                    <input type="checkbox" onChange={(e)=>handleChange(e,item)} />
                </div>  
            )}
            <button onClick={() => createAlbum()}>Create</button>
        </div>
    )
}
