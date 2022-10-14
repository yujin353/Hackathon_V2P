import React, {  useState, useEffect } from "react";

const Timer = ({minute, second, setTimer }) => {
    const [minutes, setMinutes] = useState(minute);
    const [seconds, setSeconds] = useState(second);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown);
                    setTimer(false)
                    alert("인증번호 유효기간이 만료되었습니다.")
                } else {
                    setMinutes(parseInt(minutes) - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [minutes, seconds]);

    return (
        <div>
            <label htmlFor="time">인증번호 유효기간</label>
            {minutes}분 {seconds < 10 ? `0${seconds}` : seconds}초
        </div>
    )
}

export default Timer;