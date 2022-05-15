import React, {useContext, useState, useEffect, createContext} from 'react'
import { Howl, Howler } from 'howler'

import Audio1 from '../audio/angel.mp3'
import Audio2 from '../audio/blue.mp3'
import Audio3 from '../audio/burn the memory.mp3'
import Audio4 from '../audio/bye bye my blue.mp3'

export const MediaContext = createContext(null)

export const MediaProvider = ({children}) => {
    const sound1 = new Howl({
        src: [Audio1],
        onend: () => {
            console.log('Finished')
            nextSound()
        }
    })

    const sound2 = new Howl({
        src: [Audio2],
        onend: () => {
            nextSound()
        }
    })

    const sound3 = new Howl({
        src: [Audio3],
        onend: () => {
            nextSound()
        }
    })

    const sound4 = new Howl({
        src: [Audio4],
        onend: () => {
            nextSound()
        }
    })


    const soundList = [sound1, sound2, sound3, sound4]
    const [currentSound, setCurrentSound] = useState(0)

    useEffect(() => {
        //get all album sound
    },[])

    useEffect(() => {
        console.log('New sound',currentSound)
        soundList.length > 0 && soundList[currentSound].play()
        // return () => {
        //     soundList[currentSound].stop()
        // }
    },[currentSound])

    const nextSound = () => {
        // setIsPlaying(true)
        soundList[currentSound].stop()
        if (currentSound < (soundList.length - 1)) {
            setCurrentSound(currentSound + 1)
        }
        else {
            setCurrentSound(0)
        }
    }

    const prevSound = () => {
        // setIsPlaying(true)
        if (currentSound > 0) {
            setCurrentSound(currentSound - 1)
        }
        else {
            setCurrentSound(soundList.length - 1)
        }
    }

    const playSound = () => {
        soundList[currentSound].play()
        // setIsPlaying(true)
    }

    const pauseSound = () => {
        console.log('pauseee')
        soundList[currentSound].pause()
        // setIsPlaying(false)
    }

    const values = 
    {
        playSound,
        pauseSound,
        nextSound,
        prevSound,
    }

    return <MediaContext.Provider value={values}>{children}</MediaContext.Provider>
}

export default function useMedia() {
    const context = useContext(MediaContext)

    if (context === undefined) {
        throw new Error('useMedia hook must be used with a Media component')
    }

    return context
}