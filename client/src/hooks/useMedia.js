import React, { useContext, useState, useEffect, createContext } from 'react'
import { Howl, Howler } from 'howler'

export const MediaContext = createContext(null)

export const MediaProvider = ({ children }) => {
    const [soundList, setSoundList] = useState([])
    const [currentSound, setCurrentSound] = useState(0)
    let sound

    useEffect(() => {
        setSoundList([
            'https://od.lk/s/NzJfNDI4NTk5NzFf/camellia.mp3',
            'https://od.lk/s/NzJfNDI4NTk5NDRf/a%20night%20like%20tonight.mp3',
            'https://od.lk/s/NzJfNDI4NTk5NjJf/burn%20the%20memory.mp3',
            'https://od.lk/s/NzJfNDI4NTk5NTRf/angel.mp3',
            'https://od.lk/s/NzJfNDI4NTk5NTVf/blue.mp3',
            'https://od.lk/s/NzJfNDI4NTk5Njdf/bye%20bye%20my%20blue.mp3',
            'https://od.lk/s/NzJfNDI4NTk5NDVf/cold%20hands.mp3',
            'https://od.lk/s/NzJfNDI4NTk5NDNf/for%20you.mp3',
        ])
    }, [])

    useEffect(() => {
        console.log('New sound', currentSound)
        console.log(soundList) 
        if (soundList && soundList.length > 0) {
            sound = new Howl({
                src: [soundList[currentSound]],
                html5: true,
                volume: 1,
                onend: () => {
                    nextSound()
                }
            })
        }
        sound && sound.play()
        // return () => {
        //     soundList[currentSound].stop()
        // }
    }, [currentSound])

    const nextSound = () => {
        // setIsPlaying(true)
        console.log(soundList, currentSound)
        // soundList.length > 0 && soundList[currentSound].stop()
        sound && sound.stop()
        if (currentSound < (soundList.length - 1)) {
            setCurrentSound(currentSound + 1)
        }
        else {
            setCurrentSound(0)
        }
    }

    const prevSound = () => {
        // setIsPlaying(true)
        // soundList[currentSound].stop()
        sound && sound.stop()
        if (currentSound > 0) {
            setCurrentSound(currentSound - 1)
        }
        else {
            setCurrentSound(soundList.length - 1)
        }
    }

    const playSound = () => {
        // soundList[currentSound].play()
        // setIsPlaying(true)
        if (!sound) {
            sound = new Howl({
                src: [soundList[currentSound]],
                html5: true,
                volume: 1,
                onend: () => {
                    nextSound()
                }
            })
        }
        sound && sound.play()
    }

    const pauseSound = () => {
        console.log('pauseee')
        sound && sound.pause()
        // soundList[currentSound].pause()
        // setIsPlaying(false)
    }

    const setVolume = (value) => {
        Howler.volume(value)
    }

    const values =
    {
        playSound,
        pauseSound,
        nextSound,
        prevSound,
        setVolume
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