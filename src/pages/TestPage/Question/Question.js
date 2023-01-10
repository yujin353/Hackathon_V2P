import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { SkinQuiz } from "./SkinQuiz";
import $ from "jquery"

const Question = () => {
    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const btnRef = useRef(null);
    const setting = {infinite: false}
    const [disabled, setDisabled] = useState(true)
    const [obj, setObj] = useState({ 
        "member": sessionStorage.getItem("user_pk") 
    })

    const submit = () => {
        console.log(obj)
        $.ajax({
            async: false, type: 'POST',
            url: "https://api.odoc-api.com/api/v1/testskin/",
            data: obj, dataType: 'json',
            success: response => {
                console.log(response)
                alert("스킨퀴즈가 완료되었습니다.\n마이키인 페이지로 이동합니다.")
                navigate("/mykiin")
            },
            error: response => console.log(response)
        })
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="hidden">테스트</h2>
                    <button type="button" 
                        onClick={()=>{if(window.confirm("이전 페이지로 이동하시겠습니까?\n작성 중인 내용이 저장되지 않고 사라집니다."))navigate(-1)}}>
                        <span className="i-aft i_back"></span>
                    </button>
                </div>
            </header>
            <div id="container" className="container sub test">
                <div className="inr-c">
                    <div className="slider1">
                        <Slider {...setting} ref={sliderRef}>
                            {SkinQuiz.map((v) => {
                                return (
                                    <div className="item" key={v}>
                                        <div className="area_test">
                                            <div className="area_test_tit">
                                                <div className="lft">
                                                    <h2 className="h1">
                                                        <span className="c-blue">{v.type1.split(" ")[0][0]}</span>
                                                        {v.type1.split(" ")[0].substring(1) + " or "}
                                                        <span className="c-blue">{v.type1.split(" ")[2][0]}</span>
                                                        {v.type1.split(" ")[2].substring(1)}
                                                    </h2>
                                                    <p>{v.type2}</p>
                                                </div>
                                                <div className="rgh"> {v.id} / {SkinQuiz.length} </div>
                                            </div>
                                            <div className="test_img"><img src={require(`../../../assets/images/skinquiz/Q${v.id < 10 ? "0" + v.id : v.id}.JPG`)} /></div>
                                            <p className="tit_q">Question {v.id}</p>
                                            <p className="tit"> {v.question} </p>
                                            <ul>
                                                {v.option.map((x, i)=>{
                                                    return(
                                                        <li key={x+i}>
                                                            <button id={`Q${v.id}_${i+1}`}type="button" className="btn" ref={btnRef}
                                                                onClick={()=>{
                                                                    setObj(prev =>{
                                                                        const result = prev
                                                                        result[`Q${v.id < 10 ? "0" + v.id : v.id}`] = i + 1
                                                                        return result
                                                                    })
                                                                    Object.keys(obj).length === 21 ? setDisabled(false) : setDisabled(true)
                                                                    const size = $(".area_test")[`${v.id-1}`].children[4].children.length
                                                                    for (let k = 0; k < size; k++) $(`#Q${v.id}_${k}`).removeClass("on")
                                                                    $(`#Q${v.id}_${i+1}`).addClass("on")
                                                                    sliderRef.current.slickNext()
                                                                }}>
                                                                <span>{x}</span>
                                                            </button>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })}   
                        </Slider>
                    </div>
                </div>
                <div>
                    <div className="fix_botm">
                        <button type="button" className="btn-pk blue n" disabled={disabled}
                            onClick={() => submit()}>
                            <span>스킨퀴즈 제출</span>
                        </button>
                    </div>
                </div> :
            </div>
        </div>
    )
}

export default Question;