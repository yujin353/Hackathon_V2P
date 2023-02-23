import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import $ from "jquery"

const View = () => {
    const navigate = useNavigate()
    const [searchParams,] = useSearchParams();
    const [content, setContent] = useState("")
    const faq_id = searchParams.get("faq_id")
    const idx = searchParams.get("idx")

    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/faq/faq?faq_id=" + faq_id,
            success: (response) => setContent(response),
            error: (response) => console.log(response)
        });
    }, [])

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">자주 묻는 질문</h2>
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
                <div className="bbs_view">
                    <div className="tit">
                        <p className="h1">[FAQ {idx}] {content.faq_title}</p>
                    </div>
                    <div className="img"><img src={require("../../../../../assets/images/tmp_notice.jpg")} /></div>
                    <div className="cont">
                        <p>{content.faq_content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View;