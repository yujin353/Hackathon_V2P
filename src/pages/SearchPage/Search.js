import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import cookies from "react-cookies";
// import { Modal } from '../../component';
import { Footer } from "../../component";
import { useAccessTknRefresh } from "../../hooks";
import $ from "jquery";

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [input, setInput] = useState("");
    const [keywords, setKeywords] = useState(cookies.load('keywords') ? cookies.load('keywords') : []);
    // const [contents, setContents] = useState([])
    const [count, setCount] = useState(1);
    const [recommend, setRecommend] = useState([]);
    let [likeProducts, setLikeProducts] = useState([]);
    const [after, setAfter] = useState("");
    let latestLikeProducts = useRef(likeProducts);
    const accessTknRefresh = useAccessTknRefresh();

    /* coloring bottom navigation bar icons */
    useEffect(() => {
        const pathname = location.pathname;
        if (pathname.startsWith("/test")) $("#fmenu1").addClass("on");
        else if (pathname.startsWith("/mykiin")) $("#fmenu2").addClass("on");
        else if (pathname.startsWith("/main")) $("#fmenu3").addClass("on");
        else if (pathname.startsWith("/search")) $("#fmenu4").addClass("on");
        else if (pathname.startsWith("/mypage")) $("#fmenu5").addClass("on");
    }, []);

    // /* recommend search */
    // useEffect(() => {
    //     const textInput = input.trim()
    //     if(textInput!==""){
    //         $.ajax({
    //             async: false, type: 'GET',
    //             // url: "https://api.odoc-api.com/api/v1/products/?limit=5&offset=0&search=" + input,
    //             url: "https://api.odoc-api.com/api/v2/search?word="+input,
    //             success: (response) => {
    //                 setContents(() => {
    //                     const result = []
    //                     response.results.map((v) => {
    //                         result.push(v.product_name)
    //                     })
    //                     // console.log(result)
    //                     return result;
    //                 })
    //             },
    //             error: (response) => console.log(response)
    //         });
    //     }else{
    //         setContents([])
    //     }
    // }, [input])

    /* product recommendation */
    useEffect(() => {
        $.ajax({
            async: true, type: 'GET',
            url: "https://dev.odoc-api.com/product/product_random_display",// + "&member_id=" + sessionStorage.getItem("user_pk"),
            // beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh),
            success: (response) => setRecommend(response.results),
            error: (response) => console.log(response)
        });
    }, []);

    useEffect(() => {
        if (after !== '') navigate(`view?input=${after}`);
    }, [after]);


    const search = () => {
        const textInput = input.trim();
        if (textInput === "")
            alert("제품명을 입력해주세요.");
        else {
            let day = new Date();
            day.setDate(day.getDate() + 7);
            const result = keywords.filter((element) => element !== input);
            cookies.save('keywords', JSON.stringify([input, ...result]), { expires: day });
            navigate(`view?input=${input}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') search();
    };

    /* 좋아요 버튼 구현 */
    /* retrieves user's favorite product */
    useEffect(() => {
        let isMounted = true;
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member_product/product_like_display?member_id=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh),
            success: (response) => {
                response.map((v) => {
                    const product_id = v.like_product.product_id;
                    const element = document.getElementsByName(product_id);
                    $(element).addClass("on");
                });
            },
            error: (response) => {
                if (response.statusText === "Unauthorized") {
                    sessionStorage.setItem("access_token", accessTknRefresh());
                    navigate(0);
                }
            },
        });
        return () => isMounted = false;
    }, []);

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


    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="hidden">검색</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => { navigate(-1); }}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="cen">
                        <input type="text" id="hd_search" className="inp_txt w100p" placeholder="제품을 검색해 보세요"
                            value={input} onChange={(e) => { setInput(e.target.value); }} onKeyDown={handleKeyPress} />
                    </div>
                    <div className="rgh">
                        <button type="button" className="btn_sch_r" id="search_btn"
                            onClick={() => search()}>
                            <span className="i-set i_sch_bl">검색</span>
                        </button>
                    </div>
                </div>
            </header>
            {/* <Modal open={contents.length} className="autocomplete">
                <ul>
                    {contents.map((v,i) => {
                        if(input != v){
                            return (
                                <li key={v + i} onClick={() => { setInput(v) }}>{v}</li>
                            )
                        }
                    })}
                </ul>
            </Modal> */}
            <div id="container" className="container search">
                <div className="inr-c">
                    <div className="area_search1">
                        <h2 className="h_tit1">최근 검색어</h2>
                        <div className="lst_comm pr-mb2">
                            {keywords.length ?
                                keywords.slice(0, 5).map((v, i) => {
                                    return (
                                        <p key={v + i}
                                            style={{
                                                backgroundColor: 'rgba(20, 92, 255, 0.05)', height: "32px",
                                                textIndent: "10px", lineHeight: "32px"
                                            }}>
                                            <span onClick={() => {
                                                setKeywords(prev => {
                                                    let day = new Date();
                                                    day.setDate(day.getDate() + 7);
                                                    const result = prev.filter((element) => element !== v);
                                                    cookies.save('keywords', JSON.stringify([v, ...result]), { expires: day });
                                                    setAfter(v);
                                                    return [v, ...result];
                                                });
                                            }}>
                                                <FontAwesomeIcon icon={faSearch}
                                                    style={{
                                                        color: "rgba(0, 0, 0, 0.5)",
                                                        fontSize: "12",
                                                    }} />{` ${v}`}
                                            </span>
                                            <button type="button" className="btn_del_comm"
                                                onClick={() => {
                                                    setKeywords(prev => {
                                                        let day = new Date();
                                                        day.setDate(day.getDate() + 7);
                                                        const result = prev.filter((element) => element !== v);
                                                        cookies.save('keywords', JSON.stringify(result), { expires: day });
                                                        return result;
                                                    });
                                                }}>
                                                <span>삭제</span>
                                            </button>
                                        </p>
                                    );
                                }) : <p className='notx'>최근 검색어가 없습니다.</p>
                            }
                        </div>

                        {/* <h2 className="h_tit1">추천 검색어</h2>
                        <div className="lst_comm2" 
                            onClick={(e)=>{
                                const innerText = $(e.target).contents()[0].data
                                if(input !== innerText ) setInput(innerText||"")
                            }}>
                            <button className="btn-pk ss blue2 bdrs"><span>여드름케어</span></button>
                            <button className="btn-pk ss blue2 bdrs"><span>주름개선</span></button>
                            <button className="btn-pk ss blue2 bdrs"><span>히알루론산</span></button>
                            <button className="btn-pk ss blue2 bdrs"><span>미백</span></button>
                        </div> */}
                    </div>
                    <div className="area_search2">
                        <h2 className="h_tit1">이런 제품은 어떠세요?</h2>
                        <div className="lst_prd">
                            <ul onClick={() => setCount(count + 1)}>
                                {recommend.map((v) => {
                                    return (
                                        <li key={v.id}>
                                            <div className="thumb">
                                                <Link to={`../../main/products/${v.id}`}>
                                                    <img className="im" src={v.image} />
                                                </Link>
                                                <button
                                                    type="button" id={v.id}
                                                    className={likeState(v.id) ? "btn_favorit on" : "btn_favorit"}
                                                    name={v.id} onClick={() => likeProduct(v.id)}>
                                                    <span className="i-set i_favorit">좋아요</span>
                                                </button>
                                            </div>
                                            <div className="txt">
                                                <Link to={`../../main/products/${v.id}`}>
                                                    <p className="t1">{v.brand_name}</p>
                                                    <p className="t2">{v.name}</p>
                                                </Link>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        </div>
    );
};

export default Search;
