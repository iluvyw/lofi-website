import React from 'react'
import { useState } from 'react'
import Next from '../assets/icon/next.png'
import Prev from '../assets/icon/prev.png'
import Play from '../assets/icon/play.png'
import Pause from '../assets/icon/pause.png'
import useMedia from '../hooks/useMedia'
import Timer from './Timer'

export default function Player() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 0);

    const [isPlaying, setIsPlaying] = useState(false)

    const { playSound, pauseSound, prevSound, nextSound, setVolume } = useMedia()

    return (
        <>
            <Timer expiryTimestamp={time} setIsPlaying={setIsPlaying} />
            <div className='fixed bottom-10 left-1/2 -translate-x-1/2 bg-white px-10 rounded-full w-96 h-28 shadow-2xl flex flex-row justify-evenly items-center bg-opacity-50'>
                <button
                    className='bg-white p-2 h-1/3 w-auto rounded-full shadow-xl hover:shadow-lg hover:scale-110'
                    onClick={() => {
                        prevSound()
                        setIsPlaying(true)
                    }}
                >
                    <img src={Prev} alt="prev" className='w-full h-full object-contain' />
                </button>
                {
                    isPlaying === true ?
                        <button
                            className='bg-white p-2 h-1/2 w-auto rounded-full shadow-xl hover:shadow-lg hover:scale-110'
                            onClick={() => {
                                pauseSound()
                                setIsPlaying(false)
                            }}
                        >
                            <img src={Pause} alt="pause" className='w-full h-full object-contain' />
                        </button> :
                        <button
                            className='bg-white p-2 h-1/2 w-auto rounded-full shadow-xl hover:shadow-lg hover:scale-110'
                            onClick={() => {
                                playSound()
                                setIsPlaying(true)
                            }}
                        >
                            <img src={Play} alt="play" className='w-full h-full object-contain' />
                        </button>
                }
                <button
                    className='bg-white p-2 h-1/3 w-auto rounded-full shadow-xl hover:shadow-lg hover:scale-110'
                    onClick={() => {
                        nextSound()
                        setIsPlaying(true)
                    }}
                >
                    <img src={Next} alt="next" className='w-full h-full object-contain' />
                </button>
                <div className="w-1/2 flex flex-row items-center justify-end">
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e) => setVolume(e.target.value)}
                        className="w-3/4"
                    />
                </div>
            </div>
        </>
    )
}
