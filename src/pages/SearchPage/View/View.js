import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import cookies from "react-cookies";
import { useAccessTknRefresh } from "../../../hooks";
// import { Modal } from '../../../component';
import { Footer } from "../../../component";
import $ from "jquery";

const View = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [input, setInput] = useState(searchParams.get("input"));
    const [results, setResults] = useState([]);
    const [keywords,] = useState(cookies.load('keywords') ? cookies.load('keywords') : []);
    const [empty, setEmpty] = useState(false);
    const [searchPressed, setSearchPressed] = useState(false);
    // const [contents, setContents] = useState([])
    const [count, setCount] = useState(1);
    const [recommend, setRecommend] = useState([]);
    let [likeProducts, setLikeProducts] = useState([]);
    let latestLikeProducts = useRef(likeProducts);

    useEffect(() => {
        $.ajax({
            async: false, type: 'GET',
            url: "https://dev.odoc-api.com/product/search?word=" + input,
            success: (response) => {
                if (response.result.length === 0) setEmpty(true);
                setResults(response.result);
            },
            error: (response) => console.log(response)
        });
    }, [searchPressed]);

    const matching = () => {

    };

    // /* autoSearchResults */
    // useEffect(() => {
    //     setSearchPressed(false)
    //     if (input.trim() !== "") {
    //         $.ajax({
    //             async: false, type: 'GET',
    //             url: "https://api.odoc-api.com/api/v1/products/?limit=5&offset=0&search=" + input,
    //             // url: "https://api.odoc-api.com/api/v2/search?limit=5&offset=0&word="+input,
    //             success: (response) => {
    //                 // console.log(response)
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
    //     } else {
    //         setContents([])
    //     }
    // }, [input])

    // useEffect(() => {
    //     setContents([])
    // }, [])

    /* recommend random products if no search results are found */
    useEffect(() => {
        $.ajax({
            async: true, type: 'GET',
            url: "https://dev.odoc-api.com/product/product_random_display",
            success: (response) => setRecommend(response.results),
            error: (response) => console.log(response)
        });
    }, []);

    const search = () => {
        setSearchParams({ input: input });
        if (input.trim() === "") {
            setEmpty(true);
        } else {
            setEmpty(false);
            let day = new Date();
            day.setDate(day.getDate() + 7);
            const result = keywords.filter((element) => element !== input);
            cookies.save('keywords', JSON.stringify([input, ...result]), { expires: day });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearchPressed(!searchPressed);
            setCount(count + 1);
            search();
        }
    };

    /* 좋아요 버튼 구현 */
    /* retrieves user's favorite product */
    useEffect(() => {
        let isMounted = true;
        const accessTknRefresh = useAccessTknRefresh;
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member_product/product_like_display?member_id=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
            success: (response) => {
                response.map((v) => {
                    const product_id = v.like_product.product_id;
                    const element = document.getElementsByName(product_id);
                    $(element).addClass("on");
                });
            },
            error: (response) => {
                console.log(response);
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
        const accessTknRefresh = useAccessTknRefresh;
        $.ajax({
            async: true, type: "POST",
            url: "https://dev.odoc-api.com/member_product/product_like",
            data: {
                "product_id": product_id,
                "member_id": sessionStorage.getItem("user_pk")
            },
            dataType: "json",
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
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
                        <button type="button" className="btn-back c-white"
                            onClick={() => {
                                navigate(-1 * count);
                            }}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="cen">
                        <input type="text" id="hd_search" className="inp_txt w100p" placeholder="제품을 검색해 보세요"
                            value={input} onChange={(e) => { setInput(e.target.value); }} onKeyDown={handleKeyPress} />
                    </div>
                    <div className="rgh">
                        <button type="button" className="btn_sch_r" id="search_btn"
                            onClick={() => {
                                setSearchPressed(!searchPressed);
                                setCount(count + 1);
                                search();
                            }}>
                            <span className="i-set i_sch_bl">검색</span>
                        </button>
                    </div>
                </div>
            </header>
            {/* <Modal open={contents.length && !searchPressed} className="autocomplete">
                <ul>
                    {contents.map((v,i) => {
                        if (input.trim() != v) {
                            return (
                                <li key={v + i} onClick={() => { setInput(v) }}>{v}</li>
                            )
                        }
                    })}
                </ul>
            </Modal> */}
            <div id="container" className="container search">
                <div className="inr-c">
                    {!empty ?
                        <div className="area_search1">
                            <div className="lst_prd2">
                                <h2 className="h_tit2"><span className="c-blue">{results.length}개</span>의 검색결과가 있습니다.</h2>
                                {/*<select className="select1 hd_ty2"*/}
                                {/*        onChange={(e) => {*/}
                                {/*            if (e.target.value == "abc") matching();*/}
                                {/*            else setSearchPressed(!searchPressed);*/}
                                {/*        }}>*/}
                                {/*    <option value="">정렬</option>*/}
                                {/*    <option value="abc">가나다 순</option>*/}
                                {/*    <option value="matching">피부매칭율 순</option>*/}
                                {/*</select>*/}
                                <ul id="prod_list">
                                    {results.map((v) => {
                                        return (
                                            <li className="prod" key={v.ID}>
                                                <div className="thumb">
                                                    <Link to={`/main/products/${v.ID}`}>
                                                        <span className="im" style={{ backgroundImage: `url(${v.Image})` }}></span>
                                                    </Link>
                                                    {/*<button*/}
                                                    {/*    type="button" id={v.ID}*/}
                                                    {/*    className={ likeState(v.ID) ? "btn_favorit on" : "btn_favorit" }*/}
                                                    {/*    name={v.ID} onClick={() => likeProduct(v.ID)}>*/}
                                                    {/*    <span className="i-set i_favorit">좋아요</span>*/}
                                                    {/*</button>*/}
                                                </div>
                                                <div className="txt">
                                                    <Link to={`/main/products/${v.ID}`}>
                                                        <p className="t1">{v.Brand}</p>
                                                        <p className="t2">{v.Name}</p>
                                                        {/* <p className="t1 mt20"><span className="i-aft i_star">4.6</span></p> */}
                                                    </Link>
                                                    <button
                                                        type="button" id={v.ID}
                                                        className={likeState(v.ID) ? "btn_favorit on" : "btn_favorit"}
                                                        name={v.ID} onClick={() => likeProduct(v.ID)}>
                                                        <span className="i-set i_favorit">좋아요</span>
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div> :
                        <div className="area_search2">
                            <p className="notx pr-mb2" id="no_result"> 검색 결과가 없습니다.</p>
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
                    }
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default View;
