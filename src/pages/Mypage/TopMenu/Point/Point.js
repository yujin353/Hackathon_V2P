import React from "react"
import { Link, useNavigate } from "react-router-dom";

const Point = () => {
    const navigate = useNavigate();

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">포인트</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" onClick={() => navigate("../../notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="inr-c pd-ty1">
                    <div className="box_point ty2 pr-mb1">
                        <p>
                            <span>사용 가능한 포인트</span>
                            <Link to="change" className="btn-pk ss blue2 bdrs"><span>교환하기</span></Link>
                        </p>
                        <p className="t2">5,340 P</p>
                    </div>

                    <h2 className="h_tit1">포인트 적립내역</h2>
                    <div className="lst_tbl">
                        <ul>
                            <li>
                                <p>리뷰쓰기</p>
                                <p>22.07.21</p>
                                <p>+150P</p>
                            </li>
                            <li>
                                <p>스킨퀴즈</p>
                                <p>22.07.21</p>
                                <p>+150P</p>
                            </li>
                            <li>
                                <p>리뷰쓰기</p>
                                <p>22.07.21</p>
                                <p>+150P</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Point;