import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Modal } from '../../component';
import $ from "jquery"

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [input, setInput] = useState("")
    const [keywords, setKeywords] = useState(
        JSON.parse(localStorage.getItem('keywords')) || [])
    const [contents, setContents] = useState([])

    /* coloring bottom navigation bar icons */
    useEffect(() => {
        const pathname = location.pathname;
        if (pathname.startsWith("/test")) $("#fmenu1").addClass("on");
        else if (pathname.startsWith("/mykiin")) $("#fmenu2").addClass("on");
        else if (pathname.startsWith("/main")) $("#fmenu3").addClass("on");
        else if (pathname.startsWith("/search")) $("#fmenu4").addClass("on");
        else if (pathname.startsWith("/mypage")) $("#fmenu5").addClass("on")
    }, [])

    useEffect(() => {
        const textInput = input.trim()
        if(textInput!==""){
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
        }else{
            setContents([])
        }
    }, [input])

    const search = () => {
        const textInput = input.trim()
        if(textInput==="")
            alert("제품명을 입력해주세요.")
        else {
            const result = keywords.filter((element) => element !== input)
            localStorage.setItem('keywords', JSON.stringify([input, ...result]))
            navigate(`view?input=${input}`)
        }
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="hidden">검색</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => { navigate(-1)}}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="cen">
                        <input type="text" id="hd_search" className="inp_txt w100p" placeholder="제품을 검색해 보세요" 
                            value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                    </div>
                    <div className="rgh">
                        <button type="button" className="btn_sch_r" id="search_btn" 
                            onClick={()=>search()}>
                            <span className="i-set i_sch_bl">검색</span>
                        </button>
                    </div>
                </div>
            </header>
            <Modal open={contents.length} className="autocomplete">
                <ul>
                    {contents.map((v,i) => {
                        if(input != v){
                            return (
                                <li key={v + i} onClick={() => { setInput(v) }}>{v}</li>
                            )
                        }
                    })}
                </ul>
            </Modal>
            <div id="container" className="container search">
                <div className="inr-c">
                    <div className="area_search1">
                        <h2 className="h_tit1">최근 검색어</h2>
                        <div className="lst_comm pr-mb2">
                            {keywords.length ?
                                keywords.slice(0, 7).map((v,i)=>{
                                    return(
                                        <p key={v+i}
                                            style={{
                                                backgroundColor: 'rgba(20, 92, 255, 0.05)', height: "32px",
                                                textIndent: "10px", lineHeight: "32px"
                                            }}>
                                            <span onClick={() => { 
                                                setKeywords(prev => {
                                                    const result = prev.filter((element) => element !== v)
                                                    localStorage.setItem('keywords', JSON.stringify([v,...result]))
                                                    return [v,...result]
                                                })
                                                navigate(`view?input=${v}`) 
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
                                                        const result = prev.filter((element) => element !== v)
                                                        localStorage.setItem('keywords', JSON.stringify(result))
                                                        return result
                                                    })
                                                }}>
                                                <span>삭제</span>
                                            </button>
                                        </p>
                                    )
                                }) : <p className='notx'>최근 검색어가 없습니다.</p>
                            }
                        </div>

                        <h2 className="h_tit1">추천 검색어</h2>
                        <div className="lst_comm2" 
                            onClick={(e)=>{
                                const innerText = $(e.target).contents()[0].data
                                if(input !== innerText ) setInput(innerText||"")
                            }}>
                            <button className="btn-pk ss blue2 bdrs"><span>여드름케어</span></button>
                            <button className="btn-pk ss blue2 bdrs"><span>주름개선</span></button>
                            <button className="btn-pk ss blue2 bdrs"><span>히알루론산</span></button>
                            <button className="btn-pk ss blue2 bdrs"><span>미백</span></button>
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

export default Search