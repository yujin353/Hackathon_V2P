import React, { useState, useEffect, useRef } from "react"
import { Modal } from "../"
import $ from "jquery"

const Ingredient = ( {userPK} ) => {
    const btnRef2 = useRef(null)
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [userIngredientGood, setUserIngredientGood] = useState([])
    const [userIngredientBad, setUserIngredientBad] = useState([])
    const [userClick, setUserClick] = useState(0)
    const [ingredientGoodCount, setIngredientGoodCount] = useState(10)
    const [ingredientBadCount, setIngredientBadCount] = useState(10)

    /* set neighbor's Good, Bad Ingredient */
    useEffect(() => {
        let isMounted = true;
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/my-ingredient/?limit=1000000&offset=0&search=" + userPK,
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

    return (
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
    )
}

export default Ingredient;
