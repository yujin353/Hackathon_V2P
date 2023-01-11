import React from "react"
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery"

const Account = () => {
    const navigate = useNavigate();

    const logout = () => {
        $.ajax({
            async: true, type: 'POST',
            url: "https://api.odoc-api.com/rest_auth/logout/",
            data: { "refresh": sessionStorage.getItem("refresh_token") },
            dataType: 'JSON',
            success: function (response) {
                console.log(response);
                sessionStorage.removeItem("access_token");
                sessionStorage.removeItem("refresh_token");
                sessionStorage.removeItem("user_pk");
                navigate("/login")
            },
            error: (response) => console.log(response),
        });
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">계정관리</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        <button type="button" className="btn_alram on"
                            onClick={() => navigate("../notification")}>
                            <span className="i-set i_alram"></span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="inr-c">
                    <div className="lst_push">
                        <ul>
                            <li>
                                <p>푸시 알림 받기</p>
                                <button type="button" className="btn_push on" id="push" 
                                    onClick={()=>{
                                        const element = document.getElementById("push")
                                        $(element).toggleClass("off on")
                                    }}>
                                    <span>알림</span>
                                </button>
                            </li>
                            <li><Link to="#" onClick={logout}>로그아웃</Link></li>
                            <li><Link to="#" onClick={()=>alert('준비중입니다.')}>회원탈퇴</Link></li>
                            <li><Link to="changepw">비밀번호 변경</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;