import React from 'react';
import { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import useMedia from '../hooks/useMedia';

export default function Timer({ expiryTimestamp, setIsPlaying }) {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => { pauseSound(); setIsPlaying(false) } });

    const { playSound, pauseSound, prevSound, nextSound, setVolume } = useMedia()

    const [timerHour, setTimerHour] = useState(null)
    const [timerMinute, setTimerMinute] = useState(null)

    const display = (hour) => {
        if (hour <= 9) {
            return '0' + String(hour)
        }
        return String(hour)
    }

    const handleHourChange = (e) => {
        // if (typeof e.target.value == 'number') {
            setTimerHour(e.target.value)
        // }
    }

    const handleMinuteChange = (e) => {
        // if (typeof e.target.value == 'number') {
            if (e.target.value >= 0 && e.target.value < 60) {
                setTimerMinute(e.target.value)
            }
        // }
    }

    return (
        <>
            <div className="fixed top-6 left-6 w-auto h-auto flex flex-col items-center bg-white bg-opacity-50 rounded-xl px-4 py-6 shadow-2xl">
                <h1 className="text-2xl uppercase text-black mb-4">Set Timer</h1>
                <input type="number" placeholder="Hour" value={timerHour} onChange={(e) => handleHourChange(e)} className="bg-white rounded-lg text-center mb-4 py-2 text-black" />
                <input type="number" placeholder="Minute" value={timerMinute} onChange={(e) => handleMinuteChange(e)} className="bg-white rounded-lg text-center mb-4 py-2 text-black" />
                <button className="bg-white rounded-lg px-4 py-2 text-black shadow-2xl hover:bg-black hover:text-white duration-100" onClick={() => {
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + timerHour * 3600 + timerMinute * 60);
                    restart(time)
                }}>Start</button>
            </div>
            <div className="fixed top-6 right-6 flex flex-col w-96 h-auto items-center bg-white bg-opacity-50 rounded-xl px-4 py-6 shadow-2xl text-black">
                <p className="uppercase mb-2">Remaining Time</p>
                <div className="text-6xl my-2">
                    <span>{display(hours)}</span>:<span>{display(minutes)}</span>:<span>{display(seconds)}</span>
                </div>
                {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
                <button className="bg-white rounded-lg my-2 py-2 text-black shadow-2xl w-1/3 hover:bg-black hover:text-white duration-100" onClick={pause}>Pause</button>
                <button className="bg-white rounded-lg my-2 py-2 text-black shadow-2xl w-1/3 hover:bg-black hover:text-white duration-100" onClick={resume}>Resume</button>
                <button className="bg-white rounded-lg my-2 py-2 text-black shadow-2xl w-1/3 hover:bg-black hover:text-white duration-100" onClick={() => {
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + timerHour * 3600 + timerMinute * 60);
                    restart(time)
                }}>Restart</button>
            </div>
        </>
    );
}