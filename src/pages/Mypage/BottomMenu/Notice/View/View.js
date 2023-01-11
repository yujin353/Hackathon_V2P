import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import $ from "jquery";

const View = () => {
    const navigate = useNavigate()
    const [searchParams, ] = useSearchParams();
    const [content, setContent] = useState("")
    const notice_id = searchParams.get("notice_id")
    const idx = searchParams.get("idx")

    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/notices/" + notice_id + "/",
            success: (response) => setContent(response),
            error: (response) => console.log(response)
        });
    }, [])
    if(content==="")return<></>
    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">공지사항</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={() => navigate(-1)}>
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
                <div className="tit">
                    <p className="h1">[공지 {idx}] {content.notice_title}</p>
                    <p className="t1">{(content.notice_date).substring(0, 10)}</p>
                </div>
                <div className="img"><img src={require("../../../../../assets/images/tmp_notice.jpg")} /></div>
                <div className="cont">
                    <span>{content.notice_content.split("\n").map((v) => <p key={v}>{v}<br /></p>)}</span>
                </div>
            </div>
        </div>
    )
}

export default View;