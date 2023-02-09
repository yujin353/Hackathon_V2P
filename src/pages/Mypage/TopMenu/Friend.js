import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccessTknRefresh } from "../../../hooks";
import $ from "jquery";

const Friend = () => {
    const navigate = useNavigate();
    const accessTknRefresh = useAccessTknRefresh();
    const [prevTabNum, setPrevTabNum] = useState(1);
    const [leftTab, setLeftTab] = useState(true);
    const [rightTab, setRightTab] = useState(false);
    const [searchTab, setSearchTab] = useState(false);
    const [followerList, setFollowerList] = useState([]);
    const [followeeList, setFolloweeList] = useState([]);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [input, setInput] = useState("");
    const [totalUser, setTotalUser] = useState(0);

    /* Get a list of friends a user subscribes to */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/member-follower/?search=" + sessionStorage.getItem("user_pk"),
            success: (response) => setFollowerList(response.results),
            error: (response) => console.log(response)
        });
    }, []);

    /* Get a list of friends who subscribes user */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/member-following/?search=" + sessionStorage.getItem("user_pk"),
            beforeSend: (xhr) => xhr.setRequestHeader("Authorization", "Bearer " + accessTknRefresh),
            success: (response) => setFolloweeList(response.results),
            error: (response) => console.log(response)
        });
    }, []);

    const func_cntFollower = (mem_id) => {
        let follower;
        $.ajax({
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/member-following/?search=" + mem_id,
            success: (response) => follower = response.count,
            error: (response) => console.log(response)
        });
        return follower;
    };

    const func_cntFollowee = (mem_id) => {
        let followee;
        $.ajax({
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/member-follower/?search=" + mem_id,
            success: (response) => followee = response.count,
            error: (response) => console.log(response)
        });
        return followee;
    };

    const cntTotalUser = () => {
        $.ajax({
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/members/",
            success: (response) => setTotalUser(response.count),
            error: (response) => console.log(response)
        });
    };

    /* Get friend name's id */
    const searchUsername = () => {
        setUserId("");
        setUserName("");
        const textInput = input.trim();
        let offset = 0;
        let usercnt = (totalUser / 20).toFixed(0);
        for (let i = 0; i <= usercnt; i++) {
            $.ajax({
                async: false, type: "GET",
                url: "https://api.odoc-api.com/api/v1/members/?offset=" + offset,
                success: (response) => {
                    response.results.map(v => {
                        if (v.username === textInput) {
                            setUserId(v.member_id);
                            setUserName(v.username);
                            return;
                        }
                    }
                    );
                },
                error: (response) => console.log(response)
            });
            offset += 20;
        }
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
                                cntTotalUser();
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
                                                const follower = v.follower_member;
                                                return (
                                                    <li key={v + i}><Link to={`/mykiin/neighbor?id=${follower.member_id}`} className="b">
                                                        <div className="im">
                                                            <img src={require("../../../assets/images/common/img_nomem.jpg")} />
                                                        </div>
                                                        <p className="t1"><strong>{follower.username}</strong>님</p>
                                                        <span className="cnt_follow" style={{ fontSize: '1.5vh' }}>팔로워 : {func_cntFollower(follower.member_id)} / 팔로잉 : {func_cntFollowee(follower.member_id)}</span>
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
                                                const followee = v.following_member;
                                                return (
                                                    <li key={v + i}><Link to={`/mykiin/neighbor?id=${followee.member_id}`} className="b">
                                                        <div className="im">
                                                            <img src={require("../../../assets/images/common/img_nomem.jpg")} />
                                                        </div>
                                                        <p className="t1"><strong>{followee.username}</strong>님</p>
                                                        <span className="cnt_follow" style={{ fontSize: '1.5vh' }}>팔로워 : {func_cntFollower(followee.member_id)} / 팔로잉 : {func_cntFollowee(followee.member_id)}</span>
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
                                        userId.length !== 0 ?
                                            <div><Link to={`/mykiin/neighbor?id=${userId}`} className="b">
                                                <div className="im"><img src={require("../../../assets/images/common/img_nomem.jpg")} /></div>
                                                <p className="t1"><strong>{userName}</strong>님</p></Link>
                                            </div>
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
