import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Footer } from '../../component';
import { useLogout } from "../../hooks";
import $ from "jquery";

const MyPage = () => {
    /* Add on ClassName to bottom navigation bar current tab */
    useEffect(() => {
        var pathname = $(window.location).attr('pathname');
        if (pathname.startsWith("/test")) $("#fmenu1").addClass("on");
        else if (pathname.startsWith("/MyMap")) $("#fmenu2").addClass("on");
        else if (pathname.startsWith("/main")) $("#fmenu3").addClass("on");
        else if (pathname.startsWith("/search")) $("#fmenu4").addClass("on");
        else if (pathname.startsWith("/mypage")) $("#fmenu5").addClass("on");
    });

    const goLogout = () => {
        const logout = useLogout;
        logout();
    };

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">마이페이지</h2>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" onClick={()=>navigate("notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>

            <div id="container" className="container sub mypage">
                <div className="line-bot"></div>
                <div className="my_link">
                    <ul>
                        <li><Link to="support"><span className="i-aft i_arr_r1">고객지원</span></Link></li>
                        <li><Link to="termofservice"><span className="i-aft i_arr_r1">이용약관</span></Link></li>
                        <li><Link to="account"><span className="i-aft i_arr_r1">계정관리</span></Link></li>
                        <li><Link to="#" onClick={goLogout} ><span className="i-aft i_arr_r1">로그아웃</span></Link></li>
                    </ul>
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default MyPage;