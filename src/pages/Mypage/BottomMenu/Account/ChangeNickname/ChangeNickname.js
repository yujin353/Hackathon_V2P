import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccessTknRefresh, useLogout } from "../../../../../hooks";
import $ from "jquery";

const ChangeNickname = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    /* findout currently logged in user */
    useEffect(() => {
        let isMounted = true;
        const accessTknRefresh = useAccessTknRefresh;
        $.ajax({
            async: false, type: 'GET',
            url: "https://dev.odoc-api.com/member/member_display?member_id=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
            success: (response) => {
                if (isMounted)
                    setUsername(response[0].username);
            },
            error: (response) => {
                console.log("error", response);
                alert("다시 로그인 해주세요.");
                const logout = useLogout;
                logout();
            },
        });
        return () => isMounted = false;
    }, []);

    const onEditBtn = () => {
        document.getElementById('nicknameEditBtnOff').style.display = 'none';
        document.getElementById('nicknameEditBtnOn').style.display = 'block';
        document.getElementById('nicknameEditBtnOn').style.margin = 'auto';
    };

    const offEditBtn = () => {
        document.getElementById('nicknameEditBtnOn').style.display = 'none';
        document.getElementById('nicknameEditBtnOff').style.display = 'block';
        document.getElementById('nicknameEditBtnOff').style.margin = 'auto';
    };

    const changeInfo = () => {
        if (document.getElementById('originalNickname').style.display === 'none') {
            if (document.getElementById('nicknameEditBtnOff').style.display === 'none') {
                submitInfo(document.getElementById('changeNickname').value);
            }
        }
        else {
            document.getElementById('originalNickname').style.display = 'none';
            document.getElementById('changeNickname').style.display = 'block';
        }
    };

    const checkingNickname = () => {
        if (document.getElementById('changeNickname').value !== username) {
            document.getElementById('nicknameError1').style.display = 'none';
            document.getElementById('nicknameError2').style.display = 'none';
            document.getElementById('nicknameError3').style.display = 'none';
            document.getElementById('nicknameError4').style.display = 'none';
            document.getElementById('nicknameError5').style.display = 'none';
            if (document.getElementById('changeNickname').value.length < 3) {
                document.getElementById('nicknameError1').style.display = 'block';
                offEditBtn();
            }
            else if (document.getElementById('changeNickname').value.length > 8) {
                document.getElementById('nicknameError2').style.display = 'block';
                offEditBtn();
            }
            else onEditBtn();
        }
        else offEditBtn();
    };

    const submitInfo = (newName) => {
        const accessTknRefresh = useAccessTknRefresh;
        $.ajax({
            async: false, type: 'PUT',
            url: "https://dev.odoc-api.com/member/username_change/" + sessionStorage.getItem("user_pk"),
            data: { "username": newName },
            dataType: 'JSON',
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
            success: function (response) {
                if (response.message == "SUCCESS") {
                    alert("닉네임을 변경하였습니다.");
                    navigate(0);
                }
                else alert("닉네임 변경에 실패하였습니다.");
            },
            error: (response) => {
                if (response.responseJSON.message === "DUPLICATE") document.getElementById('nicknameError3').style.display = 'block';
                else if (response.responseJSON.message === "NOT SPECIAL CHARACTERS") document.getElementById('nicknameError4').style.display = 'block';
                else if (response.responseJSON.message === "Wrong length") document.getElementById('nicknameError5').style.display = 'block';
                console.log(response);
            },
        });
    };

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">닉네임 변경</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on"
                            onClick={() => navigate("../notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="inr-c">
                    <div className="lst_push">

                        <div style={{ display: 'table', width: '100%', margin: '2vh 0' }}>
                            <img src={require("../../../../../assets/images/common/img_nomem.jpg")} style={{ width: '10vh' }} />
                            <div style={{ display: 'table-cell', paddingLeft: '3vh' }}>
                                <p className="h1" id="originalNickname" style={{ fontSize: '6vw' }}><strong className="c-blue usernick">{username}</strong>님 </p>
                                <input id="changeNickname" placeholder={username} onKeyUp={checkingNickname} />
                                <p id="nicknameError1" className="t_error hidden">닉네임은 3글자 이상으로 가능합니다.</p>
                                <p id="nicknameError2" className="t_error hidden">닉네임은 8글자 이하로만 가능합니다.</p>
                                <p id="nicknameError3" className="t_error hidden">이미 사용중인 닉네임 입니다.</p>
                                <p id="nicknameError4" className="t_error hidden">닉네임은 한글, 영문, 숫자로만 가능합니다.</p>
                                <p id="nicknameError5" className="t_error hidden">닉네임은 3글자 이상, 8글자 이하로 가능합니다.</p>
                            </div>
                            <div style={{ display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', width: '15%' }} onClick={changeInfo}>
                                <img id="nicknameEditBtnOn" src={require("../../../../../assets/images/common/ico_checkbox2_on.png")} style={{ width: '3vh', display: 'none' }} />
                                <img id="nicknameEditBtnOff" src={require("../../../../../assets/images/common/ico_checkbox2_off.png")} style={{ width: '3vh' }} />
                                <p className="h1" style={{ fontSize: '4vw' }}>수정</p>
                            </div>
                        </div>

                        <ul>
                            {/* <li>
                                <p>푸시 알림 받기</p>
                                <button type="button" className="btn_push on" id="push"
                                    onClick={()=>{
                                        const element = document.getElementById("push")
                                        $(element).toggleClass("off on")
                                    }}>
                                    <span>알림</span>
                                </button>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeNickname;
