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
                <p>화장품 구매전<br />필수로 확인하세요!</p>
            </div>
            <div id="container" className="container loading">
                <div className="area_first">
                    <Slider {...setting}>
                        <div className="item">
                            <p className="t1">
                                피부 및 화장품 전문가들과<br />
                                함께 설계한 스킨 퀴즈<br />
                                화장품 사용 경험 기반<br />
                                알고리즘을 통해<br />
                            </p>
                            <p className="t2">
                                나에게 딱! 맞는 성분과<br />
                                화장품을 추천받으세요.
                            </p>
                            <img className="img_1" src={require("../../assets/images/graph_example.png")} />
                        </div>
                        <div className="item">
                            <img className="img_2" src={require("../../assets/images/kiinlogo.JPG")} />
                            <p className="t1 rgh">
                                랭킹 1위 제품보다는<br />
                                내 피부에 1등으로 잘 맞는게<br />
                                더 중요하니까
                            </p>
                            <p className="t2 rgh">
                                화장품 사기 전<br />
                                화장품 구매 컨설턴트<br />
                                키인 체크
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
