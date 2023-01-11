import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery"

const Event = () => {
    const navigate = useNavigate();
    const [eventList, setEventList] = useState([])

    /* Loading event list */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/events/",
            success: response => setEventList(response.results), 
            error: response =>console.log(response)
        });
    }, [])

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">이벤트</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" onClick={() => navigate("../notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="inr-c pd-ty1">
                    <div className="area_ad">

                        {/*
                            현재 table column 변경 불가능 하므로
                            키인 소분 판매 이벤트 하드 코딩 (22.08.30)
                        */}
                        {/* <div>
                            <div className="txt">
                                <p className="t1"><strong>키인 소분 판매 이벤트</strong></p>
                            </div>
                            <div className="col">
                                <Link to={`view?event_id=`}>
                                    <img className="img"
                                        src={require("../../../../assets/images/event/banner_1.png")}></img>
                                </Link>
                            </div>
                        </div> */}

                        {eventList.map((v)=>{
                            return (
                                <div key={v.event_posting_date}>
                                    <div className="txt">
                                        <p className="t1">
                                            <strong>{v.event_title}</strong>
                                        </p>
                                        {/* <p className="t2"></p> */}
                                    </div>
                                    <div className="col">
                                        <Link to={`view?event_id=${v.event_id}`}>
                                            <div className="img"><img src={v.event_image_path}></img></div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Event;