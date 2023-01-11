import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery"

const Notice = () => {
    const navigate = useNavigate();
    const [noticeList, setNoticeList] = useState([])

    /* loading notice list */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/notices/",
            success: (response) => setNoticeList(response.results),
            error: (response) => console.log(response),
        });
    }, [])

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">공지사항</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={()=>navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" 
                            onClick={() => navigate("/mypage/notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="inr-c">
                    <div className="lst_notice">
                        <ul className="notice_ls">
                            {
                                noticeList.map((v, i) => {
                                    return (
                                        <li key={v.notice_id}><Link to={`view?notice_id=${v.notice_id}&idx=${i+1}`}>
                                            <p className="h1">[공지 {i+1}] {v.notice_title}</p>
                                            <p className="t1">{(v.notice_date).substring(0, 10)}</p>
                                        </Link></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notice;