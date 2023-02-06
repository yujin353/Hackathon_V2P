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

    const deleteReview = (review_id) => {
        if (window.confirm("정말 삭제하시겠습니까?") === true) {
            $.ajax({
                async: true, type: "DELETE",
                url: "https://api.odoc-api.com/api/v1/reviews-product-filter/" + `${review_id}/`,
                beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
                success: (response) => {
                    const element = document.getElementById(review_id)
                    alert("리뷰가 삭제되었습니다.")
                    window.location.reload();
                },
                error: (response) => console.log(response),
            });
        } else return;
    }

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
                                            <li className="col" key={v.review_id}><Link to={`/main/products/${v.product.product_id}`}>
                                                <div className="thumb">
                                                    <span className="im" style={{backgroundImage: `url(${v.product.product_img_path})`}}></span>
                                                </div>
                                                <div className="txt">
                                                    <p className="t1">{v.product.brand.brand_name}</p>
                                                    <p className="t2">{v.product.product_name}</p>
                                                    <p className="t1 mt20"><span className="i-aft i_star">{v.rating}</span></p>
                                                </div></Link>
                                                <div className="txt_box3">
                                                    <div className="box">
                                                        <p>{v.review_article?.article_content}</p>
                                                        <button type="button" className="btn_del" id={v.review_id}
                                                                name={`${v.review_id}`} onClick={()=>deleteReview(v.review_id)}>
                                                            <span className="i-set.i_del_b">리뷰삭제</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="botm2">
                                                    {
                                                        v.review_article ?
                                                            <p className="t1">작성일: {(v.review_article.article_date).substring(0, 10)}</p>
                                                            : <p className="t1">작성일: </p>
                                                    }
                                                </div>
                                                {/* <div className="btn">
                                            <p>+100P</p>
                                        </div> */}
                                            </li>
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