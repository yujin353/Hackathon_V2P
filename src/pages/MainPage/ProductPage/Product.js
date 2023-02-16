import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Wordcloud } from "../../../component";
import { useAccessTknRefresh } from "../../../hooks";
import { getProductGredients } from "../../../api/product";
import cookies from "react-cookies";
import $ from "jquery";

const Product = () => {
    const accessTknRefresh = useAccessTknRefresh();
    const params = useParams();
    const navigate = useNavigate();
    const [productInfo, setProductInfo] = useState({});
    const [average, setAverage] = useState("");
    const [username, setUsername] = useState("");
    const [rate, setRate] = useState();
    const [reviewList, setReviewList] = useState([]);
    const [count, setCount] = useState(10);
    const rating_className = ["i_review_bad", "i_review_normal", "i_review_normal", "i_review_normal", "i_review_good"];
    const rating_txt = ["별로에요", "보통이에요", "보통이에요", "보통이에요", "잘 맞았어요"];
    const [productIngredients, setProductIngredients] = useState(null);
    let [likeProducts, setLikeProducts] = useState([]);
    let latestLikeProducts = useRef(likeProducts);
    let stars;
    const [myskinType, setMyskinType] = useState(0)
    const [filter, setFilter] = useState(0);

    /* loading product info */
    useEffect(() => {
        $.ajax({
            async: false, type: 'GET',
            url: "https://dev.odoc-api.com/product/product?product_id=" + params.id,
            success: response => setProductInfo(response[0]),
            error: response => {
                console.log(response);
                alert("존재하지 않는 상품입니다.");
                //navigate("/main");
            }
        });
    }, []);

    /* loading product review average */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member_product/review_average?product_id=" + params.id,
            success: (response) => setAverage(response.message),
            error: (response) => {
                if (response.responseJSON.message == "ERROR")
                    setAverage(0)
                else
                    console.log(response)
            }
        });
    }, []);

    /* findout currently logged in user */
    useEffect(() => {
        $.ajax({
            async: false, type: 'GET',
            url: "https://dev.odoc-api.com/member/member_display?member_id=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh),
            success: (response) => setUsername(response[0].username),
            error: (response) => {
                console.log("error", response);
                alert("login failed.")
                logout();
                window.location.replace("/");
            },
        });
    }, []);

    const logout = () => {
        // var obj = { "refresh": sessionStorage.getItem("refresh_token") };
        // $.ajax({
        //     async: true,
        //     type: 'POST',
        //     url: "https://api.odoc-api.com/rest_auth/logout/",
        //     data: obj,
        //     dataType: 'JSON',
        //     success: function (response) {
        //         console.log(response);
        //         sessionStorage.removeItem("access_token");
        //         sessionStorage.removeItem("refresh_token");
        //         sessionStorage.removeItem("user_pk");
        //         cookies.remove("access_token");
        //         cookies.remove("refresh_token");
        //         localStorage.removeItem("user_pk");
        //         navigate('/login');
        //     },
        //     error: function (response) {
        //         console.log(response);
        //     },
        // });
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("user_pk");
        cookies.remove("access_token");
        cookies.remove("refresh_token");
        localStorage.removeItem("user_pk");
        window.location.replace('/login')
    };

    /* function to calculate product fit */
    const calcProFit = () => {
        $.ajax({
            async: false, type: "GET",
            url: `https://dev.odoc-api.com/recommendation/product_matching?member_id=${sessionStorage.getItem("user_pk")}&product_id=${params.id}`,
            success: response => {
                setRate(response.result)
            },
            error: response => console.log(response)
        });
    };

    /* loading product reviews */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member_product/review_product?product_id=" + params.id,
            success: (response) => {
                const result = [];
                response.map((v) => {
                    if (v.product != null)
                        result.push(v);
                });
                setReviewList(result.reverse());
            },
            error: (response) => console.log(response)
        });
    }, [filter]);

    /* find my skin type */
    useEffect(() => {
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member/my_skin?member_id=" + sessionStorage.getItem("user_pk") ,
            success: (response) => {
                if (response[0]) {
                    setMyskinType(response[0].type.type_id)
                    calcProFit()
                }
            },
            error: (response) => console.log(response)
        });
    }, []);

    /* loading product reviews that filters only the same myskintype */
    const reviewFilter = () => {
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member_product/review_product?product_id=" + params.id,
            success: (response) => {
                const result = [];
                response.map((v) => {
                    if (v.product != null)
                        if (v.type.type_id === myskinType)
                            result.push(v);
                });
                setReviewList(result);
            },
            error: (response) => console.log(response)
        });
    };

    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member_product/review_like_display?member_id=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh),
            success: (response) => {
                response.forEach((v) => {
                    $("button[name=" + v.like_review.review_id + "]").addClass("on");
                });
            },
            error: (response) => {
                if (response.statusText === "Unauthorized") {
                    sessionStorage.setItem("access_token", accessTknRefresh());
                    navigate(0);
                }
            },
        });
    }, []);

    /* products user wants to try */
    useEffect(() => {
        let info;
        let like_product = [];
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member_product/product_like_display?member_id=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh),
            success: (response) => {
                info = response;
                for (let i = 0; i < info.length; i++) {
                    like_product = like_product.concat(info[i].like_product.product_id);
                    setLikeProducts = like_product;
                }
                if (info.length === 0) latestLikeProducts.current = [];
                else latestLikeProducts.current = setLikeProducts;
            },
            error: (response) => { console.log(response); }
        });
    });

    /* find products user wants to try */
    const findLikeProducts = (likeIcon) => {
        let check = "fail";
        for (let i = 0; i < (latestLikeProducts.current).length; i++) {
            if (likeIcon.id == latestLikeProducts.current[i]) {
                check = "success";
                break;
            }
        }
        return check;
    };

    /* coloring products user wants to try */
    const likeState = (element) => {
        let isMounted = true;
        let likeIcon = document.getElementById(element);
        let check;
        if (likeIcon && isMounted) {
            check = findLikeProducts(likeIcon);
            if (check === "success") return true;
            else if (check === "fail") return false;
            else { console.log('likeIcon error'); return false; }
        }
    };

    const likeProduct = (product_id) => {
        $.ajax({
            async: true, type: "POST",
            url: "https://dev.odoc-api.com/member_product/product_like",
            data: {
                "product_id": product_id,
                "member_id": sessionStorage.getItem("user_pk")
            },
            dataType: "json",
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh),
            success: (response) => {
                const element = document.getElementsByName(product_id);
                $(element).toggleClass("on");
                if (response.message === "LIKE") {
                    alert("좋아하는 상품 목록에 추가되었습니다.");
                    if (latestLikeProducts.current.length === 0) {
                        setLikeProducts = [];
                        setLikeProducts = setLikeProducts.concat(product_id);
                        latestLikeProducts.current = setLikeProducts;
                    }
                    else latestLikeProducts.current = latestLikeProducts.current.concat(product_id);
                }
                else {
                    alert("좋아하는 상품 목록에서 제거되었습니다.");
                    latestLikeProducts.current = latestLikeProducts.current.filter(elem => elem !== product_id);
                }
                likeState(product_id);
            },
            error: (response) => console.log(response),
        });
    };

    // const initProductGredient = async () => {
    //     const res = await getProductGredients({
    //         productId: params.id,
    //         memberId: sessionStorage.getItem("user_pk")
    //     });
    //     console.log(res)
    //     setProductIngredients(res?.data?.results);
    // };
    // useEffect(() => {
    //     initProductGredient();
    // }, [params.id]);

    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: `https://dev.odoc-api.com/product/ingredient_member?product_id=${params.id}&member_id=${sessionStorage.getItem("user_pk")}`,
            success: response => {
                setProductIngredients(response.results)
            },
            error: response => console.log(response)
        });
    }, [params.id]);

    /* function to calculate product fit */
    const productFit = (member_id, product_id) => {
        let result;
        $.ajax({
            async: false, type: "GET",
            url: `https://dev.odoc-api.com/recommendation/product_matching?member_id=${sessionStorage.getItem("user_pk")}&product_id=${params.id}`,
            success: response => result = response.result,
            error: response => console.log(response)
        });
        return result;
    };

    const likeReview = (review_id) => {
        $.ajax({
            async: true, type: "POST",
            url: "https://dev.odoc-api.com/member_product/review_like",
            data: {
                "review_id" : review_id,
                "member_id" : sessionStorage.getItem("user_pk")
            },
            dataType: "json",
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh),
            success: function (response) {
                const element = document.getElementById(review_id);
                $(element).toggleClass("off on");
                if (response.message === "LIKE") alert("관심리뷰에 추가되었습니다.");
                else alert("관심리뷰에서 제거되었습니다.");
            },
            error: (response) => console.log(response),
        });
    };

    /* used to delete review */
    const checkAuthority = (review_id, member_id) => {
        const value = sessionStorage.getItem("user_pk");
        if (value == member_id)
            return 'Y';
        else return 'N';
    };

    const deleteReview = (review_id) => {
        if (window.confirm("정말 삭제하시겠습니까?") === true) {
            $.ajax({
                async: true, type: "DELETE",
                url: `https://dev.odoc-api.com/member_product/member_review_delete/${review_id}`,
                beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh),
                success: (response) => {
                    alert("리뷰가 삭제되었습니다.");
                    window.location.reload();
                },
                error: (response) => console.log(response),
            });
        } else return;
    };

    const reportReview = (review_id) => {
        if (window.confirm("정말 신고하시겠습니까?") === true) {
            $.ajax({
                async: true, type: "POST",
                url: "https://dev.odoc-api.com/member_product/review_report",
                data: {
                    "review_id": review_id,
                    "member_id": sessionStorage.getItem("user_pk")
                },
                dataType: "json",
                beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh),
                success: (response) => {
                    if (response.message === "REPORT") alert("정상적으로 신고 접수 되었습니다.");
                    else alert("이미 신고 접수 되었습니다.");
                },
                error: (response) => console.log(response),
            });
        } else return;
    };

    if (productInfo.brand === undefined) return <></>;

    stars = average * 100.0 / 5.0;
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
                        {/* 알림버튼 */}
                        {/* <button type="button" className="btn_alram on" onClick={() => navigate("/mypage/notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                        <button
                            type="button" id={params.id} style={{ verticalAlign: "middle" }}
                            className={likeState(params.id) ? "btn_favorit on" : "btn_favorit"}
                            name={params.id} onClick={() => likeProduct(params.id)}>
                            <span className="i-set i_favorit">좋아요</span>
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
                                        <div className="i_grade"><span style={{ width: stars + "%" }}></span></div>
                                        <p>{average ? average : "0.00"}</p>
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
                            <Wordcloud productIngredients={productIngredients} />
                        </div>
                    </>}
                    <div className="hd_tit">
                        <h2 className="h_tit1">
                            <strong className="c-blue">{username}</strong>님 피부타입에 &nbsp;
                            <span className="c-blue">{rate ? rate : "undefined"}%</span>적합합니다.
                        </h2>
                    </div>

                    <div className="hd_tit">
                        <h2 className="h_tit1">리뷰 둘러보기</h2>
                        <div className="rgh">
                            {/* <select className="select1 hd_ty1">
                                <option value="">최근작성 순</option>
                                <option value="">피부 유사도 순</option>
                                <option value="">만족도 순</option>
                            </select> */}
                            <select className="select1 hd_ty1"
                                    onChange={(e) => {
                                        if (e.target.value === "all") setFilter(filter+1);
                                        else reviewFilter();
                                    }}>
                                <option value="all">모든 리뷰</option>
                                <option value="sameSkin">내 피부타입 리뷰</option>
                            </select>
                        </div>
                    </div>

                    <div className="lst_review">
                        <ul className="prod_reviews">
                            {reviewList.slice(0, count).map((v) => {
                                // const rand_simil = productFit(v.member.member_id, v.product.product_id);
                                const authority = checkAuthority(v.review_id, v.member.member_id);
                                return (
                                    <li className="col" key={v.review_id}>
                                        <div className="tit">
                                            <div className="thumb" onClick={() => navigate(`/mykiin/neighbor?id=${v.member.member_id}`)}><span><img src={require("../../../assets/images/common/img_nomem.jpg")} /></span></div>
                                            <p className="h1" onClick={() => navigate(`/mykiin/neighbor?id=${v.member.member_id}`)}>{v.member.username}</p>
                                            {/* <p className="t1">피부 유사도 <span className="c-blue">{rand_simil ? rand_simil : "undefined"}%</span></p> */}
                                            {/* <div className="bar_b"><span style={{width: `${rand_simil}%`}}></span></div> */}
                                            <button type="button" className="btn_favorit" id={v.review_id}
                                                name={`${v.review_id}`} onClick={() => { likeReview(v.review_id); }}>
                                                <span className="i-set i_favorit">좋아요</span>
                                            </button>
                                        </div>
                                        <div className="txt_box1">
                                            <div className="box">
                                                <p className="t"><span className={`i-aft ${rating_className[v.rating - 1]} sm`}>{rating_txt[v.rating - 1]}</span></p>
                                                <p>{v.review_content ? v.review_content : null}</p>
                                                <button type="button" onClick={() => reportReview(v.review_id)} className="btr">
                                                    <span className="i-aft i_report">신고하기</span>
                                                </button>
                                                {authority === 'Y'
                                                    ?
                                                    <button type="button" className="btn_del" id={v.review_id}
                                                        name={`${v.review_id}`} onClick={() => deleteReview(v.review_id)}>
                                                        <span className="i-set.i_del_b">리뷰삭제</span>
                                                    </button>
                                                    : null}
                                            </div>
                                        </div>
                                        <div className="botm">
                                            {
                                                v.rating ?
                                                    <p className="t1">작성일: {(v.review_date).substring(0, 10)}</p>
                                                    : <p className="t1">작성일: </p>
                                            }
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="btn-bot">
                        <button className="btn-pk s blue2 bdrs w50p"
                            onClick={() => {
                                if (count >= reviewList.length)
                                    alert("모든 리뷰를 확인했습니다.");
                                else setCount(prev => prev + 5);
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
    );
};

export default Product;
