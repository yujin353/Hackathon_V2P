import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from "../../../component";
import { useAccessTknRefresh } from "../../../hooks";
import $ from "jquery"
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

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
    const [myskinScore, SetMyskinScore] = useState([])
    const [myskinType, setMyskinType] = useState()
    const [bScore, setBScore] = useState([])
    const [bTarget, setBTarget] = useState()
    const [modal1, setModal1] = useState(false)
    const [used, setUsed] = useState([])
    const [wanted, setWanted] = useState([])
    const [reviewList, setReviewList] = useState([])

    const rating_className = ["i_review_bad", "i_review_normal", "i_review_normal", "i_review_normal", "i_review_good"]
    const rating_txt = ["별로에요", "보통이에요", "보통이에요", "보통이에요", "잘 맞았어요"]
    const data = {
        labels: ['밸런싱', '견고성', '균일성', '탄력성', '안정성'],
        datasets: [
            {
                label: 'My Skin',
                data: myskinScore,
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                },
                grid: {
                    color: 'rgba(54, 162, 235, 0.2)',
                    // circular: true
                },
                pointLabels: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.8)",
                    // font: { size: 24 }
                },
                ticks: {
                    color: "rgba(0, 0, 0, 0.4)",
                },
                min: 0,
                max: 100,
                stepSize: 20
            }
        },
        plugins: {
            legend: {
                // position: "",
                fontColor: "red",
                fontSize: 10
            }
        },
        elements: {
            line: {
                borderWidth: 2
            }
        },
    }

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
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/myskin/?search=" + userID,
            success: (response) => {
                const results = response.results[0]
                if (results === undefined) return;
                SetMyskinScore(() => {
                    const result = []
                    const balance = 100 - (Math.abs(results.do_score - 10) / 6 * 100)
                    const robustness = 100 - (Math.abs(results.rs_score - 6) / 18 * 100)
                    const uniformity = 100 - (Math.abs(results.np_score - 4) / 12 * 100)
                    const resilience = 100 - (Math.abs(results.tw_score - 6) / 18 * 100)
                    const stability = results.target_id.target_score
                    result.push(balance)
                    result.push(robustness)
                    result.push(uniformity)
                    result.push(resilience)
                    result.push(stability)
                    return result;
                })
                setMyskinType(results.do_alphabet + results.rs_alphabet + results.np_alphabet + results.tw_alphabet)
                setBTarget(results.target_id.target_name)
            }, 
            error: (response) => console.log(response)
        });
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
                        <button type="button" className="btn_alram on" 
                            onClick={() => navigate("/mypage/notification")}>
                            <span className="i-set i_alram"></span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub myk">
                <div className="inr-c">
                    <div className="hd_tit"><h2 className="h_tit1">피부타입 분석결과</h2></div>
                    <div className="area_type"><Radar data={data} options={options} /></div>
                    <div className="txt_box1 pr-mb1">
                        <p className="tit">내 피부 타입은 <strong className="c-blue">{myskinType}</strong> 입니다.</p>
                        <div className="box">
                            <p>부스팅 타겟은 <strong>{bTarget}</strong>입니다.
                                <button type="button" className="btn_bmore" ref={btnRef1}
                                    onClick={() => { $(btnRef1.current).hide().parent().css("height", "auto"); }}>
                                    <span>자세히</span>
                                </button>
                            </p>
                        </div>
                    </div>

                    <div className="pr-mb1">
                        <h2 className="h_tit1">나의 성분 리스트</h2>
                        <div className="box_cont">
                            <p className="h_tit2">나와 잘 맞는 성분</p>
                            <div className="lst_c ty1 pr-mb2">
                                <ul>
                                    <li>
                                        <span onClick={() => setModal1(!modal1)}>헥산다이올</span>
                                        <Modal open={modal1} className="customOverlay">
                                            <div id="popIngredient" className="layerPopup pop_ingredient">
                                                <div className="popup">
                                                    <div className="p_head botm">
                                                        <h2 className="hidden">성분상세</h2>
                                                        <button type="button" className="b-close btn_close" onClick={() => setModal1(!modal1)}>
                                                            <span>x</span>
                                                        </button>
                                                    </div>

                                                    <div className="p_cont">
                                                        <p className="h1">부틸렌글라이콜</p>
                                                        <p className="h2">배합목적 : 착향제, 피부컨디셔닝제, 용제, 점도감소제</p>
                                                        <p className="t1">
                                                            부틸렌글라이콜은 옥수수오일, 포도주, 생선의간유, 해바라기씨오일, 토양효모 등의 발효 생성물에서 만들어진 성분입니다.<br />
                                                            부틸렌글라이콜은 무색의 단맛을 가지고 있으며 냄새가 거의 없는 맑은 액체입니다.<br />
                                                            또한, 1-3부탄디올 혹은 줄여서 1,3-BG 그리고 B-부틸렌글라이콜이라는 이름으로 불리기도 합니다.<br /><br />
                                                            한편, 화장품을 만들 때 부틸렌글라이콜은 전성분 표기에서 2~3번째 놓일 정도로 배합비율이 높은 편입니다.<br />
                                                            다른 특징으로 부틸렌글라이콜은 입자가 큰 유기체 알코올로 수분을 끌어당기는 보습제 역할을 합니다.<br />
                                                            이것은 끈적임과 자극이 적고 사용감이 가벼운편으로 주로 화장품의 모이스처라이저 제품에 사용됩니다.<br />
                                                            피부에 특별한 효과를 주기 위한 성분으로 건조하거나 손상된 피부를 개선, 피부탈락 감소, 유연성 회복을 위하여 사용
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                    </li>
                                    <li onClick={null}><span>폴리글레시릴</span></li>
                                    <li onClick={null}><span>이눌린라우릴카바메이트</span></li>
                                </ul>
                            </div>
                            <p className="h_tit2">나와 안 맞는 성분</p>
                            <div className="lst_c ty2 pr-mb2">
                                <ul>
                                    <li onClick={null}><span>헥산다이올</span></li>
                                    <li onClick={null}><span>폴리글레시릴</span></li>
                                    <li onClick={null}><span>이눌린라우릴카바메이트</span></li>
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
                            <div className="rgh">
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
                            </div>
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
                            <h2 className="h_tit1">써보고 싶은 제품</h2>
                            <p className="h_txt1"><span>내가 좋아요 누른 제품들이에요.</span></p>
                            <div className="rgh">
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
                            </div>
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
        </div>  
    )
}

export default Neighbor;