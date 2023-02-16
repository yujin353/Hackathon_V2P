import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../../../hooks";
import $ from "jquery";

const NewPW = () => {
    const navigate = useNavigate();
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        onChangePassword();
        if ($("#pwdok").hasClass("t_comp")) setDisabled(false);
        else setDisabled(true);
    }, [password1, password2]);

    const onChangePassword = () => {
        document.getElementById('pwderror2').className = "hidden";
        document.getElementById('pwderror3').className = "hidden";
        document.getElementById('pwdok').className = "hidden";
        if (password1.length && (password1.length > 20 || password1.length < 10)) {
            document.getElementById('pwdlengtherror').className = "t_error";
            document.getElementById('pwderror5').className = "hidden";
        } else {
            document.getElementById('pwdlengtherror').className = "hidden";
            if (password2.length === 0) {
                document.getElementById('pwderror5').className = "hidden";
            } else if (password1 !== password2) {
                document.getElementById('pwderror5').className = "t_error";
            } else {
                document.getElementById('pwderror5').className = "hidden";
                document.getElementById('pwdok').className = "t_comp";
            }
        }
    };

    const changePassword = () => {
        $.ajax({
            async: true, type: 'POST',
            url: "https://api.odoc-api.com/rest_auth/password/change/",
            data: {
                "new_password1": password1,
                "new_password2": password2,
            },
            dataType: 'json',
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("access_token")),
            success: (response) => {
                alert("비밀번호가 변경되었습니다.\n로그인 화면으로 이동합니다.");
                const logout = useLogout;
                logout();
            },
            error: (response) => {
                const text = JSON.parse(response.responseText);
                console.log(text);
                if (text.new_password2) {
                    if (text.new_password2[0] === "비밀번호가 너무 일상적인 단어입니다.") {
                        document.getElementById('pwderror2').className = "t_error";
                        document.getElementById('pwdok').className = "hidden";
                    } else if (text.new_password2[0] === "비밀번호가 전부 숫자로 되어 있습니다.") {
                        document.getElementById('pwderror3').className = "t_error";
                        document.getElementById('pwdok').className = "hidden";
                    }
                }
                setDisabled(true);
            }
        });
        sessionStorage.removeItem("phone_certification");
    };

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">비밀번호 변경</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" onClick={() => navigate("../../notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>
            <div id="container" className="container sub member">
                <div className="inr-c">
                    <div className="area_member">
                        <h2 className="h_tit2 mb40"><br />변경할 비밀번호를 입력해 주세요.</h2>
                        <form method="post" id="joinform" name="joinform">
                            <fieldset>
                                <div className="box-inp">
                                    <div>
                                        <label htmlFor="password">새로운 비밀번호</label>
                                        <input type="password" id="password" name="password"
                                            placeholder="10~20자 이내의 영문, 숫자를 입력하세요"
                                            onChange={(e) => {
                                                document.getElementById("pwderror1").className = "hidden";
                                                setPassword1(e.target.value);
                                            }} />
                                        <p id="pwdlengtherror" className="t_error hidden">10~20자 이내의 영문, 숫자를 입력하세요</p>
                                        <p id="pwderror1" className="t_error hidden">비밀번호를 입력해주세요</p>
                                        <p id="pwderror2" className="t_error hidden">비밀번호가 너무 일상적인 단어입니다</p>
                                        <p id="pwderror3" className="t_error hidden">비밀번호가 전부 숫자로 되어 있습니다</p>
                                    </div>
                                    <div>
                                        <label htmlFor="password_re">비밀번호 재입력</label>
                                        <input type="password" id="password_re" name="password_re"
                                            placeholder="비밀번호를 다시한번 입력하세요"
                                            onChange={(e) => {
                                                document.getElementById("pwderror4").className = "hidden";
                                                setPassword2(e.target.value);
                                            }} />
                                        <p id="pwderror4" className="t_error hidden">비밀번호를 다시한번 입력해주세요</p>
                                        <p id="pwderror5" className="t_error hidden">비밀번호가 일치하지 않습니다</p>
                                        <p id="pwdok" className="t_comp hidden">비밀번호가 일치합니다</p>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            <div className="fix_botm">
                <button type="button" className="btn-pk blue n" onClick={() => { changePassword(); }} disabled={disabled}>
                    <span>비밀번호 변경</span>
                </button>
            </div>
        </div>
    );
};

export default NewPW;
