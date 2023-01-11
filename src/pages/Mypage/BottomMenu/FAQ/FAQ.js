import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery"

const FAQ = () => {
    const navigate = useNavigate();
    const [questionList, setQuestionList] = useState([])

    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/faqs/",
            success: (response) => setQuestionList(response.results),
            error: (response) => console.log(response),
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
                <div className="inr-c">
                    <div className="lst_notice">
                        <ul className="faq_ls">
                            {
                                questionList.map((v, i)=>{
                                    return (
                                        <li key={v.faq_id}><Link to={`view?faq_id=${v.faq_id}&idx=${i+1}`}>
                                            <p className="h1">[FAQ {i+1}] {v.faq_title}</p>
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

export default FAQ;