import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";

const Ranking = () => {
    const navigate = useNavigate()
    const [skinTab, setSkinTab] = useState(true)
    const [creamTab, setCreamTab] = useState(false)
    const [oilTab, setOilTab] = useState(false)
    const [serumTab, setSerumTab] = useState(false)
    const [ranking1, setRanking1] = useState([])
    const [ranking2, setRanking2] = useState([])
    const [ranking3, setRanking3] = useState([])
    const [ranking4, setRanking4] = useState([])
    const [prevTabNum, setPrevTabNum] = useState(1)

    /* Get a list of skin/toner ranking products */
    useEffect(() => {
        $.ajax({
            async: true, type: 'GET',
            url: "https://api.odoc-api.com/api/v2/rankingbycategory?category=1" + "&member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                setRanking1(response.results)
            },
            error: (response) => console.log(response)
        });
    }, [])

    /* Get a list of cream ranking products */
    useEffect(() => {
        $.ajax({
            async: true, type: 'GET',
            url: "https://api.odoc-api.com/api/v2/rankingbycategory?category=2" + "&member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                setRanking2(response.results)
            },
            error: (response) => console.log(response)
        });
    }, [])

    /* Get a list of oil ranking products */
    useEffect(() => {
        $.ajax({
            async: true, type: 'GET',
            url: "https://api.odoc-api.com/api/v2/rankingbycategory?category=3" + "&member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                setRanking3(response.results)
            },
            error: (response) => console.log(response)
        });
    }, [])

    /* Get a list of serum/essence ranking products */
    useEffect(() => {
        $.ajax({
            async: true, type: 'GET',
            url: "https://api.odoc-api.com/api/v2/rankingbycategory?category=4" + "&member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                setRanking4(response.results)
            },
            error: (response) => console.log(response)
        });
    }, [])

    /* coloring bar icons */
    const onClickTab = (tabNum) => {
        if (prevTabNum == tabNum) return

        if (prevTabNum == 1) {
            $(document.getElementById("skintab")).toggleClass("on off")
            setSkinTab(!skinTab)
        } else if (prevTabNum == 2) {
            $(document.getElementById("creamtab")).toggleClass("on off")
            setCreamTab(!creamTab)
        } else if (prevTabNum == 3) {
            $(document.getElementById("oiltab")).toggleClass("on off")
            setOilTab(!oilTab)
        } else if (prevTabNum == 4) {
            $(document.getElementById("serumtab")).toggleClass("on off")
            setSerumTab((!serumTab))
        }

        if (tabNum == 1) {
            $(document.getElementById("skintab")).toggleClass("on off")
            setSkinTab(!skinTab)
            setPrevTabNum( 1)
        } else if (tabNum == 2) {
            $(document.getElementById("creamtab")).toggleClass("on off")
            setCreamTab(!creamTab)
            setPrevTabNum( 2)
        } else if (tabNum == 3) {
            $(document.getElementById("oiltab")).toggleClass("on off")
            setOilTab(!oilTab)
            setPrevTabNum( 3)
        } else if (tabNum == 4) {
            $(document.getElementById("serumtab")).toggleClass("on off")
            setSerumTab((!serumTab))
            setPrevTabNum( 4)
        }
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">카페고리별 상품 랭킹</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => navigate(-1)}>
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
            <div id="container" className="container sub ranking">
                <div className="top_menu">
                    <ul className="inr-c">
                        <li id="skintab" className="on">
                            <Link to="#tab1" onClick={(e)=>{
                                e.preventDefault();
                                onClickTab(1)
                            }}><span>스킨·토너</span></Link>
                        </li>
                        <li id="creamtab" className="off">
                            <Link to="#tab2" onClick={(e) => {
                                e.preventDefault();
                                onClickTab(2)
                            }}><span>크림</span></Link>
                        </li>
                        <li id="oiltab" className="off">
                            <Link to="#tab3" onClick={(e) => {
                                e.preventDefault();
                                onClickTab(3)
                            }}><span>오일</span></Link>
                        </li>
                        <li id="serumtab" className="off">
                            <Link to="#tab4" onClick={(e) => {
                                e.preventDefault();
                                onClickTab(4)
                            }}><span>세럼·에센스</span></Link>
                        </li>
                    </ul>
                </div>
                <div className="inr-c">
                    {
                        skinTab ?
                            <div id="tab1" className="lst_prd2 ranking">
                                <ul className="ranking_skin">
                                    { ranking1.map((v, index) => {
                                        return (
                                            <li key={index}><Link to={`../../main/products/${v.ID}`}>
                                                { index== 0 ? <div className="num"><span className="i-set i_rank1">1</span></div>
                                                    : index === 1 ? <div className="num"><span className="i-set i_rank2">2</span></div>
                                                        : index === 2 ? <div className="num"><span className="i-set i_rank3">3</span></div>
                                                            : <div className="num"><span className="i-set i_rank">(index+1)</span></div> }
                                                <div className="thumb"><img className="im" src={v.Image} /></div>
                                                <div className="txt">
                                                    <p className="t1">{v.Brand}</p>
                                                    <p className="t2">{v.Name}</p>
                                                    <p className="t1 mt20"><span className="i-aft i_star">{v.rating}</span></p>
                                                </div>
                                            </Link></li>
                                        )
                                    })}
                                </ul>
                            </div>
                            : creamTab ?
                            <div id="tab2" className="lst_prd2 ranking">
                                <ul className="ranking_cream">
                                    { ranking2.map((v, index) => {
                                        return (
                                            <li key={index}><Link to={`../../main/products/${v.ID}`}>
                                                { index== 0 ? <div className="num"><span className="i-set i_rank1">1</span></div>
                                                    : index === 1 ? <div className="num"><span className="i-set i_rank2">2</span></div>
                                                        : index === 2 ? <div className="num"><span className="i-set i_rank3">3</span></div>
                                                            : <div className="num"><span className="i-set i_rank">(index+1)</span></div> }
                                                <div className="thumb"><img className="im" src={v.Image} /></div>
                                                <div className="txt">
                                                    <p className="t1">{v.Brand}</p>
                                                    <p className="t2">{v.Name}</p>
                                                    <p className="t1 mt20"><span className="i-aft i_star">{v.rating}</span></p>
                                                </div>
                                            </Link></li>
                                        )
                                    })}
                                </ul>
                            </div>
                            : oilTab ?
                                <div id="tab3" className="lst_prd2 ranking">
                                    <ul className="ranking_oil">
                                        { ranking3.map((v, index) => {
                                            return (
                                                <li key={index}><Link to={`../../main/products/${v.ID}`}>
                                                    { index== 0 ? <div className="num"><span className="i-set i_rank1">1</span></div>
                                                        : index === 1 ? <div className="num"><span className="i-set i_rank2">2</span></div>
                                                            : index === 2 ? <div className="num"><span className="i-set i_rank3">3</span></div>
                                                                : <div className="num"><span className="i-set i_rank">(index+1)</span></div> }
                                                    <div className="thumb"><img className="im" src={v.Image} /></div>
                                                    <div className="txt">
                                                        <p className="t1">{v.Brand}</p>
                                                        <p className="t2">{v.Name}</p>
                                                        <p className="t1 mt20"><span className="i-aft i_star">{v.rating}</span></p>
                                                    </div>
                                                </Link></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                :
                                <div id="tab4" className="lst_prd2 ranking">
                                    <ul className="ranking_serum">
                                        { ranking4.map((v, index) => {
                                            return (
                                                <li key={index}><Link to={`../../main/products/${v.ID}`}>
                                                    { index== 0 ? <div className="num"><span className="i-set i_rank1">1</span></div>
                                                        : index === 1 ? <div className="num"><span className="i-set i_rank2">2</span></div>
                                                            : index === 2 ? <div className="num"><span className="i-set i_rank3">3</span></div>
                                                                : <div className="num"><span className="i-set i_rank">(index+1)</span></div> }
                                                    <div className="thumb"><img className="im" src={v.Image} /></div>
                                                    <div className="txt">
                                                        <p className="t1">{v.Brand}</p>
                                                        <p className="t2">{v.Name}</p>
                                                        <p className="t1 mt20"><span className="i-aft i_star">{v.rating}</span></p>
                                                    </div>
                                                </Link></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Ranking;