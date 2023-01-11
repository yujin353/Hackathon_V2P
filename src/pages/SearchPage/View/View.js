import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from '../../../component';
import $ from "jquery"

const View = () =>{
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [input, setInput] = useState(searchParams.get("input"))
    const [results, setResults] = useState([])
    const [keywords,] = useState(
        JSON.parse(localStorage.getItem('keywords')) || [])
    const [empty, setEmpty] = useState(false)
    const [searchPressed, setSearchPressed] = useState(false)
    const [contents, setContents] = useState([])
    const [count, setCount] = useState(1)

    useEffect(() => {
        $.ajax({
            async: false, type: 'GET',
            url: "https://api.odoc-api.com/api/v1/products/" + "?search=" + input,
            success: (response) => {
                if(response.results.length === 0)setEmpty(true)
                setResults(response.results)
            },
            error: (response) => console.log(response)
        });
    }, [searchPressed])

    useEffect(() => {
        setSearchPressed(false)
        if (input.trim() !== "") {
            $.ajax({
                async: false, type: 'GET',
                url: "https://api.odoc-api.com/api/v1/products/" + "?limit=5&offset=0&search=" + input,
                // url: "https://api.odoc-api.com/api/v2/search"+"?limit=5&offset=0&word="+input,
                success: (response) => {
                    // console.log(response)
                    setContents(() => {
                        const result = []
                        response.results.map((v) => {
                            result.push(v.product_name)
                        })
                        // console.log(result)
                        return result;
                    })
                },
                error: (response) => console.log(response)
            });
        } else {
            setContents([])
        }
    }, [input])

    useEffect(() => {
        setContents([])
    }, [])

    const search = () => {
        setSearchParams({ input: input })
        if (input.trim() === "") {
            setEmpty(true)
        } else {
            setEmpty(false)
            const result = keywords.filter((element) => element !== input)
            localStorage.setItem('keywords', JSON.stringify([input, ...result]))
        }
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="hidden">검색</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" 
                            onClick={() => {
                                navigate(-1 * count)
                            }}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="cen">
                        <input type="text" id="hd_search" className="inp_txt w100p" placeholder="제품을 검색해 보세요"
                            value={input} onChange={(e) => { setInput(e.target.value) }}/>
                    </div>
                    <div className="rgh">
                        <button type="button" className="btn_sch_r" id="search_btn"
                            onClick={() => {
                                setSearchPressed(!searchPressed)
                                setCount(count + 1)
                                search()
                            }}>
                            <span className="i-set i_sch_bl">검색</span>
                        </button>
                    </div>
                </div>
            </header>
            <Modal open={contents.length && !searchPressed} className="autocomplete">
                <ul>
                    {contents.map((v,i) => {
                        if (input.trim() != v) {
                            return (
                                <li key={v + i} onClick={() => { setInput(v) }}>{v}</li>
                            )
                        }
                    })}
                </ul>
            </Modal>
            <div id="container" className="container search">
                <div className="inr-c">
                    {!empty ?
                        <div className="area_search1">
                            <div className="lst_prd2">
                                <h2 className="h_tit2"><span className="c-blue">{results.length}개</span>의 검색결과가 있습니다.</h2>
                                <ul id="prod_list">
                                    {results.map((v) => {
                                        return (
                                            <li className="prod" key={v.product_id}><Link to={`/main/products/${v.product_id}`}>
                                                <div className="thumb"><span className="im" style={{ backgroundImage: `url(${v.product_img_path})` }}></span></div>
                                                <div className="txt">
                                                    <p className="t1">{v.brand.brand_name}</p>
                                                    <p className="t2">{v.product_name}</p>
                                                    <p className="t1 mt20"><span className="i-aft i_star">4.6</span></p>
                                                </div>
                                            </Link></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div> :
                        <div className="area_search2">
                            <p className="notx pr-mb2" id="no_result"> 검색 결과가 없습니다.</p>
                            <h2 className="h_tit1">이런 제품은 어떠세요?</h2>
                            <div className="lst_prd">
                                <ul onClick={()=>setCount(count+1)}>
                                    <li>
                                        <div className="thumb">
                                            <Link to="#"><img className="im" src={require("../../../assets/images/tmp_prd.jpg")} /></Link>
                                            {/* <button type="button" className="btn_favorit off"><span className="i-set i_favorit">좋아요</span></button> */}
                                        </div>
                                        <div className="txt"><Link to="#">
                                            <p className="t1">Test Brand1</p>
                                            <p className="t2">Test Product1</p>
                                        </Link></div>
                                    </li>
                                    <li>
                                        <div className="thumb">
                                            <Link to="#"><img className="im" src={require("../../../assets/images/tmp_prd.jpg")} /></Link>
                                            {/* <button type="button" className="btn_favorit off"><span className="i-set i_favorit">좋아요</span></button> */}
                                        </div>
                                        <div className="txt"><Link to="#">
                                            <p className="t1">Test Brand2</p>
                                            <p className="t2">Test Product2</p>
                                        </Link></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default View;