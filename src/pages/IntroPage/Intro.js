import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cookies from "react-cookies";
import $ from "jquery";

const Intro = () => {
    const navigate = useNavigate();
    const setting = {
        dots: true, infinite: true, speed: 1500,
        slidesToShow: 1, slidesToScroll: 1,
        autoplay: true, autoplaySpeed: 5000,
        appendDots: (dots) => (
            <div
                style={{
                    display: 'flex', position: 'fixed',
                    justifyContent: 'center', bottom: 0,
                    lineHeight: "15.6vw"
                }}>
                <ul> {dots}</ul>
            </div>
        )
    };

    useEffect(() => {
        if (cookies.load("access_token") && cookies.load("refresh_token")) navigate('/login');
    });

    useEffect(() => {
        setTimeout(function () {
            $(".txt_loading").fadeOut(1500);
        }, 2000);
    }, []);

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="hidden">첫화면</h2>
                </div>
            </header>
            <div className="txt_loading">
                <p>URBUR</p>
            </div>
            <div id="container" className="container loading">
                <div className="area_first">
                    <Slider {...setting}>
                        <div className="item">
                            <p className="t1">
                                보행자와 자동차의 GPS를 활용하여, <br />
                                충돌 가능성을 예측하고 경고합니다.<br />
                            </p>
                            <br />
                            <p className="t2">
                                환영합니다! <br />
                                안전한 미래를 위한 첫 걸음, <br />
                            </p>
                            <img className="img_1" src={require("../../assets/images/safeDrive.png")} />
                        </div>
                        <div className="item">
                            <br />
                            <img className="img_2" src={require("../../assets/images/mobisLogo.png")} />
                            <p className="t1 rgh"><br /></p>
                            <p className="t2 rgh">
                                현대모비스와 함께<br />
                                안전한 도로 환경을 만들어요<br />
                            </p>
                        </div>
                    </Slider>
                    <Link to="/login" className="btn_jump">건너뛰기</Link>
                </div>
            </div>
        </div>
    );
};

export default Intro;
