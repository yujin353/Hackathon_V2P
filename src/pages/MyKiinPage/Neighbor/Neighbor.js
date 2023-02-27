import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Graph, Ingredient, Used_Wanted_Product, Footer } from "../../../component";
import { useAccessTknRefresh } from "../../../hooks";
import $ from "jquery";

const Neighbor = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [username, setUsername] = useState();
    const userID = searchParams.get("id");
    const FbtnRef = useRef(null);
    const UbtnRef = useRef(null);
    const [reviewList, setReviewList] = useState([]);

    const rating_className = ["i_review_bad", "i_review_normal", "i_review_normal", "i_review_normal", "i_review_good"];
    const rating_txt = ["별로에요", "보통이에요", "보통이에요", "보통이에요", "잘 맞았어요"];

    useEffect(() => {
        if (!!userID === false)
            navigate("/mykiin");
        else
            window.scrollTo(0, 0);
    }, []);

    /* load page owner name */
    useEffect(() => {
        $.ajax({
            async: false, type: 'GET',
            url: "https://dev.odoc-api.com/member/member_display?member_id=" + userID,
            success: (response) => setUsername(response[0].username),
            error: (response) => navigate("/mykiin")
        });
    }, []);

    /* If I follow, show on the button */
    useEffect(() => {
        const accessTknRefresh = useAccessTknRefresh;
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member/follower_display?member_id=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
            success: (response) => {
                let subscribing = false;
                response.map((v) => {
                    if (v.following_member.member_id.toString() === userID)
                        subscribing = true;
                });
                if (subscribing) {
                    $(FbtnRef.current).hide();
                    $(UbtnRef.current).show();
                } else {
                    $(FbtnRef.current).show();
                    $(UbtnRef.current).hide();
                }
            },
            error: (response) => console.log(response)
        });
    }, []);

    /* loading neighbor's review */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member_product/review_member?member_id=" + userID,
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
    }, []);

    /* retrieves user's favorite review information */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member_product/review_like_display?member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                response.forEach((v) => {
                    $("button[name=" + v.like_review.review_id + "]").addClass("on");
                });
            },
            error: (response) => {
                console.log(response);
            },
        });
    });

    /* function to calculate product fit */
    const productFit = (member_id, product_id) => {
        let result;
        $.ajax({
            async: false, type: "GET",
            url: `https://dev.odoc-api.com/recommendation/product_matching?member_id=${member_id}&product_id=${product_id}`,
            success: response => result = response.result,
            error: response => console.log(response)
        });
        return result;
    };

    /* add or delete friends user followed */
    const follow = () => {
        const accessTknRefresh = useAccessTknRefresh;
        $.ajax({
            async: true, type: "POST",
            url: "https://dev.odoc-api.com/member/follow",
            data: {
                "member_id": userID,
                "follow_member_id": sessionStorage.getItem("user_pk")
            },
            dataType: "json",
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
            success: (response) => {
                if (response.message === "follow")
                    alert('내가 구독한 친구에 추가되었습니다.');
                else if (response.message === "unfollow")
                    alert('팔로우를 취소했습니다.');
            },
            error: (response) => {
                console.log(response);
            },
        });
    };

    /* add or delete user like review */
    const likeReview = (review_id) => {
        const element = document.getElementById(review_id);
        const accessTknRefresh = useAccessTknRefresh;
        $.ajax({
            async: true,
            type: "POST",
            url: "https://dev.odoc-api.com/member_product/review_like",
            data: {
                "review_id": review_id,
                "member_id": sessionStorage.getItem("user_pk")
            },
            dataType: "json",
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
            success: function (response) {
                if (response.message == "LIKE") alert("관심리뷰에 추가되었습니다.");
                else alert("관심리뷰에서 제거되었습니다.");
            },
            error: (response) => console.log(response),
        });
        $(element).toggleClass("off on");
    };

    const reportReview = (review_id) => {
        const accessTknRefresh = useAccessTknRefresh;
        if (window.confirm("정말 신고하시겠습니까?") === true) {
            $.ajax({
                async: true, type: "POST",
                url: "https://dev.odoc-api.com/member_product/review_report",
                data: {
                    "review_id": review_id,
                    "member_id": sessionStorage.getItem("user_pk")
                },
                dataType: "json",
                beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
                success: (response) => {
                    if (response.message === "REPORT") alert("정상적으로 신고 접수 되었습니다.");
                    else alert("이미 신고 접수 되었습니다.");
                },
                error: (response) => console.log(response),
            });
        } else return;
    };

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit ty2"><strong className="c-blue">{username}</strong>님의 키인</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh" id="top_head">
                        <button type="button" className="btn-pk ss blue2 bdrs" ref={FbtnRef}
                            onClick={() => {
                                follow();
                                $(FbtnRef.current).hide();
                                $(UbtnRef.current).show();
                            }}>
                            <span>팔로우</span>
                        </button>
                        <button type="button" className="btn-pk ss blue bdrs" ref={UbtnRef}
                            onClick={() => {
                                follow();
                                $(FbtnRef.current).show();
                                $(UbtnRef.current).hide();
                            }}>
                            <span>팔로잉</span>
                        </button>
                        {/* <button type="button" className="btn_alram on" 
                            onClick={() => navigate("/mypage/notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>
            <div id="container" className="container sub myk">
                <div className="inr-c">
                    <div className="hd_tit"><h2 className="h_tit1">피부타입 분석결과</h2></div>

                    <Graph userPK={userID} />
                    <Ingredient userPK={userID} />
                    <Used_Wanted_Product userPK={userID} />

                    <div className="hd_tit">
                        <h2 className="h_tit1"><strong className="c-blue">{username}</strong>님이 작성한 리뷰</h2>
                    </div>
                    <div className="inr-c">
                        <div className="lst_review line">
                            {reviewList.map((v) => {
                                const rand_simil = productFit(v.member.member_id, v.product.product_id);
                                return (
                                    <div className="col" key={v.review_id}>
                                        <div className="lst_prd2">
                                            <Link to={`/main/products/${v.product.product_id}`} className="b">
                                                <div className="thumb"><span className="im" style={{ backgroundImage: `url(${v.product.product_img_path})` }}></span></div>
                                            </Link>
                                                <div className="txt">
                                                    <Link to={`/main/products/${v.product.product_id}`} className="b">
                                                        <p className="t1">{v.product.brand.brand_name}</p>
                                                        <p className="t2">{v.product.product_name}</p>
                                                    </Link>
                                                    <button type="button" className="btn_favorit" id={v.review_id}
                                                            name={v.review_id} onClick={() => likeReview(v.review_id)}>
                                                        <span className="i-set i_favorit">좋아요</span>
                                                    </button>
                                                </div>
                                        </div>
                                        {/*<br />*/}
                                        {/*<div className="tit">*/}
                                            {/*<div className="thumb"><span><img src={require("../../../assets/images/common/img_nomem.jpg")}></img></span></div>*/}
                                            {/*<p className="h1">{v.member.username}</p>*/}
                                            {/*<p className="t1">피부 유사도 <span className="c-blue">{rand_simil}</span></p>*/}
                                            {/*<div className="bar_b"><span style={{ width: rand_simil }}></span></div>*/}
                                            {/*<button type="button" className="btn_favorit" id={v.review_id}*/}
                                            {/*    name={v.review_id} onClick={() => likeReview(v.review_id)}>*/}
                                            {/*    <span className="i-set i_favorit">좋아요</span>*/}
                                            {/*</button>*/}
                                        {/*</div>*/}
                                        <div className="txt_box1">
                                            <div className="box">
                                                <p className="t"><span className={`i-aft ${rating_className[v.rating - 1]} sm`}>{rating_txt[v.rating - 1]}</span></p>
                                                <p style={{ wordWrap: 'break-word' }}>{v.review_content ? v.review_content : null}</p>
                                                <button type="button" onClick={() => reportReview(v.review_id)} className="btr"><span className="i-aft i_report">신고하기</span></button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="btn-bot">
                                <Link to="/main/ranking" className="btn-pk s blue2 bdrs w100p"><span>제품 보러가기</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default Neighbor;
