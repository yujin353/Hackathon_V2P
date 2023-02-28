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

    /* findout currently logged in user */
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
    }, []);

    /* Add on ClassName to bottom navigation bar current tab */
    useEffect(() => {
        var pathname = $(window.location).attr('pathname');
        if (pathname.startsWith("/test")) $("#fmenu1").addClass("on");
        else if (pathname.startsWith("/mykiin")) $("#fmenu2").addClass("on");
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

    /* find skin type */
    useEffect(() => {
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member/my_skin?member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                const results = response[0];
                if (results === undefined) return;
                skinTypeName(results.do_alphabet + results.rs_alphabet + results.np_alphabet + results.tw_alphabet);
            },
            error: (response) => console.log(response)
        });
    }, []);

    /* set same skin type user img */
    const skinTypeName = (myskinType) => {
        switch (myskinType) {
            case 'DSPW':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/DSPW.png");
                break;
            case 'DSPT':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/DSPT.png");
                break;
            case 'DSNW':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/DSNW.png");
                break;
            case 'DSNT':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/DSNT.png");
                break;
            case 'DRPW':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/DRPW.png");
                break;
            case 'DRPT':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/DRPT.png");
                break;
            case 'DRNW':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/DRNW.png");
                break;
            case 'DRNT':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/DRNT.png");
                break;
            case 'OSPW':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/OSPW.png");
                break;
            case 'OSPT':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/OSPT.png");
                break;
            case 'OSNW':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/OSNW.png");
                break;
            case 'OSNT':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/OSNT.png");
                break;
            case 'ORPW':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/ORPW.png");
                break;
            case 'ORPT':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/ORPT.png");
                break;
            case 'ORNW':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/ORNW.png");
                break;
            case 'ORNT':
                setMyskinTypeImg("https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/ORNT.png");
                break;
        }
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
                <div className="my_top">
                    <div className="inr-c">
                        <div className="area_profile">
                            <div className="thumb">
                                <span><img src={myskinTypeImg ? myskinTypeImg : require("../../assets/images/common/img_nomem.jpg")} onClick={goAccount}></img></span>
                            </div>
                            <div className="txt">
                                <p className="h1" onClick={goAccount}><strong className="c-blue usernick">{username}</strong>님</p><br />
                            </div>
                        </div>
                        {/* <div className="box_point" onClick={()=>navigate("point")}>
                            <p><span>POINT</span><strong>5,340 P</strong></p>
                        </div> */}
                    </div>
                </div>
                <div className="my_menu">
                    <ul>
                        <li><Link to="event"><span className="i-aft i_my_menu1">이벤트</span></Link></li>
                        <li><Link to="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setFImodal(!FImodal);
                            }}>
                            <span className="i-aft i_my_menu2">친구초대</span>
                        </Link>
                            <Modal open={FImodal} className="customOverlay">
                                <div id="popSns" className="layerPopup pop_sns">
                                    <div className="popup">
                                        <div className="p_head botm">
                                            <h2 className="hidden">친구초대하기</h2>
                                            <button type="button" className="b-close btn_close"
                                                onClick={() => setFImodal(!FImodal)}>
                                                <span>닫기</span>
                                            </button>
                                        </div>

                                        <div className="p_cont">
                                            <p className="h_tit1">친구초대</p>
                                            <input type="text" id="copy_text_input" ref={android} defaultValue="https://play.google.com/store/apps/details?id=com.kiin_android" className="form-control" style={{ width: "70%", marginTop: '-4vh' }} />
                                            <button id="copy_btn" onClick={() => copyLink(android)} style={{ width: "30%", paddingBottom: '2vh' }}>
                                                <span className="i-aft i_url">Android</span>
                                            </button>
                                            <input type="text" id="copy_text_input" ref={apple} defaultValue="https://apps.apple.com/kr/app/%ED%82%A4%EC%9D%B8-kiin-%ED%99%94%EC%9E%A5%ED%92%88-%ED%8D%BC%EC%8A%A4%EB%84%90-%EC%87%BC%ED%8D%BC/id1670252245" className="form-control" style={{ width: "70%", marginTop: '-4vh' }} />
                                            <button id="copy_btn" onClick={() => copyLink(apple)} style={{ width: "30%", paddingBottom: '2vh' }}>
                                                <span className="i-aft i_url">Apple</span>
                                            </button>
                                            <input type="text" id="copy_text_input" ref={web} defaultValue="https://kiin.odoc-api.com" className="form-control" style={{ width: "70%", marginTop: '-4vh' }} />
                                            <button id="copy_btn" onClick={() => copyLink(web)} style={{ width: "30%", paddingBottom: '2vh' }}>
                                                <span className="i-aft i_url">Web</span>
                                            </button>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </li>
                        {/* <li><Link to="point" onClick={() => alert('준비중입니다')} ><span className="i-aft i_my_menu3">포인트</span></Link></li> */}
                        <li><Link to="mypage/.." onClick={() => alert('준비중입니다')} ><span className="i-aft i_my_menu3">포인트</span></Link></li>
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
                                            <center><input type="text" id="copy_text_input2" ref={linkRef} defaultValue="ask@odoc.co.kr" className="form-control" style={{ width: "100%" }} /></center>
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
