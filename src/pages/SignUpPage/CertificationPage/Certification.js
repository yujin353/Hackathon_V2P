import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Timer } from "../../../component";
import $ from "jquery";

const Certification = () => {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);
    const [timer, setTimer] = useState(false);
    const [phone, setPhone] = useState("");
    const [number, setNumber] = useState("");

    const sendingMessage = () => {
        if (phone === '01012345678') {
            alert(phone + "은 테스트용 번호입니다.\n인증번호로 111111을 입력하세요.");
            return;
        }
        $.ajax({
            async: true, type: 'POST',
            url: "https://dev.odoc-api.com/sms_auth/send",
            data: { "phone_number": phone }, dataType: 'json',
            success: (response) => {
                if (response.result === "SEND") {
                    setTimer(true);
                    document.getElementById("error_1").className = "t_error hidden";
                    document.getElementById("error_2").className = "t_error hidden";
                    alert(phone + "으로 인증번호를 발송하였습니다.\n인증번호는 5분간 유효합니다.");
                }
            },
            error: (response) => {
                setTimer(false);
                document.getElementById("error_1").className = "t_error";
                alert('핸드폰번호를 정확하게 입력해 주십시오.');
            }
        });
    };

    const verification = () => {
        if (phone === '01012345678') {
            alert("인증 완료되었습니다.");
            sessionStorage.setItem("phone_certification", true);
            setDisabled(false);
            return;
        }
        $.ajax({
            async: true, type: 'GET',
            url: "https://dev.odoc-api.com/sms_auth/verification?phone_number=" + phone + "&auth_number=" + number,
            dataType: 'json',
            success: (response) => {
                if (response.result === "SUCCESS") {
                    alert("인증 완료되었습니다.");
                    sessionStorage.setItem("phone_certification", true);
                    document.getElementById("error_2").className = "t_error hidden";
                    document.getElementById("comp_1").className = "t_comp";
                    setDisabled(false);
                    setTimer(false);
                }
                else alert("인증 실패하였습니다.");
            },
            error: (response) => {
                console.log(response)
                document.getElementById("error_2").className = "t_error";
                alert("잘못된 인증번호입니다. 인증번호를 확인한 다음 다시 입력해주세요.");
            }
        });
    };

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">휴대폰 인증</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub member">
                <div className="inr-c">
                    <div className="area_member">
                        <h2 className="h_tit1 mb60"><br />본인 확인을 위해 <br />휴대폰 인증을 완료해 주세요.</h2>
                        <div className="box-inp">
                            <div>
                                <label htmlFor="phone">핸드폰번호 입력</label>
                                <div className="ip">
                                    <input type="text" id="phone" name="phone" placeholder="' - '없이 입력해 주세요"
                                        value={phone} onChange={(e) => { setPhone(e.target.value); }}
                                        disabled={!disabled} />
                                    <div>
                                        <button type="button" className="btn-pk ss blue2 bdrs"
                                            onClick={() => {
                                                setTimer(false);
                                                sendingMessage();
                                            }}>
                                            <span>인증</span>
                                        </button>
                                    </div>
                                </div>
                                <p id="error_1" className="t_error hidden">핸드폰번호를 정확하게 입력해 주세요.</p>
                            </div>
                            {timer ? <Timer minute={5} second={0} setTimer={setTimer} /> : <></>}
                            <div>
                                <label htmlFor="number">인증번호</label>
                                <div className="ip">
                                    <input type="text" id="number" name="number" placeholder="인증번호를 입력해 주세요"
                                        value={number} onChange={(e) => { setNumber(e.target.value); }}
                                        disabled={!disabled} />
                                    <div>
                                        <button type="button" onClick={verification} className="btn-pk ss blue2 bdrs">
                                            <span>확인</span>
                                        </button>
                                    </div>
                                </div>
                                <p id="error_2" className="t_error hidden">인증번호를 정확하게 입력해 주세요.</p>
                                <p id="comp_1" className="t_comp hidden">인증 완료되었습니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fix_botm">
                <button type="button" className="btn-pk blue n" onClick={() => navigate("/policy")} disabled={disabled}>
                    <span>다음</span>
                </button>
            </div>
        </div>
    );
};

export default Certification;
