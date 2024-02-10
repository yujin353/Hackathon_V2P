import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Modal, Footer } from '../../component';
import { useAccessTknRefresh, useLogout } from "../../hooks";
import $ from "jquery";

const MyPage = () => {
    const navigate = useNavigate();
    const [FImodal, setFImodal] = useState(false);
    const [PImodal, setPImodal] = useState(false);
    const [username, setUsername] = useState("");
    const linkRef = useRef();
    const android = useRef();
    const apple = useRef();
    const web = useRef();
    const [myskinTypeImg, setMyskinTypeImg] = useState("");

    /* 임시 findout currently logged in user 
    useEffect(() => {
        const accessTknRefresh = useAccessTknRefresh;
        $.ajax({
            async: false,
            type: 'GET',
            url: "https://dev.odoc-api.com/member/member_display?member_id=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
            success: function (response) {
                setUsername(response[0].username);
            },
            error: function (response) {
                console.log("error", response);
                alert("다시 로그인 해주세요.");
                const logout = useLogout;
                logout();
            },
        });
    }, []);*/

    /* Add on ClassName to bottom navigation bar current tab */
    useEffect(() => {
        var pathname = $(window.location).attr('pathname');
        if (pathname.startsWith("/test")) $("#fmenu1").addClass("on");
        else if (pathname.startsWith("/MyHistory")) $("#fmenu2").addClass("on");
        else if (pathname.startsWith("/main")) $("#fmenu3").addClass("on");
        else if (pathname.startsWith("/search")) $("#fmenu4").addClass("on");
        else if (pathname.startsWith("/mypage")) $("#fmenu5").addClass("on");
    });

    const goAccount = () => {
        navigate("account");
    };

    const copyLink = (ref) => {
        if (ref.current) {
            ref.current.focus();
            ref.current.select();
            navigator.clipboard.writeText(ref.current.value)
                .then(() => alert("링크가 복사되었습니다."))
                .catch(() => {
                    const textArea = document.createElement('textarea');
                    document.body.appendChild(textArea);
                    textArea.value = ref.current.value;
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    alert('URL 복사가 완료되었습니다.');
                });
        }
        else {
            linkRef.current.focus();
            linkRef.current.select();
            navigator.clipboard.writeText(linkRef.current.value)
                .then(() => alert("링크가 복사되었습니다."))
                .catch(() => {
                    const textArea = document.createElement('textarea');
                    document.body.appendChild(textArea);
                    textArea.value = linkRef.current.value;
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    alert('URL 복사가 완료되었습니다.');
                });
        }
    };

    const goLogout = () => {
        const logout = useLogout;
        logout();
    };

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">마이페이지</h2>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" onClick={()=>navigate("notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>

            <div id="container" className="container sub mypage">
                <div className="line-bot"></div>
                <div className="my_link">
                    <ul>
                        <li><Link to="notice"><span className="i-aft i_arr_r1">공지사항</span></Link></li>
                        <li><Link to="faq"><span className="i-aft i_arr_r1">자주묻는질문</span></Link></li>
                        <li><Link to="support"><span className="i-aft i_arr_r1">고객지원</span></Link></li>
                        <li><Link to="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setPImodal(!PImodal);
                            }}>
                            <span className="i-aft i_arr_r1">제휴문의</span>
                        </Link>
                            <Modal open={PImodal} className="customOverlay">
                                <div id="popPartner" className="layerPopup pop_sns">
                                    <div className="popup">
                                        <div className="p_head botm">
                                            <h2 className="hidden">제휴문의</h2>
                                            <button type="button" className="b-close btn_close"
                                                onClick={() => setPImodal(!PImodal)}>
                                                <span>닫기</span>
                                            </button>
                                        </div>

                                        <div className="p_cont">
                                            <p className="h_tit1">제휴문의</p>
                                            <center><input type="text" id="copy_text_input2" ref={linkRef} defaultValue="mobisUrbur@naver.com" className="form-control" style={{ width: "100%" }} /></center>
                                            <br />
                                            <center><button id="copy_btn2" onClick={copyLink}>
                                                <span className="i-aft i_url">URL 복사</span>
                                            </button></center>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </li>
                        <li><Link to="termofservice"><span className="i-aft i_arr_r1">이용약관</span></Link></li>
                        <li><Link to="account"><span className="i-aft i_arr_r1">계정관리</span></Link></li>
                        <li><Link to="#" onClick={goLogout} ><span className="i-aft i_arr_r1">로그아웃</span></Link></li>
                    </ul>
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default MyPage;
