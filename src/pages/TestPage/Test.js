import React from 'react'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery'

const Test = () => {
    const navigate = useNavigate()

    const mySkinType = () => {
        $.ajax({
            async: true, type: 'GET',
            url: "https://api.odoc-api.com/api/v1/myskin/?search=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                if(response.count === 1){
                    alert("이미 스킨퀴즈가 완료되었습니다.\n메인화면으로 이동합니다.")
                    navigate("/main")
                }else navigate("question")
            },
            error: (response) => console.log(response)
        })
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="hidden">테스트</h2>
                    <button type="button" className="btn-back c-white"
                        onClick={()=>navigate(-1)}>
                        <span className="i-aft i_back">뒤로</span>
                    </button>
                </div>
            </header>
            <div id="container" className="container sub test">
                <div className="inr-c pt30">
                    <p className="tx_t1 mb40">
                        회원님의 피부타입 진단을 위한<br/>
                        간단한 스킨퀴즈를 시작합니다.<br/><br/>
                        약 <strong className="c-blue">5분</strong>정도 소요되며,<br/>
                        문항수는 <strong className="c-blue">20개</strong> 입니다.
                    </p>
                    <p className="tx_t1 c-blue">
                        <strong>검사를 토대로 회원님께 <br/>
                        딱 맞는 제품을 추천해 드릴게요!</strong>
                    </p>
                </div>
                <div className="fix_botm">
                    <button className="btn-pk blue n" onClick={()=> mySkinType()} >
                        <span>다음</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Test