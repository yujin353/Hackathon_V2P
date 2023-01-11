import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Modal } from "../../../../../component";
import $ from "jquery"

const View = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [content, setContent] = useState({})
    const [modal1, setModal1] = useState(false)
    const eventID = searchParams.get("event_id")
    const btnRef1 = useRef(null)
    
    useEffect(() => {
        if(!!eventID === false)
            navigate("/mypage/event")
    }, [])

    useEffect(() => {
        $.ajax({
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/events/",
            success: (response) => {
                const results = response.results
                results.map((v) => {
                    if(v.event_id.toString() === eventID)
                        setContent(v)
                })
            },
            error: (response) => console.log(response)
        })
    }, [])

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert("링크가 복사되었습니다."))
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c" id="event_title">
                    <h2 className="tit ty2">{content.event_title}</h2>
                    <div className="lft">
                        <button className="btn-back c-white" onClick={()=>navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>

                    <div className="rgh">
                        <button type="button" className="btn_url">
                            <span className="i-set i_url" onClick={() => setModal1(!modal1)}></span>
                            <Modal open={modal1} className="customOverlay">
                                <div id="popSns" className="layerPopup pop_sns">
                                    <div className="popup">
                                        <div className="p_head botm">
                                            <h2 className="hidden">공유하기</h2>
                                            <button type="button" className="b-close btn_close">
                                                <span onClick={() => setModal1(!modal1)}>닫기</span>
                                            </button>
                                        </div>

                                        <div className="p_cont">
                                            <p className="h_tit1">공유하기</p>
                                            <ul>
                                                <li><span className="i-aft i_kakao">카카오톡</span></li>
                                                <li><span className="i-aft i_facebook">페이스북</span></li>
                                                <li><span className="i-aft i_url" onClick={()=>copyLink()}>URL 복사</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </button>
                        <button type="button" className="btn_bat" onClick={null} ref={btnRef1}>
                            <span className="i-set i_bat" onClick={()=>{$(btnRef1.current).toggleClass("on off")}}></span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub event">
                <div className="inr-c" id="event_content">
                    <div className="box_event">
                        <img src={content.event_image_path}></img>
                        <p className="t1" style={{ color: "#972c1d" }}>이벤트 게시일: {content.event_posting_date}</p>
                        <p className="t2"><strong>이벤트 제목: {content.event_title}</strong></p>
                        <p className="t1">이벤트 내용: {content.event_content}</p>
                    </div>
                    <h2 className="h_tit1">더 둘러보기</h2>
                    <div className="area_ad">
                        <div className="col">
                            <div className="img"><img src={require("../../../../../assets/images/common/img_ad2.jpg")}></img></div>
                            <div className="txt">
                                <p className="t1" style={{ color: "#0d47ca" }}>나한테 딱 맞는 제품 찾기</p>
                                <p className="t2"><strong></strong>2022 여름<br />수분관리 트렌드!</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="img"><img src={require("../../../../../assets/images/common/img_ad1.jpg")}></img></div>
                            <div className="txt">
                                <p className="t1" style={{ color: "#972c1d" }}>키인 베스트 제품</p>
                                <p className="t2">지금 핫한 제품! <br /><strong>나한테도 잘 맞을까?</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
        </div>
    )
}

export default View;