import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const Guide = () => {
    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const btnRef = useRef(null);
    const setting = {
        dots: true,
        infinite: false,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 1,
        slidesToScroll: 1, swipeToSlide: true,
        speed: 1500,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">키인 사용 설명서</h2>
                    <div className="lft">
                        <button type="button" onClick={() => navigate(-1)}>
                            <span className="i-aft i_back"></span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub test">
                <div className="inr-c">
                    <div className="slider1">
                        <Slider {...setting} ref={sliderRef}>
                            {/*{ for (let i = 0; i < 12; i++)*/}
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage0.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage1.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage2.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage3.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage4.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage5.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage6.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage7.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage8.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage9.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage10.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage11.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage12.png")} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img src={require("../../../../../assets/images/guideimg/guideimage13.png")} />
                                    </div>
                                </div>
                            </div>
                            {/*}*/}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guide;
