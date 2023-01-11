import React from "react"
import { Link, useNavigate } from "react-router-dom";

const Ranking = () => {
    const navigate = useNavigate()
    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">카페고리별 상품 랭킹</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        <button type="button" className="btn_alram on" onClick={() => navigate("/mypage/notification")}>
                            <span className="i-set i_alram"></span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub ranking">
                <div className="top_menu">
                    <ul className="inr-c">
                        <li><Link to="#"><span>스킨·토너</span></Link></li>
                        <li><Link to="#"><span>크림</span></Link></li>
                        <li><Link to="#"><span>오일</span></Link></li>
                        <li><Link to="#"><span>세럼·에센스</span></Link></li>
                    </ul>
                </div>
                <div className="inr-c">
                    <div className="lst_prd2 ranking">
                        <ul className="ranking_ls">
                            <li><Link to="#">
                                <div className="num"><span className="i-set i_rank1">1</span></div>
                                <div className="thumb"><img className="im" src={require("../../../assets/images/tmp_prd.jpg")} /></div>
                                <div className="txt">
                                    <p className="t1">다이브인</p>
                                    <p className="t2">저분자 히알루론산 세럼 저분자 히알루론산 세럼 저분자 히알루론산 세럼</p>
                                    <p className="t1 mt20"><span className="i-aft i_star">4.6</span></p>
                                </div>
                            </Link></li>
                            <li><Link to="#">
                                <div className="num"><span className="i-set i_rank2">2</span></div>
                                <div className="thumb"><img className="im" src={require("../../../assets/images/tmp_prd.jpg")} /></div>
                                <div className="txt">
                                    <p className="t1">다이브인</p>
                                    <p className="t2">저분자 히알루론산 세럼</p>
                                    <p className="t1 mt20"><span className="i-aft i_star">4.6</span></p>
                                </div>
                            </Link></li>
                            <li><Link to="#">
                                <div className="num"><span className="i-set i_rank3">3</span></div>
                                <div className="thumb"><img className="im" src={require("../../../assets/images/tmp_prd.jpg")} /></div>
                                <div className="txt">
                                    <p className="t1">다이브인</p>
                                    <p className="t2">저분자 히알루론산 세럼</p>
                                    <p className="t1 mt20"><span className="i-aft i_star">4.6</span></p>
                                </div>
                            </Link></li>
                            <li><Link to="#">
                                <div className="num"><span className="i-set i_rank">4</span></div>
                                <div className="thumb"><img className="im" src={require("../../../assets/images/tmp_prd.jpg")} /></div>
                                <div className="txt">
                                    <p className="t1">다이브인</p>
                                    <p className="t2">저분자 히알루론산 세럼</p>
                                    <p className="t1 mt20"><span className="i-aft i_star">4.6</span></p>
                                </div>
                            </Link></li>
                            <li><Link to="#">
                                <div className="num"><span className="i-set i_rank">5</span></div>
                                <div className="thumb"><img className="im" src={require("../../../assets/images/tmp_prd.jpg")} /></div>
                                <div className="txt">
                                    <p className="t1">다이브인</p>
                                    <p className="t2">저분자 히알루론산 세럼</p>
                                    <p className="t1 mt20"><span className="i-aft i_star">4.6</span></p>
                                </div>
                            </Link></li>
                            <li><Link to="#">
                                <div className="num"><span className="i-set i_rank">6</span></div>
                                <div className="thumb"><img className="im" src={require("../../../assets/images/tmp_prd.jpg")} /></div>
                                <div className="txt">
                                    <p className="t1">다이브인</p>
                                    <p className="t2">저분자 히알루론산 세럼</p>
                                    <p className="t1 mt20"><span className="i-aft i_star">4.6</span></p>
                                </div>
                            </Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ranking;