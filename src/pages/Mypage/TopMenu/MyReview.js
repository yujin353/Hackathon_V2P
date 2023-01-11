import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery"

const MyReview = () => {
    const navigate = useNavigate();
    const [reviewList, setReviewList] = useState([])

    useEffect(()=>{
        $.ajax({
            async: true,
            url: "https://api.odoc-api.com/api/v1/reviews-member-filter/?search=" + sessionStorage.getItem("user_pk"),
            type: "GET",
            success: function (response) {
                // console.log(response)
                setReviewList(response.results.reverse())
            },
            error: function (response) {
                console.log(response)
            }
        });
    }, [])

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">내가 쓴 리뷰</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={()=>navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" onClick={() => navigate("../notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="inr-c">
                    <div className="lst_prd2 line">
                        <ul className="review_list">    
                            {
                            reviewList.length!=0?
                            reviewList.map((v)=>{
                                return(
                                    <li key={v.review_id}><Link to={`/main/products/${v.product.product_id}`}>
                                        <div className="thumb">
                                            <span className="im" style={{backgroundImage: `url(${v.product.product_img_path})`}}></span>
                                        </div>
                                        <div className="txt">
                                            <p className="t1">{v.product.brand.brand_name}</p>
                                            <p className="t2">{v.product.product_name}</p>
                                            <p className="t1 mt20"><span className="i-aft i_star">{v.rating}</span></p>
                                        </div>
                                        <div className="btn">
                                            <p>+100P</p>
                                        </div>
                                    </Link></li>
                                )
                            })
                            :
                            <p className="emptyArea" style={{color:"#bfc2ca", fontSize:"18px", textAlign:"center", marginTop:"120px"}}>내가 쓴 리뷰가 없습니다.</p>
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyReview;