import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Timer } from "../../../component"
import $ from "jquery"

const FindId = () => {
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(true)
    const [timer, setTimer] = useState(false)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [number, setNumber] = useState("")
    const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

    const sendingMessage = () => {
        $.ajax({
            async: true, type: 'POST',
            url: "https://api.odoc-api.com/api/v2/smsauth",
            data: { "phone_number": phone }, dataType: 'json',
            success: (response) => {
                setTimer(true)
                document.getElementById("error_1").className = "t_error hidden"
                document.getElementById("error_2").className = "t_error hidden"
                alert(phone + "으로 인증번호를 발송하였습니다.\n인증번호는 5분간 유효합니다.")
            },
            error: (response) => {
                setTimer(false)
                document.getElementById("error_1").className = "t_error"
                alert('휴대폰 번호를 정확하게 입력해 주세요.')
            }
        });
    }

    const verification = () => {
        $.ajax({
            async: true, type: 'POST',
            url: "https://api.odoc-api.com/api/v2/verification",
            data: {
                "phone_number": phone,
                "auth_number": number,
            }, dataType: 'json',
            success: (response) => {
                if (response.message === "인증 완료되었습니다.") {
                    alert("인증 완료되었습니다.")
                    sessionStorage.setItem("phone_certification", true)
                    document.getElementById("error_2").className = "t_error hidden"
                    document.getElementById("comp_1").className = "t_comp"
                    setDisabled(false)
                    setTimer(false)
                }
                else alert("인증 실패하였습니다.")
            },
            error: (response) => {
                document.getElementById("error_2").className = "t_error"
                alert("잘못된 인증번호입니다. 인증번호를 확인한 다음 다시 입력해주세요.")
            }
        });
    }

    const sendResetMail = () =>{
        $.ajax({
            async:false, type:'POST',
            url: "https://api.odoc-api.com/rest_auth/password/reset/",
            data : { 
                "email" : email 
            }, dataType: 'json',
            success: (response) => {
                alert("비밀번호 초기화 메일이 전송되었습니다.\n로그인 화면으로 이동합니다.")
                navigate("/login")
                console.log(response)
            },
            error: (response) => console.log(response)
        })
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="hidden">아이디/비밀번호찾기</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                </div>
            </header>

            <div id="container" className="container sub member">
                <div className="inr-c">
                    <div className="area_member">
                        <h2 className="h_tit3">아이디/비밀번호 찾기 <strong>비밀번호 찾기</strong></h2>
                        <div className="box-inp">
                            <div>
                                <label htmlFor="id">찾고자 하는 아이디 입력</label>
                                <div className="ip">
                                    <input type="text" id="id" placeholder="이메일 주소를 정확하게 입력해 주세요" 
                                        value={email} onChange={(e)=>{
                                            document.getElementById("error_3").className = "hidden"
                                            setEmail(e.target.value)
                                        }}
                                        disabled={!disabled}/>
                                </div>
                                <p id="error_3" className="t_error hidden">이메일 주소를 정확하게 입력해주세요</p>
                            </div>
                            <div>
                                <label htmlFor="phone">가입시 입력한 휴대폰 번호</label>
                                <div className="ip">
                                    <input type="text" id="phone" placeholder="' - ' 없이 입력해 주세요" 
                                        value={phone} onChange={(e) => {
                                            document.getElementById("error_1").className = "hidden"
                                            setPhone(e.target.value)
                                        }}
                                        disabled={!disabled} />
                                    <div>
                                        <button type="button" className="btn-pk ss blue2 bdrs"
                                            onClick={()=>{
                                                if(emailRegex.test(email)){
                                                    document.getElementById("error_3").className = "hidden"
                                                    setTimer(false)
                                                    sendingMessage()
                                                }else{
                                                    alert("이메일 주소를 정확하게 입력해주세요.")
                                                    document.getElementById("error_3").className = "t_error"
                                                }
                                                
                                            }}>
                                            <span>인증</span>
                                        </button>
                                    </div>
                                </div>
                                <p id="error_1" className="t_error hidden">전화번호를 정확하게 입력해 주세요</p>
                            </div>
                            {timer ? <Timer minute={5} second={0} setTimer={setTimer} /> : <></>}
                            <div>
                                <label htmlFor="number">인증번호</label>
                                <div className="ip">
                                    <input type="text" id="number" placeholder="인증번호를 입력해 주세요" 
                                        value={number} onChange={(e)=>{setNumber(e.target.value)}}
                                        disabled={!disabled}/>
                                    <div>
                                        <button type="button" onClick={verification} className="btn-pk ss blue2 bdrs">
                                            <span>확인</span>
                                        </button>
                                    </div>
                                </div>
                                <p id="error_2" className="t_error hidden">인증번호를 정확하게 입력해 주세요</p>
                                <p id="comp_1" className="t_comp hidden">인증 완료되었습니다</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fix_botm">
                    <button type="button" className="btn-pk blue n" disabled={disabled}
                        onClick={() =>{
                            sendResetMail();
                        }}>
                        <span>다음</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FindId;