import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from "../../../component";
import { Graph } from "../../../component";
import { useAccessTknRefresh } from "../../../hooks";
import $ from "jquery"

const Neighbor = () => {
    const accessTknRefresh = useAccessTknRefresh();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [username, setUsername] = useState()
    const userID = searchParams.get("id")
    const FbtnRef = useRef(null)
    const UbtnRef = useRef(null)
    const btnRef1 = useRef(null)
    const btnRef2 = useRef(null)
    const btnRef3 = useRef(null)
    const btnRef4 = useRef(null)
    const btnRef5 = useRef(null)
    const btnRef6 = useRef(null)
    const [bScore, setBScore] = useState([])
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [used, setUsed] = useState([])
    const [wanted, setWanted] = useState([])
    const [reviewList, setReviewList] = useState([])
    const [userIngredientGood, setUserIngredientGood] = useState([])
    const [userIngredientBad, setUserIngredientBad] = useState([])
    const [userClick, setUserClick] = useState(0)
    const [ingredientGoodCount, setIngredientGoodCount] = useState(10)
    const [ingredientBadCount, setIngredientBadCount] = useState(10)

    const rating_className = ["i_review_bad", "i_review_normal", "i_review_normal", "i_review_normal", "i_review_good"]
    const rating_txt = ["별로에요", "보통이에요", "보통이에요", "보통이에요", "잘 맞았어요"]

    useEffect(() => {
        if(!!userID === false)
            navigate("/mykiin")
        else
            window.scrollTo(0,0);
    }, [])

    useEffect(() => {
        $.ajax({
            async: false, type: 'GET',
            url: "https://api.odoc-api.com/api/v1/members/" + userID + "/",
            success: (response) => setUsername(response.username),
            error: (response) => navigate("/mykiin")
        });
    }, [])

    useEffect(() => {
        $.ajax({
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/member-follower/" + "?search=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                let subscribing = false
                response.results.map((v) => {
                    if (v.follower_member.member_id.toString() === userID)
                        subscribing = true    
                })
                if(subscribing){
                    $(FbtnRef.current).hide()
                    $(UbtnRef.current).show()
                } else {
                    $(FbtnRef.current).show()
                    $(UbtnRef.current).hide()
                }
            },
            error: (response) => console.log(response)
        })
    }, [])

    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/reviews-member-filter/?search=" + userID,
            success: (response) => { 
                const result = []
                response.results.map(v=>{if(v.product!=null)result.push(v)})
                setUsed(result) 
            },
            error: (response) => console.log(response.results)
        });
    }, [])

    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/product-like/?search=" + userID,
            success: (response) => setWanted(response.results),
            error: (response) => console.log(response.results)
        });
    }, [])

    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/reviews-member-filter/" + "?search=" + userID,
            success: (response) => {
                const result = [];
                response.results.map((v) => {
                    if(v.product != null)
                        result.push(v)
                })
                setReviewList(result.reverse())
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
    })

    /* set neighbor's Good, Bad Ingredient */
    useEffect(() => {
        let isMounted = true;
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/my-ingredient/?limit=1000000&offset=0&search=" + userID,
            success: response => {

                const result = response.results;

                if(result === undefined)return;
                if(isMounted) {

                    const results = response.results
                    let good = []
                    let bad = []
                    for(let i=0; i<results.length; i++)
                    {
                        if(results[i].ingred_status == true)
                            good.push(results[i])
                        else
                            bad.push(results[i])
                    }
                    setUserIngredientBad(bad)
                    setUserIngredientGood(good)

                }
            },
            error: response => console.log(response.results)
        });
        return () => isMounted = false
    }, [])

    function handleButtonClick1(v, index) {
        setUserClick(index)
        setModal1(!modal1)
    }

    function handleButtonClick2(v, index) {
        setUserClick(index)
        setModal2(!modal2)
    }

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

    const follow = () => {
        $.ajax({
            async: true, type: "POST",
            url: "https://api.odoc-api.com/api/v2/follow",
            data: { "follow": userID }, 
            dataType: "json",
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
            success: (response) => console.log(response),
            error: (response) => {
                console.log(response)
                if (response.statusText == "Unauthorized") {
                    sessionStorage.setItem("access_token", accessTknRefresh())
                }
            },
        })
    }

    const likeReview = (review_id) => {
        const element = document.getElementById(review_id)
        $.ajax({
            async: true,
            type: "POST",
            url: "https://api.odoc-api.com/api/v2/like-review",
            data: { "like_review": review_id },
            dataType: "json",
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
            success: function (response) {
                if (response.message == "Like") alert("관심리뷰에 추가되었습니다.");
                else alert("관심리뷰에서 제거되었습니다.");
            },
            error: (response) => console.log(response),
        });
        $(element).toggleClass("off on");
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

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit ty2"><strong className="c-blue">{username}</strong>님의 키인</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" 
                            onClick={()=>navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh" id="top_head">
                        <button type="button" className="btn-pk ss blue2 bdrs" ref={FbtnRef}
                            onClick={()=>{
                                follow()
                                $(FbtnRef.current).hide()
                                $(UbtnRef.current).show()
                            }}>
                            <span>팔로우</span>
                        </button>
                        <button type="button" className="btn-pk ss blue bdrs" ref={UbtnRef}
                            onClick={()=>{
                                follow()
                                $(FbtnRef.current).show()
                                $(UbtnRef.current).hide()
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
                    <Graph userPK={userID}/>

                    <div className="pr-mb1">
                        <h2 className="h_tit1">나의 성분 리스트</h2>
                        <div className="box_cont">
                            <p className="h_tit2">나와 잘 맞는 성분</p>
                            <div className="lst_c ty1 pr-mb2">
                                {
                                    userIngredientGood.length != 0 ?
                                    <ul>
                                    {
                                        userIngredientGood.slice(0,ingredientGoodCount).map((v, index) => {
                                            return (
                                                <li key={v.ingredient.ingred_kor}>
                                                    <span onClick = {() => handleButtonClick1(v, index)}> {v.ingredient.ingred_kor} </span>
                                                </li>
                                            )
                                        })
                                    }
                                    </ul>
                                    :
                                    <li>나와 맞는 성분이 없습니다.</li>
                                }
                                {
                                    userIngredientGood.length != 0 ?
                                    <div className="btn-bot">
                                        <button className="btn-pk s blue2 bdrs w50p"
                                            onClick={()=>{
                                                if(ingredientGoodCount >= userIngredientGood.length)
                                                    alert("모든 성분을 확인했습니다.")
                                                else setIngredientGoodCount(prev=>prev+10)
                                            }}>
                                            <span>더보기</span>
                                        </button>
                                    </div>
                                    :
                                    null
                                }
                                <ul>
                                    <Modal open = {modal1} className="customOverlay">
                                        <div id="popIngredient" className="layerPopup pop_ingredient">
                                            <div className="popup">
                                                <div className="p_head botm">
                                                    <h2 className="hidden">성분상세</h2>
                                                    <button type="button" className="b-close btn_close" onClick={()=>setModal1()}>
                                                        <span>x</span>
                                                    </button>
                                                </div>
                                                <div className="bad_p_cont">
                                                    <p className="h1"> {userIngredientGood[userClick]?.ingredient.ingred_kor} </p>
                                                    <p className="h2">배합목적 : {userIngredientGood[userClick]?.ingredient.ingred_purpose} </p>
                                                    <p className="t1"> {userIngredientGood[userClick]?.ingredient.ingred_text} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                                </ul>
                            </div>
                            <p className="h_tit2">나와 안 맞는 성분</p>
                            <div className="lst_c ty2 pr-mb2">
                            {
                                    userIngredientBad.length != 0 ?
                                    <ul>
                                        {
                                            userIngredientBad.slice(0,ingredientBadCount).map((v, index) => {
                                                return (
                                                    <li key={v.ingredient.ingred_kor}>
                                                        <span onClick = {() => handleButtonClick2(v, index)}> {v.ingredient.ingred_kor} </span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    :
                                    <li>나와 안 맞는 성분이 없습니다.</li>
                                }
                                {
                                    userIngredientBad.length != 0 ?
                                    <div className="btn-bot">
                                        <button className="btn-pk s blue2 bdrs w50p"
                                            onClick={()=>{
                                                if(ingredientBadCount >= userIngredientBad.length)
                                                    alert("모든 성분을 확인했습니다.")
                                                else setIngredientBadCount(prev=>prev+10)
                                            }}>
                                            <span>더보기</span>
                                        </button>
                                    </div>
                                    :
                                    null
                                }
                                <ul>
                                    <Modal open = {modal2} className="customOverlay">
                                        <div id="popIngredient" className="layerPopup pop_ingredient">
                                            <div className="popup">
                                                <div className="p_head botm">
                                                    <h2 className="hidden">성분상세</h2>
                                                    <button type="button" className="b-close btn_close" onClick={()=>setModal2()}>
                                                        <span>x</span>
                                                    </button>
                                                </div>

                                                <div className="bad_p_cont">
                                                    <p className="h1"> {userIngredientBad[userClick]?.ingredient.ingred_kor} </p>
                                                    <p className="h2">배합목적 : {userIngredientBad[userClick]?.ingredient.ingred_purpose} </p>
                                                    <p className="t1"> {userIngredientBad[userClick]?.ingredient.ingred_text} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                                </ul>
                            </div>
                        </div>
                        <button type="button" id="btn_box_more" className="btn-pk s blue2 bdrs w100p" ref={btnRef2}
                            onClick={() => {
                                $(btnRef2.current).children(".i-aft").toggleClass("i_arr_b1 i_arr_b2")
                                if ($(btnRef2.current).children(".i-aft").contents()[0].data === "열기") {
                                    $(btnRef2.current).children(".i-aft").contents()[0].data = "닫기"
                                    $(btnRef2.current).prev().show()
                                } else {
                                    $(btnRef2.current).children(".i-aft").contents()[0].data = "열기"
                                    $(btnRef2.current).prev().hide()
                                }
                            }}>
                            <span className="i-aft i_arr_b1">열기</span>
                        </button>
                    </div>

                    <div className="pr-mb2">
                        <div className="hd_tit">
                            <h2 className="h_tit1">사용해본 제품</h2>
                            <p className="h_txt1"><span>내가 리뷰를 남긴 제품들이에요.<br />리뷰를 작성하고 화장대에 추가해 보세요.</span></p>
                            {/* <div className="rgh">
                                <button type="button" className="c-gray btn_prd_del" ref={btnRef3}
                                    onClick={() => {
                                        $(btnRef3.current)
                                            .hide()
                                            .next().show()
                                            .closest(".hd_tit").next(".lst_prd").find(".btn_del").show()
                                    }}>
                                    <span className="i-aft i_del">관리</span>
                                </button>
                                <button type="button" className="c-blue d-n btn_prd_save" ref={btnRef4}
                                    onClick={() => {
                                        $(btnRef4.current)
                                            .hide()
                                            .prev().show()
                                            .closest(".hd_tit").next(".lst_prd").find(".btn_del").hide()
                                    }}>
                                    <span className="i-aft i_chk">저장</span>
                                </button>
                            </div> */}
                        </div>

                        <div className="lst_prd">
                            <ul>
                                {used.map((v, i) => {
                                    return (
                                        <li key={v + i}>
                                            <div className="thumb">
                                                <Link to={`/main/products/${v.product.product_id}`}>
                                                    <span className="im" style={{ backgroundImage: `url(${v.product.product_img_path})` }}></span>
                                                </Link>
                                                <button type="button" className="btn_del">
                                                    <span className="i-set i_del_b">삭제</span>
                                                </button>
                                            </div>
                                            <div className="txt"><Link to={`/main/products/${v.product.product_id}`}>
                                                <p className="t1">{v.product.brand.brand_name}</p>
                                                <p className="t2">{v.product.product_name}</p>
                                            </Link></div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="pr-mb2">
                        <div className="hd_tit">
                            <h2 className="h_tit1">관심 제품</h2>
                            <p className="h_txt1"><span>내가 좋아요 누른 제품들이에요.</span></p>
                            {/* <div className="rgh">
                                <button type="button" className="c-gray btn_prd_del" ref={btnRef5}
                                    onClick={() => {
                                        $(btnRef5.current)
                                            .hide()
                                            .next().show()
                                            .closest(".hd_tit").next(".lst_prd").find(".btn_del").show()
                                    }}>
                                    <span className="i-aft i_del">관리</span>
                                </button>
                                <button type="button" className="c-blue d-n btn_prd_save" ref={btnRef6}
                                    onClick={() => {
                                        $(btnRef6.current)
                                            .hide()
                                            .prev().show()
                                            .closest(".hd_tit").next(".lst_prd").find(".btn_del").hide()
                                    }}>
                                    <span className="i-aft i_chk">저장</span>
                                </button>
                            </div> */}
                        </div>

                        <div className="lst_prd">
                            <ul>
                                {wanted.map((v, i) => {
                                    return (
                                        <li key={v + i}>
                                            <div className="thumb">
                                                <Link to={`/main/products/${v.like_product.product_id}`}>
                                                    <span className="im" style={{ backgroundImage: `url(${v.like_product.product_img_path})` }}></span>
                                                </Link>
                                                <button type="button" className="btn_del">
                                                    <span className="i-set i_del_b">삭제</span>
                                                </button>
                                            </div>
                                            <div className="txt"><Link to={`/main/products/${v.like_product.product_id}`}>
                                                <p className="t1">{v.like_product.brand.brand_name}</p>
                                                <p className="t2">{v.like_product.product_name}</p>
                                            </Link></div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="hd_tit">
                        <h2 className="h_tit1"><strong className="c-blue">{username}</strong>님이 작성한 리뷰</h2>
                    </div>
                    <div className="inr-c">
                        <div className="lst_review line">
                            {reviewList.map((v) => {
                                const rand_simil = productFit(v.member.member_id, v.product.product_id)
                                return (
                                    <div className="col" key={v.review_id}>
                                        <div className="lst_prd2">
                                            <Link to={`/main/products/${v.product.product_id}`} className="b">
                                                <div className="thumb"><span className="im" style={{backgroundImage: `url(${v.product.product_img_path})`}}></span></div>
                                                <div className="txt">
                                                    <p className="t1">{v.product.brand.brand_name}</p>
                                                    <p className="t2">{v.product.product_name}</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <br />
                                        <div className="tit">
                                            <div className="thumb"><span><img src={require("../../../assets/images/common/img_nomem.jpg")}></img></span></div>
                                                <p className="h1">{v.member.username}</p>
                                                <p className="t1">피부 유사도 <span className="c-blue">{rand_simil}</span></p>
                                                <div className="bar_b"><span style={{width: rand_simil}}></span></div>
                                                <button type="button" className="btn_favorit" id={v.review_id}
                                                    name={v.review_id} onClick={() => likeReview(v.review_id)}>
                                                    <span className="i-set i_favorit">좋아요</span>
                                                </button>
                                            </div>
                                        <div className="txt_box1">
                                            <div className="box">
                                                <p className="t"><span className={`i-aft ${rating_className[v.rating-1]} sm`}>{rating_txt[v.rating - 1]}</span></p>
                                                { v.review_article ? <p>{v.review_article.article_content}</p> : null }
                                                <button type="button" onClick={() => reportReview(v.review_id)} className="btr"><span className="i-aft i_report">신고하기</span></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="btn-bot">
                                <Link to="/main/ranking" className="btn-pk s blue2 bdrs w100p"><span>제품 보러가기</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer id="footer" className="footer">
                <ul className="div1">
                    <li className="off" id="fmenu1"><Link to="/test"><span className="i-aft i_fmenu1">평가</span></Link></li>
                    <li className="off" id="fmenu2"><Link to="/mykiin"><span className="i-aft i_fmenu2">MY키인</span></Link></li>
                    <li className="off" id="fmenu3"><Link to="/main"><span className="i-aft i_fmenu3">메인</span></Link></li>
                    <li className="off" id="fmenu4"><Link to="/search"><span className="i-aft i_fmenu4">제품검색</span></Link></li>
                    <li className="off" id="fmenu5"><Link to="/mypage"><span className="i-aft i_fmenu5">마이페이지</span></Link></li>
                </ul>
            </footer>
        </div>  
    )
}

export default Neighbor;