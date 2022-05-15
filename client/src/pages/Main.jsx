import React from 'react'
import Player from '../components/Player'
import { MediaProvider } from '../hooks/useMedia'

export default function Main() {
    return (
        <div className="w-full h-screen flex flex-row justify-center items-center">
            <MediaProvider>
                <Player />
            </MediaProvider>
        </div>
    )
}
