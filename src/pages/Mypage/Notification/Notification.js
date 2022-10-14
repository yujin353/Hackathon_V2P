import React from "react"
import { useNavigate } from "react-router-dom";

const Notification = () => {
    const navigate = useNavigate();

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">새소식</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={()=>navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        <button type="button" className="txt_link">
                            <span>모두 지우기</span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="inr-c pd-ty1">
                    <div className="area_alram">
                        <div className="col">
                            <button type="button" className="btn_close"><span>삭제</span></button>
                            <p className="h1">이벤트에 당첨되었어요.</p>
                            <p className="t1">SOS 샘플 증정 이벤트 신청만 하면 100% 증정</p>
                        </div>
                        <div className="col">
                            <button type="button" className="btn_close"><span>삭제</span></button>
                            <p className="h1">새로운 친구가 생겼어요.</p>
                            <div className="b_img">
                                <div className="img">
                                    <span>
                                        <img src={require("../../../assets/images/tmp_mem.jpg")}/>
                                    </span>
                                </div>
                                <p className="t1">발빠른너구리</p>
                            </div>
                        </div>
                        <div className="col">
                            <button type="button" className="btn_close"><span>삭제</span></button>
                            <p className="h1">새로운 친구가 생겼어요.</p>
                            <div className="b_img">
                                <div className="img">
                                    <span>
                                        <img src={require("../../../assets/images/common/img_nomem.jpg")} />
                                    </span>
                                </div>
                                <p className="t1">우럭아왜우럭</p>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    )
}

export default Notification;