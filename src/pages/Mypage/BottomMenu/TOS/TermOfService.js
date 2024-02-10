import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom";
import KiinPolicy from "../../../SignUpPage/PolicyPage/KiinPolicy"

const TOS = () => {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">어리버리 서비스 이용 약관</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="inr-c-policy">
                    <KiinPolicy/>
                </div>
            </div>
        </div>
    )
}

export default TOS;