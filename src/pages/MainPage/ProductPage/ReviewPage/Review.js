import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, CompoundSlider } from "../../../../component"
import { useDidMountEffect } from "../../../../hooks"
import $ from "jquery"

const Review = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [rating, setRating] = useState(3)
    const [textInput, setTextInput] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [modal, setModal] = useState(false)
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    /*
        When writing a review, update the modal state, 
        then go to the main screen.
    */
    useDidMountEffect(()=>{
        if(!modal)navigate("/main")           
    },[modal])

    useEffect(()=>{
        if(getByte(textInput)>=20)setDisabled(false)
        else setDisabled(true)
    })

    const getByte = (str) => {
        return str
            .split('')
            .map(s => s.charCodeAt(0))
            .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0);
    }

    const reviewPost = () => {
        $.ajax({
            async: true, type: "POST",
            url: "https://api.odoc-api.com/api/v1/reviews-product-filter/",
            data: JSON.stringify({
                "member": parseInt(sessionStorage.getItem("user_pk")),
                "review_article": {
                    "article_content": textInput
                },
                "product": parseInt(location.state.product_id),
                "rating": rating,
                "heart": false
            }), contentType: "application/json",
            success: (response) => {
                // setModal(true)
                navigate(-1);
            },
            error: (response) => console.log(response)
        });
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">리뷰 쓰기</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" 
                            onClick={() => {
                                if (getByte(textInput)){
                                    if (window.confirm("이전 페이지로 이동하시겠습니까?\n작성 중인 내용이 저장되지 않고 사라집니다."))
                                        navigate(-1) 
                                }else {
                                    navigate(-1)
                                }
                            }}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" onClick={() => navigate("/mypage/notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>
            <div id="container" className="container sub product">
                <div className="inr-c pd-ty1">
                    <div className="area_review">
                        <div className="basic_info">
                            <div className="tit">
                                <p className="t1">{location.state.info.brand.brand_name}</p>
                                <p className="t2">{location.state.info.product_name}</p>
                            </div>
                            <div className="img"><span style={{backgroundImage: `url(${location.state.info.product_img_path})`}}></span></div>
                        </div>
                        <div className="txt">
                            <p><strong>어떠셨나요?</strong></p>
                            <CompoundSlider setRating={setRating}/>
                            <div className="box_rang">
                                {
                                    rating === 1 ? (
                                        <div><p className="i-aft i_review_bad">별로에요</p></div>
                                    ) : rating === 5 ? (
                                        <div><p className="i-aft i_review_good">잘 맞았어요</p></div>
                                    ) : (
                                        <div><p className="i-aft i_review_normal">보통이에요</p></div>
                                    )
                                }
                            </div>
                            <p className="c1">자세한 평가를 해주세요</p>
                            <textarea className="textarea1" placeholder="별점은 내렸지만 아직 텍스트 리뷰를 안 남긴 제품이에요.텍스트 리뷰를 작성하면 나와 비슷한 피부를 가진 이웃들의 제품선택에 큰 도움이 됩니다."
                                value={textInput} onChange={(e)=>setTextInput(e.target.value)}>
                            </textarea>
                            <p className="p_text">솔직하고 자세한 평가로 참여해주세요.<br />참여도가 우수할수록 높은 포인트를 모을 수 있는 평가에 참여할 수 있어요.</p>
                        </div>
                        {/* <Modal open={modal} className="customOverlay">
                            <div id="popAssess" className="layerPopup pop_assess">
                                <div className="popup">
                                    <div className="p_head botm">
                                        <h2 className="hidden">평가완료</h2>
                                    </div>

                                    <div className="p_cont">
                                        <div className="ta-c"><img src={require("../../../../assets/images/common/img_comp.jpg")} /></div>
                                        <p className="t1">축하드려요!</p>
                                        <p className="t2"><strong>100P</strong> 적립</p>

                                        <div className="btn-bot">
                                            <button to="/main" className="btn-pk blue s bdrs"
                                                onClick={()=>{
                                                    setModal(!modal)
                                                }}>
                                                <span>홈으로</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal> */}
                    </div>
                </div>

                <div className="fix_botm">
                    <button className="btn-pk blue n" disabled={disabled} onClick={()=>reviewPost()}>
                        <span>등록</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Review;