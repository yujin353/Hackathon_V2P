import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Wordcloud } from "../../../component"
import { useAccessTknRefresh } from "../../../hooks"
import $ from "jquery"
import { getProductGredients } from "../../../api/product"

const Product = () => {
    const accessTknRefresh = useAccessTknRefresh();
    const params = useParams()
    const navigate = useNavigate()
    const [productInfo, setProductInfo] = useState({})
    const [username, setUsername] = useState("")
    const [rate, setRate] = useState()
    const [reviewList, setReviewList] =  useState([])
    const [count, setCount] = useState(10)
    const rating_className = ["i_review_bad", "i_review_normal", "i_review_normal", "i_review_normal", "i_review_good"]
    const rating_txt = ["별로에요", "보통이에요", "보통이에요", "보통이에요", "잘 맞았어요"]
    const [productIngredients, setProductIngredients] = useState(null);

    /* loading product info */
    useEffect(() => {
        $.ajax({
            async: false, type: 'GET',
            url: "https://api.odoc-api.com/api/v1/products/" + params.id + "/",
            success: response => setProductInfo(response),
            error: response => {
                console.log(response)
                alert("존재하지 않는 상품입니다.")
                navigate("/main")
            }
        })
    }, [])

    /* findout currently logged in user */
    useEffect(() => {
        $.ajax({
            async: false, type: 'GET',
            url: "https://api.odoc-api.com/api/v1/members/" + sessionStorage.getItem("user_pk") + "/",
            success: (response) => setUsername(response.username),
            error: (response) => {
                console.log("error", response);
                alert("login failed.")
            },
        });
    }, [])

    /* function to calculate product fit */
    useEffect(() => {
        $.ajax({
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/matching" + `?member_id=${sessionStorage.getItem("user_pk") }&product_id=${params.id}`,
            success: response => setRate(response.matching_rate),
            error: response => console.log(response)
        })
    }, [])

    /* loading product reviews */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/reviews-product-filter/" + "?search=" + params.id,
            success: (response) => {
                const result = [];
                response.results.map((v) => {
                    if (v.product != null)
                        result.push(v)
                })
                setReviewList(result)
            },
            error: (response) => console.log(response)
        });
    }, [])

    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/review-like/" + "?search=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
            success: (response) => {
                response.results.forEach((v) => {
                    $("button[name=" + v.like_review.review_id + "]").addClass("on");
                })
            },
            error: (response) => {
                if (response.statusText == "Unauthorized") {
                    sessionStorage.setItem("access_token", accessTknRefresh())
                    navigate(0)
                }
            },
        });
    }, [])

    const initProductGredient = async () => {
        const res = await getProductGredients({
            productId: params.id,
            memberId: sessionStorage.getItem("user_pk")
        })
        setProductIngredients(res?.data?.results)
    }
    useEffect(() => {
        initProductGredient()
    }, [params.id])

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

    const likeReview = (review_id) => {
        $.ajax({
            async: true, type: "POST",
            url: "https://api.odoc-api.com/api/v2/like-review",
            data: { "like_review": review_id },
            dataType: "json",
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
            success: function (response) {
                const element = document.getElementById(review_id)
                $(element).toggleClass("off on")
                if (response.message == "Like") alert("관심리뷰에 추가되었습니다.");
                else alert("관심리뷰에서 제거되었습니다.");
            },
            error: (response) => console.log(response),
        });
    }

    const reportReview = (review_id) => {
        if (window.confirm("정말 신고하시겠습니까?") === true) {
            $.ajax({
                async: true, type: "POST",
                url: "https://api.odoc-api.com/api/v2/report",
                data: { "review_id": review_id },
                dataType: "json",
                beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
                success: (response) => {
                    if (response.message === "Report") alert("정상적으로 신고 접수 되었습니다.")
                    else alert("이미 신고 접수 되었습니다.")
                },
                error: (response) => console.log(response),
            });
        } else return;
    };

    if(productInfo.brand === undefined) return <></>

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">제품 상세정보</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        <button type="button" className="btn_alram on" onClick={() => navigate("/mypage/notification")}>
                            <span className="i-set i_alram"></span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub product">
                <div className="inr-c">
                    <div className="txt_box2 mb20">
                        <p className="t1">
                            써보신 제품이라면 비슷한 피부의 이웃들을 위해 리뷰를 남겨주세요.<br />
                            포인트는 물론, 신제품 테스터의 기회는 덤!
                        </p>
                    </div>
                    <div className="area_product1">
                        <div className="basic_info">
                            <div className="img">
                                <span style={{ backgroundImage: `url(${productInfo.product_img_path})` }} />
                            </div>
                            <div className="txt">
                                <p className="t1">{productInfo.brand.brand_name}</p>
                                <p className="t2">{productInfo.product_name}</p>
                            </div>
                        </div>
                        <div className="lst_grade">
                            <ul>
                                <li>
                                    <p>평균 평점</p>
                                    <div className="r">
                                        <div className="i_grade"><span style={{ width: "80%" }}></span></div>
                                        <p>4.0</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {productIngredients?.length > 0 && <>
                        <div className="hd_tit">
                            <h2 className="h_tit1">전성분</h2>
                        </div>
                        <div className="box_cont d-b pr-mb1">
                            <Wordcloud productIngredients={productIngredients}/>
                        </div> 
                    </>}
                    <div className="hd_tit">
                        <h2 className="h_tit1">
                            <strong className="c-blue">{username}</strong>님 피부타입에 &nbsp;
                            <span className="c-blue">{rate ? rate : "undefined"}%</span>적합합니다.
                        </h2>
                    </div>

                    <div className="pr-mb1">
                        <div className="lst_bar">
                            <ul>
                                <li><p>지성</p><div className="bar_b"><span style={{ width: `${rate+7.23}%` }}></span></div><p>{(rate+7.23).toFixed(2)}%</p></li>
                                <li><p>민감성</p><div className="bar_b"><span style={{ width: `${rate-2.80}%` }}></span></div><p>{(rate-2.80).toFixed(2)}%</p></li>
                                <li><p>트러블</p><div className="bar_b"><span style={{ width: `${rate-4.43}%` }}></span></div><p>{(rate-4.43).toFixed(2)}%</p></li>
                            </ul>
                        </div>
                    </div>

                    <div className="hd_tit">
                        <h2 className="h_tit1">리뷰 둘러보기</h2>
                        <div className="rgh">
                            <select className="select1 hd_ty1">
                                <option value="">최근작성 순</option>
                                <option value="">피부 유사도 순</option>
                                <option value="">만족도 순</option>
                            </select>
                        </div>
                    </div>

                    <div className="lst_review">
                        <ul className="prod_reviews">
                            {reviewList.slice(0,count).map((v) => {
                                const rand_simil = productFit(v.member.member_id, v.product.product_id)
                                return (
                                    <li className="col" key={v.review_id}>
                                        <div className="tit">
                                            <div className="thumb" onClick={() => navigate(`/mykiin/neighbor?id=${v.member.member_id}`)}><span><img src={require("../../../assets/images/common/img_nomem.jpg")}/></span></div>
                                            <p className="h1" onClick={() => navigate(`/mykiin/neighbor?id=${v.member.member_id}`)}>{v.member.username}</p>
                                            <p className="t1">피부 유사도 <span className="c-blue">{rand_simil ? rand_simil : "undefined"}%</span></p>
                                            <div className="bar_b"><span style={{width: `${rand_simil}%`}}></span></div>
                                            <button type="button" className="btn_favorit" id={v.review_id}
                                                name={`${v.review_id}`} onClick={()=>{likeReview(v.review_id)}}>
                                                <span className="i-set i_favorit">좋아요</span>
                                            </button>
                                        </div>
                                        <div className="txt_box1">
                                            <div className="box">
                                                <p className="t"><span className={`i-aft ${rating_className[v.rating - 1]} sm`}>{rating_txt[v.rating - 1]}</span></p>
                                                <p>{v.review_article?.article_content}</p>
                                                <button type="button" onClick={()=>reportReview(v.review_id)} className="btr">
                                                    <span className="i-aft i_report">신고하기</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="botm">
                                            { v.review_article ? <p className="t1">작성일: {(v.review_article.article_date).substring(0, 10)}</p> : null }
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="btn-bot">
                        <button className="btn-pk s blue2 bdrs w50p" 
                            onClick={()=>{
                                if(count >= reviewList.length)
                                    alert("모든 리뷰를 확인했습니다.")
                                else setCount(prev=>prev+5)
                            }}>
                            <span>더보기</span>
                        </button>
                    </div>

                    <button className="btn_fix" 
                        onClick={() => navigate("review", {
                            state: {
                                product_id: params.id,
                                info: productInfo
                            }
                        })}>
                        <span className="i-aft i_review">리뷰작성</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product;