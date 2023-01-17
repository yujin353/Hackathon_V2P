import React from "react";
import { Link } from "react-router-dom"

const Footer = () => {

    return (
        <footer id="footer" className="footer">
            <ul className="div1">
                <li className="off" id="fmenu1"><Link to="/test"><span className="i-aft i_fmenu1">평가</span></Link></li>
                <li className="off" id="fmenu2"><Link to="/mykiin"><span className="i-aft i_fmenu2">MY키인</span></Link></li>
                <li className="off" id="fmenu3"><Link to="/main"><span className="i-aft i_fmenu3">메인</span></Link></li>
                <li className="off" id="fmenu4"><Link to="/search"><span className="i-aft i_fmenu4">제품검색</span></Link></li>
                <li className="off" id="fmenu5"><Link to="/mypage"><span className="i-aft i_fmenu5">마이페이지</span></Link></li>
            </ul>
        </footer>
    )
}

export default Footer;
