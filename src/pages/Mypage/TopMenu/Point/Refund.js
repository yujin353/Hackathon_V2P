import { createBrowserHistory } from "history";
import React from "react"
import { Link, useNavigate } from "react-router-dom";

const Refund = () => {
    const navigate = useNavigate();

    let history = createBrowserHistory();
    history.listen(({location, action})=>{
        if(location.pathname==='/mypage/point/change' && action==='POP'){
            alert("비정상적인 접근입니다.")
            window.location.replace("/main")
        }
    })

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">환급하기</h2>
                </div>

            </header>
            <div id="container" className="container sub mypage2">
                <div className="inr-c pd-ty1">
                    <div className="area_change">
                        <div className="box">
                            <div>
                                <p className="t1">환급신청이 <br/>완료되었습니다.</p>
                                <p className="t2">실제 환급까지는 3~5 영업일이 소요됩니다.</p>
                            </div>
                        </div>

                        <div className="list">
                            <ul>
                                <li><span>예금주</span>김소라</li>
                                <li><span>은행명</span>기업</li>
                                <li><span>계좌번호</span>01012345678</li>
                                <li><span>환급금액</span>5,340 원</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fix_botm">
                <Link to="/main" className="btn-pk blue n"><span>메인화면으로 이동</span></Link>
            </div>
        </div>
    )
}

export default Refund;