import React from 'react'
import { useState } from 'react'

export default function Background({background}) {
    const [index,setIndex] = useState(0)

    const nextIndex = () => {
        index === background.length - 1 ? setIndex(0) : setIndex(index+1)
    }

    const prevIndex = () => {
        index === 0 ? setIndex(background.length - 1) : setIndex(index-1)
    }

    return (
        <div className="relative w-full h-full flex flex-row overflow-hidden">
            <h3 onClick={() => prevIndex()} className="absolute font-extralight top-1/2 left-6 z-50 -rotate-90 uppercase cursor-pointer">Prev</h3>
            {background.map((item,i) => <img key={i} src={item} alt="bg" className="relative w-full h-full flex-shrink-0 object-contain duration-500" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }} />)}
            <h3 onClick={() => nextIndex()} className="absolute font-extralight top-1/2 right-6 z-50 rotate-90 uppercase cursor-pointer">Next</h3>
        </div>
    )
}
