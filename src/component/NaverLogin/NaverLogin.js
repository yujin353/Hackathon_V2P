import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const NaverLogin = () => {
    const location = useLocation();
    const naverRef = useRef();
    const { naver } = window;
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_Client_ID;
    const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_Callback_URL;


    const [clickLogin, setClickLogin] = useState(false);

    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            isPopup: false,
            loginButton: { color: "green", type: 2, height: 40 }
        });
        naverLogin.init();
        naverLogin.getLoginStatus(async (status) => {
            if (status) {
                console.log("status exist, status:", status);
                console.log("naver.user : ", naverLogin.user);
                const name = naverLogin.user.getName();
                const email = naverLogin.user.getEmail();
                if (name === undefined || email === undefined) {
                    alert("필수 정보제공을 동의해주세요.");
                    naverLogin.reprompt();
                }
                else {
                    if (location.hash) {
                        const token = location.hash.split('=')[1].split('&')[0];
                        console.log('access tkn : ', token);
                        //토큰을 서버로 전송하여 후처리
                    }
                }
            }
            else {
                console.log("////////////////no status");
            }
        });
    };

    const handleNaverLogin = () => {
        setClickLogin(!clickLogin);
    };

    useEffect(() => {
        initializeNaverLogin();
        if (clickLogin) {
            naverRef.current.children[0].href = "http://localhost:3000/login#";
            naverRef.current.children[0].click();
        }
    }, [clickLogin]);

    return (
        <>
            <div id="naverIdLogin" ref={naverRef} />
            <button className="naverLoginBtn" onClick={handleNaverLogin}>
                <div className="naverIcon" />
                <span className="naverLoginTitle">네이버로 시작하기&nbsp;&nbsp;&nbsp;</span>
            </button>
            {/* <div id="naverIdLogin"/> */}
        </>
    );
};

export default NaverLogin;
