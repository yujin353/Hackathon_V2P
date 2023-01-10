import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery"

const Login = () => {
	const navigate = useNavigate()
    const [leftBox, setLeftBox] = useState(false)
    const [rightBox, setRightBox] = useState(false)
	const onChangeLeftBox = () => {setLeftBox(!leftBox)}
    const onChangeRightBox = () => {setRightBox(!rightBox)}
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const errorRef = useRef(null)

	useEffect(()=>{
		if (localStorage.getItem("email")) {
			setEmail(localStorage.getItem("email"))
			setRightBox(true)
		}
		sessionStorage.removeItem("phone_certification")
		sessionStorage.removeItem("policy_checked")
	}, [])

    const onSignIn = () => {
        $.ajax({
			async: false, type: "POST",
            url: "https://api.odoc-api.com/rest_auth/login/",
			data: {
				"username": "",
				"email": email,
				"password": password,
			}, dataType: "json",
            success: (response) => {
				sessionStorage.setItem("access_token", response.access_token);
				sessionStorage.setItem("refresh_token", response.refresh_token);
				sessionStorage.setItem("user_pk", response.user.pk);
				if(rightBox)localStorage.setItem("email", email)
				else localStorage.removeItem("email")
				alert("로그인 되었습니다.");
				navigate("/main");
            },
            error: (response) => {
				console.log(response)
				errorRef.current.className = "mb10"
				$($(errorRef.current).next()[0]).removeClass("hidden")

				const message = JSON.parse(response.responseText)
				for(const msg in message){
					if (email === "") {
						alert("이메일 주소를 입력해 주세요."); return;
					} else if (msg === "non_field_errors" ){
						alert("비밀번호가 틀렸습니다."); return;
					} else if (msg === "email"){ 
						alert('유효한 이메일 주소를 입력하십시오.'); return;
					} else if (msg === "password") {
						alert('비밀번호를 입력해 주십시오.'); return;
					}
				}
            },
        });
    }

    return (
        <div>
			<header id="header" className="header">
				<div className="inr-c">
					<h2 className="tit">로그인</h2>
					<div className="lft">
						<button type="button" className="btn-back c-white" onClick={()=>navigate(-1)}>
							<span className="i-aft i_back">뒤로</span>
						</button>
					</div>
				</div>
			</header>

			<div id="container" className="container sub member">
				<div className="inr-c">
					<div className="area_member login">
						<div className="mb20">
							<span className="ico"><i className="i-set i_id"></i></span>
							<input type="text" id="email" className="inp_txt w100p" placeholder="이메일 주소를 입력해 주세요"
								value={email} onChange={(e)=>{setEmail(e.target.value)}} />
						</div>
						<div className="mb30" ref={errorRef}>
							<span className="ico"><i className="i-set i_pw"></i></span>
							<input type="password" id="password" className="inp_txt w100p" placeholder="비밀번호를 입력해 주세요"
								value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
						<p className="t_error mb30 hidden">아이디와 비밀번호를 정확하게 입력해주세요.</p>
						<div className="mb10">
							<label className="inp_checkbox2 mr60 va-t">
								<input type="checkbox" checked={leftBox} onChange={onChangeLeftBox}/>
								<span>로그인 유지하기</span>
							</label>
							<label className="inp_checkbox2 va-t">
								<input type="checkbox" checked={rightBox} onChange={onChangeRightBox}/>
								<span>아이디 기억하기</span>
							</label>
						</div>
						<button type="button" onClick={onSignIn} className="btn-pk s blue w100p bdrs"><span>로그인</span></button>
						<div className="t_txt mt40">
							<p className="l">아직 회원이 아니시라구요?</p>
							<p className="r"><Link to="/certification" className="c-blue">회원가입</Link></p>
						</div>
						<div className="t_txt mt40">
							<p className="l">아이디를 잊으셨나요?</p>
							<p className="r"><Link to="/findid" className="c-blue">아이디 찾기</Link></p>
						</div>
						<div className="t_txt mt30">
							<p className="l">비밀번호를 잊으셨나요?</p>
							<p className="r"><Link to="/findpw" className="c-blue">비밀번호 찾기</Link></p>
						</div>
					</div>		
				</div>
			</div>
		</div>
    )
}

export default Login;