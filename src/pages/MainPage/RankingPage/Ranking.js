import React, {useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import {useAccessTknRefresh} from "../../../hooks";

const Ranking = () => {
    const navigate = useNavigate()
    const [skinTab, setSkinTab] = useState(true)
    const [essenceTab, setEssenceTab] = useState(false)
    const [lotionTab, setLotionTab] = useState(false)
    const [creamTab, setCreamTab] = useState(false)
    const [ranking1, setRanking1] = useState([])
    const [ranking2, setRanking2] = useState([])
    const [ranking3, setRanking3] = useState([])
    const [ranking4, setRanking4] = useState([])
    const [prevTabNum, setPrevTabNum] = useState(1)
    let [likeProducts, setLikeProducts] = useState([])
    let latestLikeProducts = useRef(likeProducts)
    const accessTknRefresh = useAccessTknRefresh()

    /* Get a list of skin/toner ranking products */
    useEffect(() => {
        $.ajax({
            async: true, type: 'GET',
            url: "https://api.odoc-api.com/api/v2/rankingbycategory?category=1" + "&member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => setRanking1(response.results),
            error: (response) => console.log(response)
        });
    }, [])

    /* Get a list of essence/ample ranking products */
    useEffect(() => {
        $.ajax({
            async: true, type: 'GET',
            url: "https://api.odoc-api.com/api/v2/rankingbycategory?category=2" + "&member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => setRanking2(response.results),
            error: (response) => console.log(response)
        });
    }, [])

    /* Get a list of lotion ranking products */
    useEffect(() => {
        $.ajax({
            async: true, type: 'GET',
            url: "https://api.odoc-api.com/api/v2/rankingbycategory?category=3" + "&member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => setRanking3(response.results),
            error: (response) => console.log(response)
        });
    }, [])

    /* Get a list of cream/balm ranking products */
    useEffect(() => {
        $.ajax({
            async: true, type: 'GET',
            url: "https://api.odoc-api.com/api/v2/rankingbycategory?category=4" + "&member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => setRanking4(response.results),
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
            $(document.getElementById("essencetab")).toggleClass("on off")
            setEssenceTab(!essenceTab)
        } else if (prevTabNum == 3) {
            $(document.getElementById("lotiontab")).toggleClass("on off")
            setLotionTab(!lotionTab)
        } else if (prevTabNum == 4) {
            $(document.getElementById("creamtab")).toggleClass("on off")
            setCreamTab((!creamTab))
        }

        if (tabNum == 1) {
            $(document.getElementById("skintab")).toggleClass("on off")
            setSkinTab(!skinTab)
            setPrevTabNum( 1)
        } else if (tabNum == 2) {
            $(document.getElementById("essencetab")).toggleClass("on off")
            setEssenceTab(!essenceTab)
            setPrevTabNum( 2)
        } else if (tabNum == 3) {
            $(document.getElementById("lotiontab")).toggleClass("on off")
            setLotionTab(!lotionTab)
            setPrevTabNum( 3)
        } else if (tabNum == 4) {
            $(document.getElementById("creamtab")).toggleClass("on off")
            setCreamTab((!creamTab))
            setPrevTabNum( 4)
        }
    }

    /* 좋아요 버튼 구현 */
    /* products user wants to try */
    useEffect(() => {
        let info;
        let like_product = []
        $.ajax({
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/product-like/?search=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                info = response.results;
                for (let i = 0; i < info.length; i++){
                    like_product = like_product.concat(info[i].like_product.product_id);
                    setLikeProducts = like_product;
                }
                if ( info.length == 0 ) latestLikeProducts.current = [];
                else latestLikeProducts.current = setLikeProducts;
            },
            error: (response) => { console.log(response.results) }
        });
    }, [])

    /* retrieves user's favorite product */
    useEffect(() => {
        let isMounted = true;
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/product-like/" + "?search=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
            success: (response) => {
                response.results.map((v) => {
                    const product_id = v.like_product.product_id
                    const element = document.getElementById(product_id)
                    $(element).addClass("on")
                })
            },
            error: (response) => {
                if (response.statusText === "Unauthorized") {
                    sessionStorage.setItem("access_token", accessTknRefresh())
                    navigate(0);
                }
            },
        })
        return () => isMounted = false
    }, [])

    /* find products user wants to try */
    const findLikeProducts = (element) => {
        let check = "fail";
        for (let i = 0; i < (latestLikeProducts.current).length; i++){
            if (element == latestLikeProducts.current[i]) {
                check = "success";
                break
            }
        }
        return check;
    }

    /* coloring products user wants to try */
    const likeState = (element) => {
        let isMounted = true;
        let check;
        if (element && isMounted) {
            check = findLikeProducts(element)
            if (check == "success") return true;
            else if (check == "fail") return false;
            else { console.log('element error'); return false; }
        }
    }

    const likeProduct = (product_id) => {
        $.ajax({
            async: true, type: "POST",
            url: "https://api.odoc-api.com/api/v2/like-product",
            data: { "like_product": product_id },
            dataType: "json",
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
            success: (response) => {
                const element = document.getElementById(product_id)
                $(element).toggleClass("on")
                if (response.message === "Like") {
                    alert("좋아하는 상품 목록에 추가되었습니다.");
                    if (latestLikeProducts.current.length == 0) {
                        setLikeProducts = [];
                        setLikeProducts = setLikeProducts.concat(product_id);
                        latestLikeProducts.current = setLikeProducts
                    }
                    else latestLikeProducts.current = latestLikeProducts.current.concat(product_id)
                }
                else {
                    alert("좋아하는 상품 목록에서 제거되었습니다.");
                    latestLikeProducts.current = latestLikeProducts.current.filter( elem => elem !== product_id )
                }
                likeState(product_id)
            },
            error: (response) => console.log(response),
        });
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
                        <li id="essencetab" className="off">
                            <Link to="#tab2" onClick={(e) => {
                                e.preventDefault();
                                onClickTab(2)
                            }}><span>에센스·앰플</span></Link>
                        </li>
                        <li id="lotiontab" className="off">
                            <Link to="#tab3" onClick={(e) => {
                                e.preventDefault();
                                onClickTab(3)
                            }}><span>로션</span></Link>
                        </li>
                        <li id="creamtab" className="off">
                            <Link to="#tab4" onClick={(e) => {
                                e.preventDefault();
                                onClickTab(4)
                            }}><span>크림·밤</span></Link>
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
                                            <li key={v.ID}><Link to={`../../main/products/${v.ID}`}>
                                                    { index== 0 ? <div className="num"><span className="i-set i_rank1">1</span></div>
                                                        : index === 1 ? <div className="num"><span className="i-set i_rank2">2</span></div>
                                                            : index === 2 ? <div className="num"><span className="i-set i_rank3">3</span></div>
                                                                : <div className="num"><span className="i-set i_rank">{index+1}</span></div> }
                                                    <div className="thumb"><img className="im" src={v.Image} /></div>
                                                    <div className="txt">
                                                        <p className="t1">{v.Brand}</p>
                                                        <p className="t2">{v.Name}</p>
                                                        <p className="t1 mt20"><span className="i-aft i_star">{v.rating}</span></p>
                                                    </div>
                                                </Link>
                                                <button
                                                    type="button" id={v.ID}
                                                    className={ likeState(v.ID) ? "btn_favorit on" : "btn_favorit" }
                                                    name={v.ID} onClick={() => likeProduct(v.ID)}>
                                                    <span className="i-set i_favorit">좋아요</span>
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            : essenceTab ?
                            <div id="tab2" className="lst_prd2 ranking">
                                <ul className="ranking_essence">
                                    { ranking2.map((v, index) => {
                                        return (
                                            <li key={v.ID}><Link to={`../../main/products/${v.ID}`}>
                                                { index== 0 ? <div className="num"><span className="i-set i_rank1">1</span></div>
                                                    : index === 1 ? <div className="num"><span className="i-set i_rank2">2</span></div>
                                                        : index === 2 ? <div className="num"><span className="i-set i_rank3">3</span></div>
                                                            : <div className="num"><span className="i-set i_rank">{index+1}</span></div> }
                                                <div className="thumb"><img className="im" src={v.Image} /></div>
                                                <div className="txt">
                                                    <p className="t1">{v.Brand}</p>
                                                    <p className="t2">{v.Name}</p>
                                                    <p className="t1 mt20"><span className="i-aft i_star">{v.rating}</span></p>
                                                </div>
                                            </Link>
                                            <button
                                                type="button" id={v.ID}
                                                className={ likeState(v.ID) ? "btn_favorit on" : "btn_favorit" }
                                                name={v.ID} onClick={() => likeProduct(v.ID)}>
                                                <span className="i-set i_favorit">좋아요</span>
                                            </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            : lotionTab ?
                                <div id="tab3" className="lst_prd2 ranking">
                                    <ul className="ranking_lotion">
                                        { ranking3.map((v, index) => {
                                            return (
                                                <li key={v.ID}><Link to={`../../main/products/${v.ID}`}>
                                                    { index== 0 ? <div className="num"><span className="i-set i_rank1">1</span></div>
                                                        : index === 1 ? <div className="num"><span className="i-set i_rank2">2</span></div>
                                                            : index === 2 ? <div className="num"><span className="i-set i_rank3">3</span></div>
                                                                : <div className="num"><span className="i-set i_rank">{index+1}</span></div> }
                                                    <div className="thumb"><img className="im" src={v.Image} /></div>
                                                    <div className="txt">
                                                        <p className="t1">{v.Brand}</p>
                                                        <p className="t2">{v.Name}</p>
                                                        <p className="t1 mt20"><span className="i-aft i_star">{v.rating}</span></p>
                                                    </div>
                                                </Link>
                                                <button
                                                    type="button" id={v.ID}
                                                    className={ likeState(v.ID) ? "btn_favorit on" : "btn_favorit" }
                                                    name={v.ID} onClick={() => likeProduct(v.ID)}>
                                                    <span className="i-set i_favorit">좋아요</span>
                                                </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                :
                                <div id="tab4" className="lst_prd2 ranking">
                                    <ul className="ranking_cream">
                                        { ranking4.map((v, index) => {
                                            return (
                                                <li key={v.ID}><Link to={`../../main/products/${v.ID}`}>
                                                    { index== 0 ? <div className="num"><span className="i-set i_rank1">1</span></div>
                                                        : index === 1 ? <div className="num"><span className="i-set i_rank2">2</span></div>
                                                            : index === 2 ? <div className="num"><span className="i-set i_rank3">3</span></div>
                                                                : <div className="num"><span className="i-set i_rank">{index+1}</span></div> }
                                                    <div className="thumb"><img className="im" src={v.Image} /></div>
                                                    <div className="txt">
                                                        <p className="t1">{v.Brand}</p>
                                                        <p className="t2">{v.Name}</p>
                                                        <p className="t1 mt20"><span className="i-aft i_star">{v.rating}</span></p>
                                                    </div>
                                                </Link>
                                                <button
                                                    type="button" id={v.ID}
                                                    className={ likeState(v.ID) ? "btn_favorit on" : "btn_favorit" }
                                                    name={v.ID} onClick={() => likeProduct(v.ID)}>
                                                    <span className="i-set i_favorit">좋아요</span>
                                                </button>
                                                </li>
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