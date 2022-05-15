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

    const [timerHour, setTimerHour] = useState(0)
    const [timerMinute, setTimerMinute] = useState(0)

    const display = (hour) => {
        if (hour <= 9) {
            return '0' + String(hour)
        }
        return String(hour)
    }

    const handleMinuteChange = (e) => {
        if (e.target.value >= 0 && e.target.value < 60) {
            setTimerMinute(e.target.value)
        }
    }

    return (
        <>
            <input placeholder="hour" value={timerHour} onChange={(e) => setTimerHour(e.target.value)} />
            <input placeholder="minute" value={timerMinute} onChange={(e) => handleMinuteChange(e)} />
            <div style={{ textAlign: 'center' }}>
                <p>Timer</p>
                <div style={{ fontSize: '100px' }}>
                    <span>{display(hours)}</span>:<span>{display(minutes)}</span>:<span>{display(seconds)}</span>
                </div>
                <p>{isRunning ? 'Running' : 'Not running'}</p>
                <button onClick={() => {
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + timerHour * 3600 + timerMinute * 60);
                    restart(time)
                }}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={resume}>Resume</button>
                <button onClick={() => {
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + timerHour * 3600 + timerMinute * 60);
                    restart(time)
                }}>Restart</button>
            </div>
        </>
    );
}