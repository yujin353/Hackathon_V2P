import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccessTknRefresh } from "../../../hooks";
import $ from "jquery";

const Friend = () => {
    const navigate = useNavigate();
    const [prevTabNum, setPrevTabNum] = useState(1);
    const [leftTab, setLeftTab] = useState(true);
    const [rightTab, setRightTab] = useState(false);
    const [searchTab, setSearchTab] = useState(false);
    const [followerList, setFollowerList] = useState([]);
    const [followeeList, setFolloweeList] = useState([]);
    const [input, setInput] = useState("");
    const [findList, setFindList] = useState([]);

    /* Get a list of friends a user subscribes to */
    useEffect(() => {
        const accessTknRefresh = useAccessTknRefresh;
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member/follower_display?member_id=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh()),
            success: (response) => {
                let follow = [];
                for (let i = 0; i < response.length; i++)
                    follow.push(response[i]);
                setFollowerList(follow);
            },
            error: (response) => console.log(response)
        });
    }, []);

    /* Get a list of friends who subscribes user */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member/following_display?member_id=" + sessionStorage.getItem("user_pk"),
            success: (response) => {
                let follow = [];
                for (let i = 0; i < response.length; i++)
                    follow.push(response[i]);
                setFolloweeList(follow);
            },
            error: (response) => console.log(response)
        });
    }, []);

    const func_cntFollowing = (mem_id) => {
        let follower;
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member/following_display?member_id=" + mem_id,
            success: (response) => follower = response.length,
            error: (response) => console.log(response)
        });
        return follower;
    };

    const func_cntFollower = (mem_id) => {
        let followee;
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member/follower_display?member_id=" + mem_id,
            success: (response) => followee = response.length,
            error: (response) => console.log(response)
        });
        return followee;
    };

    /* Get friend name's id */
    const searchUsername = () => {
        const textInput = input.trim();
        let j = 0;
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member/follow_search?username=" + textInput,
            success: (response) => {
                let find = [];
                for (let i = 0; i < response.result.length; i++)
                    find.push(response.result[i]);
                setFindList(find);
            },
            error: (response) => console.log(response)
        });
    };

    const onClickTab = (tabNum) => {
        if (prevTabNum === tabNum) return;

        if (prevTabNum === 1) {
            $(document.getElementById("lefttab")).toggleClass("off on");
            setLeftTab(!leftTab);
        }
        else if (prevTabNum === 2) {
            $(document.getElementById("righttab")).toggleClass("off on");
            setRightTab(!rightTab);
        }
        else if (prevTabNum === 3) {
            $(document.getElementById("searchtab")).toggleClass("off on");
            setSearchTab(!searchTab);
        }

        if (tabNum === 1) {
            $(document.getElementById("lefttab")).toggleClass("off on");
            setLeftTab(!leftTab);
            setPrevTabNum(1);
        }
        else if (tabNum === 2) {
            $(document.getElementById("righttab")).toggleClass("off on");
            setRightTab(!rightTab);
            setPrevTabNum(2);
        }
        else if (tabNum === 3) {
            $(document.getElementById("searchtab")).toggleClass("off on");
            setSearchTab(!searchTab);
            setPrevTabNum(3);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') searchUsername();
    };

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">키인친구</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" onClick={() => navigate("../notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="tab ty1">
                    <ul>
                        <li id="lefttab" className="on">
                            <Link to="#tab1" onClick={(e) => {
                                e.preventDefault();
                                onClickTab(1);
                            }}><span>내가 구독한</span></Link>
                        </li>
                        <li id="righttab" className="off">
                            <Link to="#tab2" onClick={(e) => {
                                e.preventDefault();
                                onClickTab(2);
                            }}><span>나를 구독한</span></Link>
                        </li>
                        <li id="searchtab" className="off">
                            <Link to="#tab3" onClick={(e) => {
                                e.preventDefault();
                                onClickTab(3);
                            }}><span>검색</span></Link>
                        </li>
                    </ul>
                </div>
                <div className="inr-c">
                    {
                        leftTab ? (
                            <div id="tab1" className="lst_list1">
                                <ul className="i_m_their_follower">
                                    {
                                        followerList.length !== 0 ?
                                            followerList.map((v, i) => {
                                                const follower = v.following_member;
                                                return (
                                                    <li key={v + i}><Link to={`/mykiin/neighbor?id=${follower.member_id}`} className="b">
                                                        <div className="im">
                                                            {
                                                                v.type_id_follower == 1 ?
                                                                    <img src= {require("../../../assets/images/profile/DRNT.png")} />
                                                                    : v.type_id_follower == 2 ?
                                                                        <img src= {require("../../../assets/images/profile/DRNW.png")} />
                                                                        : v.type_id_follower == 3 ?
                                                                            <img src= {require("../../../assets/images/profile/DSNT.png")} />
                                                                            : v.type_id_follower == 4 ?
                                                                                <img src= {require("../../../assets/images/profile/DSNW.png")} />
                                                                                : v.type_id_follower == 5 ?
                                                                                    <img src= {require("../../../assets/images/profile/DRPT.png")} />
                                                                                    : v.type_id_follower == 6 ?
                                                                                        <img src= {require("../../../assets/images/profile/DRPW.png")} />
                                                                                        : v.type_id_follower == 7 ?
                                                                                            <img src= {require("../../../assets/images/profile/DSPT.png")} />
                                                                                            : v.type_id_follower == 8 ?
                                                                                                <img src= {require("../../../assets/images/profile/DSPW.png")} />
                                                                                                : v.type_id_follower == 9 ?
                                                                                                    <img src= {require("../../../assets/images/profile/ORNT.png")} />
                                                                                                    : v.type_id_follower == 10 ?
                                                                                                        <img src= {require("../../../assets/images/profile/ORNW.png")} />
                                                                                                        : v.type_id_follower == 11 ?
                                                                                                            <img src= {require("../../../assets/images/profile/OSNT.png")} />
                                                                                                            : v.type_id_follower == 12 ?
                                                                                                                <img src= {require("../../../assets/images/profile/OSNW.png")} />
                                                                                                                : v.type_id_follower == 13 ?
                                                                                                                    <img src= {require("../../../assets/images/profile/ORPT.png")} />
                                                                                                                    : v.type_id_follower == 14 ?
                                                                                                                        <img src= {require("../../../assets/images/profile/ORPW.png")} />
                                                                                                                        : v.type_id_follower == 15 ?
                                                                                                                            <img src= {require("../../../assets/images/profile/OSPT.png")} />
                                                                                                                            : v.type_id_follower == 16 ?
                                                                                                                                <img src= {require("../../../assets/images/profile/OSPW.png")} />
                                                                                                                                : <img src={require("../../../assets/images/common/img_nomem.jpg")} />}
                                                        </div>
                                                        <p className="t3"><strong>{follower.username}</strong>님</p>
                                                        <span className="cnt_follower">팔로워 <br /> <span>{func_cntFollowing(follower.member_id)}</span></span>
                                                        <span className="cnt_followee">팔로잉 <br /> <span>{func_cntFollower(follower.member_id)}</span></span>
                                                    </Link></li>
                                                );
                                            })
                                            :
                                            <p className="emptyArea" style={{ color: "#bfc2ca", fontSize: "18px", textAlign: "center", marginTop: "120px" }}>내가 구독한 키인 친구가 없습니다.</p>
                                    }
                                </ul>
                            </div>
                        ) : rightTab ? (
                            <div id="tab2" className="lst_list1">
                                <ul className="they_following_me">
                                    {
                                        followeeList.length !== 0 ?
                                            followeeList.map((v, i) => {
                                                const followee = v.follower_member;
                                                return (
                                                    <li key={v + i}><Link to={`/mykiin/neighbor?id=${followee.member_id}`} className="b">
                                                        <div className="im">
                                                            {
                                                                v.type_id_following == 1 ?
                                                                    <img src= {require("../../../assets/images/profile/DRNT.png")} />
                                                                    : v.type_id_following == 2 ?
                                                                        <img src= {require("../../../assets/images/profile/DRNW.png")} />
                                                                        : v.type_id_following == 3 ?
                                                                            <img src= {require("../../../assets/images/profile/DSNT.png")} />
                                                                            : v.type_id_following == 4 ?
                                                                                <img src= {require("../../../assets/images/profile/DSNW.png")} />
                                                                                : v.type_id_following == 5 ?
                                                                                    <img src= {require("../../../assets/images/profile/DRPT.png")} />
                                                                                    : v.type_id_following == 6 ?
                                                                                        <img src= {require("../../../assets/images/profile/DRPW.png")} />
                                                                                        : v.type_id_following == 7 ?
                                                                                            <img src= {require("../../../assets/images/profile/DSPT.png")} />
                                                                                            : v.type_id_following == 8 ?
                                                                                                <img src= {require("../../../assets/images/profile/DSPW.png")} />
                                                                                                : v.type_id_following == 9 ?
                                                                                                    <img src= {require("../../../assets/images/profile/ORNT.png")} />
                                                                                                    : v.type_id_following == 10 ?
                                                                                                        <img src= {require("../../../assets/images/profile/ORNW.png")} />
                                                                                                        : v.type_id_following == 11 ?
                                                                                                            <img src= {require("../../../assets/images/profile/OSNT.png")} />
                                                                                                            : v.type_id_following == 12 ?
                                                                                                                <img src= {require("../../../assets/images/profile/OSNW.png")} />
                                                                                                                : v.type_id_following == 13 ?
                                                                                                                    <img src= {require("../../../assets/images/profile/ORPT.png")} />
                                                                                                                    : v.type_id_following == 14 ?
                                                                                                                        <img src= {require("../../../assets/images/profile/ORPW.png")} />
                                                                                                                        : v.type_id_following == 15 ?
                                                                                                                            <img src= {require("../../../assets/images/profile/OSPT.png")} />
                                                                                                                            : v.type_id_following == 16 ?
                                                                                                                                <img src= {require("../../../assets/images/profile/OSPW.png")} />
                                                                                                                                : <img src={require("../../../assets/images/common/img_nomem.jpg")} />}
                                                        </div>
                                                        <p className="t3"><strong>{followee.username}</strong>님</p>
                                                        <span className="cnt_follower">팔로워 <br /> <span>{func_cntFollowing(followee.member_id)}</span></span>
                                                        <span className="cnt_followee">팔로잉 <br /> <span>{func_cntFollower(followee.member_id)}</span></span>
                                                    </Link></li>
                                                );
                                            })
                                            :
                                            <p className="emptyArea" style={{ color: "#bfc2ca", fontSize: "18px", textAlign: "center", marginTop: "120px" }}>나를 구독한 키인 친구가 없습니다.</p>
                                    }
                                </ul>
                            </div>
                        ) : (
                            <div id="tab3" className="lst_list1">
                                <div className="cen">
                                    <input type="text" id="hd_search" className="inp_txt w100p" placeholder="닉네임을 입력하세요"
                                           value={input} onChange={(e) => { setInput(e.target.value); }} onKeyDown={handleKeyPress} style={{ width: "95%" }} />
                                </div>
                                <div className="rgh">
                                    <button type="button" className="btn_sch_r" id="search_btn" onClick={() => searchUsername()}>
                                        <span className="i-set i_sch_bl" style={{ left: "80vw", top: "-8vw" }}>검색</span>
                                    </button>
                                </div>
                                <ul className="search_friend_name">
                                    {
                                        findList.length !== 0 ?
                                            findList.map((v, i) => {
                                                return (
                                                    <li key={v + i}><Link to={`/mykiin/neighbor?id=${v.id}`} className="b">
                                                        <div className="im">
                                                            {
                                                                v.type_id == 1 ?
                                                                    <img src= {require("../../../assets/images/profile/DRNT.png")} />
                                                                    : v.type_id == 2 ?
                                                                        <img src= {require("../../../assets/images/profile/DRNW.png")} />
                                                                        : v.type_id == 3 ?
                                                                            <img src= {require("../../../assets/images/profile/DSNT.png")} />
                                                                            : v.type_id == 4 ?
                                                                                <img src= {require("../../../assets/images/profile/DSNW.png")} />
                                                                                : v.type_id == 5 ?
                                                                                    <img src= {require("../../../assets/images/profile/DRPT.png")} />
                                                                                    : v.type_id == 6 ?
                                                                                        <img src= {require("../../../assets/images/profile/DRPW.png")} />
                                                                                        : v.type_id == 7 ?
                                                                                            <img src= {require("../../../assets/images/profile/DSPT.png")} />
                                                                                            : v.type_id == 8 ?
                                                                                                <img src= {require("../../../assets/images/profile/DSPW.png")} />
                                                                                                : v.type_id == 9 ?
                                                                                                    <img src= {require("../../../assets/images/profile/ORNT.png")} />
                                                                                                    : v.type_id == 10 ?
                                                                                                        <img src= {require("../../../assets/images/profile/ORNW.png")} />
                                                                                                        : v.type_id == 11 ?
                                                                                                            <img src= {require("../../../assets/images/profile/OSNT.png")} />
                                                                                                            : v.type_id == 12 ?
                                                                                                                <img src= {require("../../../assets/images/profile/OSNW.png")} />
                                                                                                                : v.type_id == 13 ?
                                                                                                                    <img src= {require("../../../assets/images/profile/ORPT.png")} />
                                                                                                                    : v.type_id == 14 ?
                                                                                                                        <img src= {require("../../../assets/images/profile/ORPW.png")} />
                                                                                                                        : v.type_id == 15 ?
                                                                                                                            <img src= {require("../../../assets/images/profile/OSPT.png")} />
                                                                                                                            : v.type_id == 16 ?
                                                                                                                                <img src= {require("../../../assets/images/profile/OSPW.png")} />
                                                                                                                                : <img src={require("../../../assets/images/common/img_nomem.jpg")} />}
                                                        </div>
                                                        <p className="t3"><strong>{v.name}</strong>님</p>
                                                        <span className="cnt_follower">팔로워 <br /> <span>{v.following}</span></span>
                                                        <span className="cnt_followee">팔로잉 <br /> <span>{v.follower}</span></span>
                                                    </Link></li>
                                                );
                                            })
                                            :
                                            <p className="emptyArea" style={{ color: "#bfc2ca", fontSize: "18px", textAlign: "center", marginTop: "120px" }}>검색어와 일치하는 사용자가 없습니다.</p>
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Friend;
