import React, { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../../../component";

const Support = () => {
    const navigate = useNavigate();
    const [EModal, setEModal] = useState(false)
    const linkRef = useRef();

    const copyLink = () => {
        linkRef.current.focus();
        linkRef.current.select();
        navigator.clipboard.writeText(linkRef.current.value)
            .then(() => alert("링크가 복사되었습니다."))
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">고객지원</h2>
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
            <div id="container" className="container sub mypage">
                <div className="my_link">
                    <ul>
                        <li>
                            <Link to="#" onClick={(e) => {
                                e.preventDefault();
                                setEModal(!EModal);
                            }}>
                                <span className="i-aft i_arr_r1">이메일 문의</span>
                            </Link>
                            <Modal open={EModal} className="customOverlay">
                                <div id="popPartner" className="layerPopup pop_sns">
                                    <div className="popup">
                                        <div className="p_head botm">
                                            <h2 className="hidden">제휴문의</h2>
                                            <button type="button" className="b-close btn_close"
                                                onClick={() => setEModal(!EModal)}>
                                                <span>닫기</span>
                                            </button>
                                        </div>

                                        <div className="p_cont">
                                            <p className="h_tit1">이메일 문의</p>
                                            <center><input type="text" id="copy_text_input2" defaultValue="ask@odoc.co.kr" className="form-control" ref={linkRef}/></center>
                                            <br/>
                                            <center><button id="copy_btn2" onClick={copyLink}><span className="i-aft i_url">URL 복사</span></button></center>
                                        </div>
                                    </div>
                                </div> 
                            </Modal>
                        </li>
                    </ul>
                </div>
                <div className="inr-c pd-ty2">
                    <p className="fz-s1"><span>전화문의 : 070-4143-0617</span><br />평일 10:00 ~ 18:00 (주말, 공휴일 제외)</p>
                </div>
            </div>
        </div>
    )
}

export default Support;