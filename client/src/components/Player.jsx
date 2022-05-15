import React from 'react'
import { useState } from 'react'
import Next from '../assets/icon/next.png'
import Prev from '../assets/icon/prev.png'
import Play from '../assets/icon/play.png'
import Pause from '../assets/icon/pause.png'
import useMedia from '../hooks/useMedia'

export default function Player() {
    const [isPlaying, setIsPlaying] = useState(false)

    const { playSound, pauseSound, prevSound, nextSound } = useMedia()

    return (
        <div className='bg-white rounded-lg w-1/4 h-28 shadow-2xl flex flex-row justify-evenly items-center bg-opacity-80'>
            <button 
                className='bg-white p-2 h-1/2 w-auto rounded-full shadow-xl hover:shadow-lg'
                onClick={() => {
                    prevSound()
                    setIsPlaying(true)
                }}
            >
                <img src={Prev} alt="prev" className='w-full h-full object-contain'/>
            </button>
                {
                    isPlaying === true ? 
                    <button 
                        className='bg-white p-2 h-1/2 w-auto rounded-full shadow-xl hover:shadow-lg'
                        onClick={() => {
                            pauseSound()
                            setIsPlaying(false)
                        }}
                    >
                        <img src={Pause} alt="pause" className='w-full h-full object-contain'/>
                    </button> :
                    <button 
                        className='bg-white p-2 h-1/2 w-auto rounded-full shadow-xl hover:shadow-lg'
                        onClick={() => {
                            playSound()
                            setIsPlaying(true)
                        }}
                    >
                        <img src={Play} alt="play" className='w-full h-full object-contain'/>
                    </button>
                }
                <button 
                    className='bg-white p-2 h-1/2 w-auto rounded-full shadow-xl hover:shadow-lg'
                    onClick={() => {
                        nextSound()
                        setIsPlaying(true)
                    }}
                >
                    <img src={Next} alt="next" className='w-full h-full object-contain'/>
                </button>
        </div>
    )
}
