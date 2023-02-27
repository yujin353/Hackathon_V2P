import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Ingredient, Graph, Used_Wanted_Product, Footer } from "../../component";
import { useAccessTknRefresh } from "../../hooks";
import $ from "jquery";

const MyKiin = () => {
    const [tested, setTested] = useState(false);
    const [userList, setUserList] = useState([]);
    const [myskinTypeImg, setMyskinTypeImg] = useState("");
    const [count, setCount] = useState(3);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /* checking skin type test */
    useEffect(() => {
        const accessTknRefresh = useAccessTknRefresh;
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member/my_skin?member_id=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
            success: (response) => {
                if (response[0]) {
                    findSameSkinTypeUser();
                }
            },
            error: (response) => console.log(response)
        });
    }, []);

    /* checking skin type test */
    useEffect(() => {
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member/my_skin?member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                if (response[0]) setTested(true);
            },
            error: (response) => console.log(response)
        });
    }, []);

    /* loading same skin type user */
    const findSameSkinTypeUser = () => {
        let isMounted = true;
        const accessTknRefresh = useAccessTknRefresh;
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member/skin_type_by_same?member_id=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
            success: response => {
                if (response.message == [])
                    setUserList([]);
                else if (isMounted)
                    setUserList(response.message);
            },
            error: response => console.log(response)
        });
        return () => isMounted = false;
    };

    /* find skin type */
    useEffect(() => {
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member/my_skin?member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                const results = response[0];
                if (results === undefined) return;
                skinTypeName(results.do_alphabet + results.rs_alphabet + results.np_alphabet + results.tw_alphabet);
            },
            error: (response) => console.log(response)
        });
    }, []);

    /* set same skin type user img */
    const skinTypeName = (myskinType) => {
        switch (myskinType) {
            case 'DSPW':
                setMyskinTypeImg(require("../../assets/images/animal/DSPW.png"));
                break;
            case 'DSPT':
                setMyskinTypeImg(require("../../assets/images/animal/DSPT.png"));
                break;
            case 'DSNW':
                setMyskinTypeImg(require("../../assets/images/animal/DSNW.png"));
                break;
            case 'DSNT':
                setMyskinTypeImg(require("../../assets/images/animal/DSNT.png"));
                break;
            case 'DRPW':
                setMyskinTypeImg(require("../../assets/images/animal/DRPW.png"));
                break;
            case 'DRPT':
                setMyskinTypeImg(require("../../assets/images/animal/DRPT.png"));
                break;
            case 'DRNW':
                setMyskinTypeImg(require("../../assets/images/animal/DRNW.png"));
                break;
            case 'DRNT':
                setMyskinTypeImg(require("../../assets/images/animal/DRNT.png"));
                break;
            case 'OSPW':
                setMyskinTypeImg(require("../../assets/images/animal/OSPW.png"));
                break;
            case 'OSPT':
                setMyskinTypeImg(require("../../assets/images/animal/OSPT.png"));
                break;
            case 'OSNW':
                setMyskinTypeImg(require("../../assets/images/animal/OSNW.png"));
                break;
            case 'OSNT':
                setMyskinTypeImg(require("../../assets/images/animal/OSNT.png"));
                break;
            case 'ORPW':
                setMyskinTypeImg(require("../../assets/images/animal/ORPW.png"));
                break;
            case 'ORPT':
                setMyskinTypeImg(require("../../assets/images/animal/ORPT.png"));
                break;
            case 'ORNW':
                setMyskinTypeImg(require("../../assets/images/animal/ORNW.png"));
                break;
            case 'ORNT':
                setMyskinTypeImg(require("../../assets/images/animal/ORNT.png"));
                break;
        }
    };

    useEffect(() => {
        let pathname = $(window.location).attr('pathname');
        if (pathname.startsWith("/test")) $("#fmenu1").addClass("on");
        else if (pathname.startsWith("/mykiin")) $("#fmenu2").addClass("on");
        else if (pathname.startsWith("/main")) $("#fmenu3").addClass("on");
        else if (pathname.startsWith("/search")) $("#fmenu4").addClass("on");
        else if (pathname.startsWith("/mypage")) $("#fmenu5").addClass("on");
    }, []);

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">MY 키인</h2>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" onClick={() => navigate("/mypage/notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>

            <div id="container" className="container sub myk">
                <div className="inr-c">
                    {
                        tested ?
                            <>
                                <div className="hd_tit"><h2 className="h_tit1">내 피부타입 분석결과</h2></div>
                                <Graph userPK={sessionStorage.getItem("user_pk")} />
                            </>
                            : <>
                                <Link to="/test">
                                    <img src={require("../../assets/images/graph_example_new.png")} />
                                </Link>
                                <br/><br/>
                            </>
                    }
                    <Ingredient userPK={sessionStorage.getItem("user_pk")} />
                    <Used_Wanted_Product userPK={sessionStorage.getItem("user_pk")} />

                    <h2 className="h_tit1">나와 비슷한 피부를 가진 이웃</h2>
                    <div className="lst_list1">
                        <ul>
                            {userList.slice(0, count).map((v) => {
                                return (
                                    <li key={v.member_id}><Link to={`/mykiin/neighbor?id=${v.member_id}`} className="b">
                                        <div className="im"><img src={myskinTypeImg ? myskinTypeImg : require("../../assets/images/common/img_nomem.jpg")} /></div>
                                        <p className="t1"><strong>{v.username}</strong>님</p>
                                        <p className="t2"><span className="i-aft i_arr1">키인</span></p>
                                    </Link></li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                {
                    userList.length > count ?
                        <div className="btn-bot ta-c pr-mb2">
                            <span className="btn-pk s blue2 bdrs wid1" onClick={() => setCount(prev => prev + 3)}>더보기</span>
                        </div>
                        : null
                }
            </div>

            <Footer />

        </div>
    );
};

export default MyKiin;
