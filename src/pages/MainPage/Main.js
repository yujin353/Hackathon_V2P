import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useIsMounted } from "../../hooks"
import { useAccessTknRefresh, useLogout } from "../../hooks";
import { Footer, Modal, CollisionWarning, Vibration } from "../../component";
import $ from "jquery";

const Main = () => {
	// const isMounted = useIsMounted()
	const navigate = useNavigate();
	const location = useLocation();
	const [username, setUsername] = useState("");
    const [modal1, setModal1] = useState(false);

	useEffect(() => {
		if (sessionStorage.getItem("access_token") === undefined)
			sessionStorage.removeItem("access_token");
	}, []);


	/* 임시 findout currently logged in user 
	useEffect(() => {
		let isMounted = true;
		const accessTknRefresh = useAccessTknRefresh;
		$.ajax({
			async: false, type: 'GET',
			url: "https://dev.odoc-api.com/member/member_display?member_id=" + sessionStorage.getItem("user_pk"),
			beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
			success: (response) => {
				if (isMounted)
					setUsername(response[0].username);
			},
			error: (response) => {
				console.log("error", response);
				alert("다시 로그인 해주세요.");
				const logout = useLogout;
				logout();
			},
		});
		return () => isMounted = false;
	}, []);*/


	/* coloring bottom navigation bar icons */
	useEffect(() => {
		const pathname = location.pathname;
		if (pathname.startsWith("/test")) $("#fmenu1").addClass("on");
		else if (pathname.startsWith("/MyHistory")) $("#fmenu2").addClass("on");
		else if (pathname.startsWith("/main")) $("#fmenu3").addClass("on");
		else if (pathname.startsWith("/search")) $("#fmenu4").addClass("on");
		else if (pathname.startsWith("/mypage")) $("#fmenu5").addClass("on");
	}, []);

	function handleButtonClick1() {
        setModal1(!modal1);
    }

	return (
		<div style={{width: "98%", marginLeft: "1%"}}>
			<header id="header" className="header">
				<div className="inr-c">
					<h2 className="hidden">메인</h2>
				</div>
			</header>
			<div id="container" className="container main" style={{width: "98%", marginLeft: "1%"}}>
			<div className="inr-c">
					<h2 className="h_tit1"><span><strong className="c-blue">{username}</strong>현재 위치</span></h2>
					<div className="lst_prd pr-mb2">
						{
							<div className="item">
							<div className="thumb">
								<Link to="/map">
								<img className="img_2" src={require("../../assets/images/mapTest.png")} />
									{/* <span className="im" style={{ backgroundImage: `url(${v.product_img_path})` }}></span> */}
								</Link>
							</div>
						</div>
						}

					</div>
					<div>
                <div style={{backgroundColor: "transparent", marginBottom: "-18vw"}}>
                    <button type="button" className="btn_bmore2" onClick={() => handleButtonClick1()}><span className="i-aft">&nbsp; 충돌 경고 </span><img style= {{width: "3.7vw", height: "3.7vw", marginTop: "0.4vw"}} src={require("../../assets/images/common/question_mark.jpg")} /></button>
                    <Modal open={modal1} className="customOverlay">
                        <div id="popIngredient" className="layerPopup pop_ingredient">
                            <div className="popup">
                                <div className="p_head botm">
                                    <button type="button" className="b-close btn_close" onClick={() => setModal1()}>
                                        <span>x</span>
                                    </button>
                                </div>
								<CollisionWarning />
								<Vibration />
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
			</div>
			{
				<Footer />
			}
			</div>
			</div>
	);
};

export default Main;
