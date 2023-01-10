import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAccessTknRefresh } from "../../../hooks";
import $, { removeData } from "jquery"

const Interest = () => {
    const accessTknRefresh = useAccessTknRefresh();
    const navigate = useNavigate();
    const [reviewList, setReviewList] = useState([]);
    const rating_className = ["i_review_bad", "i_review_normal", "i_review_normal", "i_review_normal", "i_review_good"]
    const rating_txt = ["별로에요", "보통이에요", "보통이에요", "보통이에요", "잘 맞았어요"]

    /* loading reviews that users are interested in */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/review-like/?search=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
            success: (response) => setReviewList(response.results),
            error: (response) => {
                if (response.statusText === "Unauthorized") {
                    sessionStorage.setItem("access_token", accessTknRefresh())
                    navigate(0)
                }
            },
        })
    }, [])

    /* retrieves user's favorite review information */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/review-like/" + "?search=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
            success: (response) => {
                response.results.map((v) => {
                    const review_id = v.like_review.review_id
                    const element = document.getElementById(review_id)
                    $(element).addClass('on')
                })
            },
            error: (response) => {
                if (response.statusText === "Unauthorized") {
                    sessionStorage.setItem("access_token", accessTknRefresh())
                    navigate(0)
                }
            },
        })
    }, [])

    /* function to calculate product fit */
    const productFit = (member_id, product_id) => {
        let result;
        $.ajax({
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/matching" + `?member_id=${member_id}&product_id=${product_id}`,
            success: response => result = response.matching_rate,
            error: response => console.log(response)
        })
        return result;
    }

    /* report a review function */
    const reportReview = (review_id) => {
        if (window.confirm("정말 신고하시겠습니까?") === true) {
            $.ajax({
                async: true, type: "POST",
                url: "https://api.odoc-api.com/api/v2/report",
                data: { "review_id": review_id }, dataType: "json",
                beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
                success: (response) => {
                    if (response.message === "Report") alert("정상적으로 신고 접수 되었습니다.")
                    else alert("이미 신고 접수 되었습니다.")
                },
                error: (response) => console.log(response),
            });
        } else return;
    };

    /* functions to add and remove from interesting reviews */
    const likeReview = (review_id) => {
        const element = document.getElementById(review_id)
        $.ajax({
            async: true, type: "POST",
            url: "https://api.odoc-api.com/api/v2/like-review",
            data: { "like_review": review_id }, dataType: "json",
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
            success: function (response) {
                if (response.message === "Like") alert("관심리뷰에 추가되었습니다.");
                else alert("관심리뷰에서 제거되었습니다.");
            },
            error: (response) => console.log(response),
        });
        $(element).toggleClass("off on");
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">관심리뷰</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        <button type="button" className="btn_alram on" onClick={() => navigate("../notification")}>
                            <span className="i-set i_alram"></span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="inr-c">
                    <div className="lst_review line">
                        {
                            reviewList.length!=0?
                            reviewList.map((v) => {
                                const review = v.like_review
                                const product = review.product
                                const member = review.member
                                const rand_simil = productFit(member.member_id, product.product_id)
                                return (
                                    <div className="col" key={v.like_review.review_id}>
                                        <div className="lst_prd2">
                                            <Link to={`/main/products/${product.product_id}`} className="b">
                                                <div className="thumb"><span className="im" style={{ backgroundImage: `url(${product.product_img_path})` }}></span></div>
                                                <div className="txt">
                                                    <p className="t1">{product.brand.brand_name}</p>
                                                    <p className="t2">{product.product_name}</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="tit">
                                            <div className="thumb" onClick={() => navigate(`/mykiin/neighbor?id=${review.member.member_id}`)}>
                                                <span><img src={require("../../../assets/images/common/img_nomem.jpg")}></img></span>
                                            </div>
                                            <p className="h1" onClick={() => navigate(`/mykiin/neighbor?id=${review.member.member_id}`)}>{review.member.username}</p>
                                            <p className="t1">피부 유사도 <span className="c-blue">{rand_simil}%</span></p>
                                            <div className="bar_b"><span style={{ width: `${rand_simil}%` }}></span></div>
                                            <button type="button" className="btn_favorit" id={review.review_id}
                                                name={review.review_id} onClick={() => likeReview(review.review_id)}>
                                                <span className="i-set i_favorit">좋아요</span>
                                            </button>
                                        </div>
                                        <div className="txt_box1">
                                            <div className="box">
                                                <p className="t"><span className={`i-aft ${rating_className[review.rating - 1]} sm`}>{rating_txt[review.rating - 1]}</span></p>
                                                <p>{review.review_article.article_content}</p>
                                                <button type="button" onClick={() => reportReview(review.review_id)} className="btr"><span className="i-aft i_report">신고하기</span></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <p className="emptyArea" style={{color:"#bfc2ca", fontSize:"18px", textAlign:"center", marginTop:"120px"}}>관심리뷰가 없습니다.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interest;
