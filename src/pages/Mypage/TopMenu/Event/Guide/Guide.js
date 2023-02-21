import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
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
        speed: 100,
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
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide0" alt="guide0" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage0.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide1" alt="guide1" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage1.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide2" alt="guide2" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage2.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide3" alt="guide3" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage3.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide4" alt="guide4" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage4.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide5" alt="guide5" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage5.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide6" alt="guide6" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage6.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide7" alt="guide7" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage7.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide8" alt="guide8" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage8.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide9" alt="guide9" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage9.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide10" alt="guide10" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage10.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide11" alt="guide11" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage11.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide12" alt="guide12" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage12.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="area_test">
                                    <div className="guide_img">
                                        <img className="guide13" alt="guide13" src="https://pinktrano.s3.ap-northeast-2.amazonaws.com/event/guideimage13.png" />
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guide;
