import React from "react"
import WarningSound from "../WarningSound";

const CollisionWarning = () => {

    return (
        <>
            <div className="detailbox">
                <div className="pr-mb2">
                    <div className="hd_tit">
                        <h2 className="h_tit1" style={{textAlign: "center", marginTop: "4vw"}}>충돌 경고</h2>
                        <p className="b_txt1"><span><strong className="bshadow1">주의</strong><br />근방에서 접근하는 차와 충돌할 수 있습니다.<br /><span></span></span></p>
                        <img className="img_2" src={require("../../assets/images/caution2.png")} />
                    </div>
                </div>
            </div>
            <WarningSound/>
        </>
    )
}

export default CollisionWarning;
