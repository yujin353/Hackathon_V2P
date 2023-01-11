import React, { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Modal } from "../../component";
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


const MyKiin = () => {
    const navigate = useNavigate();
    const [myskinScore, SetMyskinScore] = useState([])
    const [myskinType, setMyskinType] = useState(undefined)
    const [bTarget, setBTarget] = useState(undefined)
    const btnRef1 = useRef(null)
    const btnRef2 = useRef(null)
    const btnRef3 = useRef(null)
    const btnRef4 = useRef(null)
    const btnRef5 = useRef(null)
    const btnRef6 = useRef(null)
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)

    const [used, setUsed] = useState([])
    const [wanted, setWanted] = useState([])
    const [userList, setUserList] = useState([])
    const [userIngredientGood, setUserIngredientGood] = useState([])
    const [userIngredientBad, setUserIngredientBad] = useState([])
    const [userClick, setUserClick] = useState(0)
    const [ingredientGoodCount, setIngredientGoodCount] = useState(10)
    const [ingredientBadCount, setIngredientBadCount] = useState(10)

    const [count, setCount] = useState(3)

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

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    useEffect(() => {
        let isMounted = true;
        $.ajax({
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/myskin/?search=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                const results = response.results[0]
                if(results === undefined)return;
                if(isMounted){
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
                }
            },
            error: (response) => console.log(response)
        });
        return () => isMounted = false
    }, [])

    useEffect(() => {
        let isMounted = true;
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/reviews-member-filter/?search=" + sessionStorage.getItem("user_pk"),
            /* my-ingredient  -- True: 잘 */
            success: (response) => {
                if(isMounted)
                    setUsed(response.results)
            },
            error: (response) => {console.log(response.results)}
        });
        return () => isMounted = false
    }, [])

    useEffect(() => {
        let isMounted = true;
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/product-like/?search=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                if(isMounted)
                    setWanted(response.results)
            },
            error: (response) => { console.log(response.results) }
        });
        return () => isMounted = false
    }, [])

    useEffect(() => {
        let isMounted = true;
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v2/getsameskintype?id=" + sessionStorage.getItem("user_pk"),
            success: response => {
                if(isMounted)
                    setUserList(JSON.parse(response.result))
                // console.log(response)
                // 잘 뜨면 api를 잘 불러왔다는 의미!
            } ,
            error: response => console.log(response)
        });
        return () => isMounted = false
    }, [])

    useEffect(() => {
        let pathname = $(window.location).attr('pathname');
        if (pathname.startsWith("/test")) $("#fmenu1").addClass("on");
        else if (pathname.startsWith("/mykiin")) $("#fmenu2").addClass("on");
        else if (pathname.startsWith("/main")) $("#fmenu3").addClass("on");
        else if (pathname.startsWith("/search")) $("#fmenu4").addClass("on");
        else if (pathname.startsWith("/mypage")) $("#fmenu5").addClass("on")
    }, [])

    useEffect(() => {
        let isMounted = true;
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/my-ingredient/?limit=1000000&offset=0&search=" + sessionStorage.getItem("user_pk"),
            success: response => {
                // console.log(response.results.map(x => x.member.length))

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
                    //console.log(bad)
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


    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">MY 키인</h2>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" onClick={() => navigate("/mypage/notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>

            <div id="container" className="container sub myk">
                <div className="inr-c">
                    <div className="hd_tit"><h2 className="h_tit1">내 피부타입 분석결과</h2></div>
                    <div className="area_type"><Radar data={data} options={options} /></div>
                    <div className="txt_box1 pr-mb1">
                        <p className="tit">내 피부 타입은 <strong className="c-blue">{myskinType ? myskinType : "undefined"}</strong> 입니다.</p>
                        <div className="box">
                            <p>부스팅 타겟은 <strong>{bTarget ? bTarget : "undefined"}</strong>입니다.
                                <button type="button" className="btn_bmore" ref={btnRef1}
                                        onClick={()=>{$(btnRef1.current).hide().parent().css("height", "auto");}}>
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
                                {used.map((v,i)=>{
                                    return (
                                        <li key={v+i}>
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
                                        <li key={v+i}>
                                            <div className="thumb">
                                                <Link to={`/main/products/${v.like_product.product_id}`}>
                                                    <span className="im" style={{backgroundImage: `url(${v.like_product.product_img_path})`}}></span>
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
                    <h2 className="h_tit1">나와 비슷한 피부를 가진 이웃</h2>
                    <div className="lst_list1">
                        <ul>
                            {userList.slice(0,count).map((v) => {
                                return (
                                    <li key={v.member.member_id}><Link to={`/mykiin/neighbor?id=${v.member.member_id}`} className="b">
                                        <div className="im"><img src={require("../../assets/images/common/img_nomem.jpg")}></img></div>
                                        <p className="t1"><strong>{v.member.username}</strong>님</p>
                                        <p className="t2"><span className="i-aft i_arr1">키인</span></p>
                                    </Link></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="btn-bot ta-c pr-mb2">
                    <span className="btn-pk s blue2 bdrs wid1" onClick={()=>setCount(prev=>prev+3)}>더보기</span>
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

export default MyKiin;