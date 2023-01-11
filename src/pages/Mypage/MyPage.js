import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Modal } from '../../component';
import $ from "jquery"

const MyPage = () => {
    const navigate = useNavigate();
    const [FImodal, setFImodal] = useState(false)
    const [PImodal, setPImodal] = useState(false)
    const [username, setUsername] = useState("")
    const linkRef = useRef();

    /* findout currently logged in user */
    useEffect(() => {
        const user_pk = sessionStorage.getItem("user_pk");
        $.ajax({
            async: false,
            type: 'GET',
            url: `https://api.odoc-api.com/api/v1/members/${user_pk}/`,
            success: function (response) {
                setUsername(response.username)
            },
            error: function (response) {
                console.log("error", response);
                alert("login failed.")
                window.location.replace("/")
            },
        });
    }, [])

    /* Add on ClassName to bottom navigation bar current tab */
    useEffect(() => {
        var pathname = $(window.location).attr('pathname');
        if (pathname.startsWith("/test")) $("#fmenu1").addClass("on");
        else if (pathname.startsWith("/mykiin")) $("#fmenu2").addClass("on");
        else if (pathname.startsWith("/main")) $("#fmenu3").addClass("on");
        else if (pathname.startsWith("/search")) $("#fmenu4").addClass("on");
        else if (pathname.startsWith("/mypage")) $("#fmenu5").addClass("on")
    })

    const copyLink = () => {
        linkRef.current.focus();
        linkRef.current.select();
        navigator.clipboard.writeText(linkRef.current.value)
            .then(()=>alert("링크가 복사되었습니다."))
    }

    const logout = () => {
        var obj = { "refresh": sessionStorage.getItem("refresh_token") }
        $.ajax({
            async: true,
            type: 'POST',
            url: "https://api.odoc-api.com/rest_auth/logout/",
            data: obj,
            dataType: 'JSON',
            success: function (response) {
                console.log(response);
                sessionStorage.removeItem("access_token");
                sessionStorage.removeItem("refresh_token");
                sessionStorage.removeItem("user_pk");
                window.location.href = '/login'
            },
            error: function (response) {
                console.log(response);
            },
        });
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">마이페이지</h2>
                    <div className="rgh">
                        <button type="button" className="btn_alram on" onClick={()=>navigate("notification")}>
                            <span className="i-set i_alram"></span>
                        </button>
                    </div>
                </div>
            </header>

            <div id="container" className="container sub mypage">
                <div className="my_top">
                    <div className="inr-c">
                        <div className="area_profile">
                            <div className="thumb">
                                <span><img src={require("../../assets/images/common/img_nomem.jpg")}></img></span>
                            </div>
                            <div className="txt">
                                <p className="h1"><strong className="c-blue usernick">{username}</strong>님</p><br/>
                            </div>
                        </div>
                        <div className="box_point" onClick={()=>navigate("point")}>
                            <p><span>POINT</span><strong>5,340 P</strong></p>
                        </div>
                    </div>
                </div>
                <div className="my_menu">
                    <ul>
                        <li><Link to="event"><span className="i-aft i_my_menu1">이벤트</span></Link></li>
                        <li><Link to="#" 
                                onClick={(e)=>{
                                    e.preventDefault();
                                    setFImodal(!FImodal)
                                }}>
                                <span className="i-aft i_my_menu2">친구초대</span>
                            </Link>
                            <Modal open={FImodal} className="customOverlay">
                                <div id="popSns" className="layerPopup pop_sns">
                                    <div className="popup">
                                        <div className="p_head botm">
                                            <h2 className="hidden">친구초대하기</h2>
                                            <button type="button" className="b-close btn_close"
                                                onClick={()=>setFImodal(!FImodal)}>
                                                <span>닫기</span>
                                            </button>
                                        </div>

                                        <div className="p_cont">
                                            <p className="h_tit1">친구초대</p>
                                            <center><input type="text" id="copy_text_input" ref={linkRef} defaultValue="http://kiinodoc.com" className="form-control" /></center>
                                            <br />
                                            <center><button id="copy_btn" onClick={copyLink}>
                                                <span className="i-aft i_url">URL 복사</span>
                                            </button></center>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </li>
                        <li><Link to="point" onClick={() => alert('준비중입니다')} ><span className="i-aft i_my_menu3">포인트</span></Link></li>
                        <li><Link to="myreview"><span className="i-aft i_my_menu4">리뷰관리</span></Link></li>
                        <li><Link to="friend"><span className="i-aft i_my_menu5">키인친구</span></Link></li>
                        <li><Link to="interest"><span className="i-aft i_my_menu6">관심리뷰</span></Link></li>
                    </ul>
                </div>
                <div className="line-bot"></div>
                <div className="my_link">
                    <ul>
                        <li><Link to="notice"><span className="i-aft i_arr_r1">공지사항</span></Link></li>
                        <li><Link to="faq"><span className="i-aft i_arr_r1">자주묻는질문</span></Link></li>
                        <li><Link to="support"><span className="i-aft i_arr_r1">고객지원</span></Link></li>
                        <li><Link to="#" 
                                onClick={(e)=>{
                                    e.preventDefault();
                                    setPImodal(!PImodal)
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
                                            <center><input type="text" id="copy_text_input2" ref={linkRef} defaultValue="ask@odoc.co.kr" className="form-control" /></center>
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
                        <li><Link to="#" onClick={logout} ><span className="i-aft i_arr_r1">로그아웃</span></Link></li>
                    </ul>
                </div>
            </div>

            <footer id="footer" className="footer">
                <ul className="div1">
                    <li className="off" id="fmenu1"><Link to="/test"><span className="i-aft i_fmenu1">평가</span></Link></li>
                    <li className="off" id="fmenu2"><Link to="/mykiin"><span className="i-aft i_fmenu2">MY키인</span></Link></li>
                    <li className="off" id="fmenu3"><Link to="/main"><span className="i-aft i_fmenu3">메인</span></Link></li>
                    <li className="off" id="fmenu4"><Link to="/search"><span className="i-aft i_fmenu4">제품검색</span></Link></li>
                    <li className="off" id="fmenu5"><Link to="/mypage"><span className="i-aft i_fmenu5">마이페이지</span></Link></li>
                </ul>
            </footer>
        </div>
    )
}

export default MyPage;