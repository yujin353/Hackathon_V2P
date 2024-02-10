import React from "react";
import { Link } from "react-router-dom"

const Footer = () => {

    return (
        <footer id="footer" className="footer">
            <ul className="div1">
                <li className="off" id="fmenu2"><Link to="/MyHistory"><span className="i-aft i_fmenu2">MY히스토리</span></Link></li>
                <li className="off" id="fmenu3"><Link to="/main"><span className="i-aft i_fmenu3">메인</span></Link></li>
                <li className="off" id="fmenu5"><Link to="/mypage"><span className="i-aft i_fmenu5">마이페이지</span></Link></li>
            </ul>
        </footer>
    )
}

export default Footer;
