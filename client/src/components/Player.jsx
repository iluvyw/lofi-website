import React from 'react'
import { useState } from 'react'
import useMedia, { MediaProvider } from '../context/MediaContext'

import Next from '../assets/icon/next.png'
import Prev from '../assets/icon/prev.png'
import Play from '../assets/icon/play.png'
import Pause from '../assets/icon/pause.png'

export default function Player() {
    const [isPlaying, setIsPlaying] = useState(false)

    const a = useMedia()

    return (
        <MediaProvider>
            <div>
                {/* <button onClick={() => prevSound()}><img src={Prev} alt="prev"/></button>
                {
                    isPlaying === true ? 
                    <button 
                        onClick={() => {
                            pauseSound()
                        }}
                    >
                        <img src={Pause} alt="pause"/>
                    </button> :
                    <button 
                        onClick={() => {
                            playSound()
                        }}
                    >
                        <img src={Play} alt="play"/>
                    </button>
                }
                <button onClick={() => nextSound()}><img src={Next} alt="next"/></button> */}
            </div>
        </MediaProvider>
    )
}
