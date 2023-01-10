import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery"

const Friend = () => {
    const navigate = useNavigate();
    const [leftTab, setLeftTab] = useState(true)
    const [rightTab, setRightTab] = useState(false)
    const [followerList, setFollowerList] = useState([])
    const [followeeList, setFolloweeList] = useState([])
    
    /* Get a list of friends a user subscribes to */
    useEffect(()=>{
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/member-follower/" + "?search=" + sessionStorage.getItem("user_pk"),
            success: (response) => setFollowerList(response.results),
            error: (response) => console.log(response)
        });
    }, [])

    /* Get a list of friends who subscribes user */
    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://api.odoc-api.com/api/v1/member-following/" + "?search=" + sessionStorage.getItem("user_pk"),
            success: (response) => setFolloweeList(response.results),
            error: (response) => console.log(response)
        });
    }, [])

    const onClickTab = () => {
        $(document.getElementById("lefttab")).toggleClass("off on")
        $(document.getElementById("righttab")).toggleClass("off on")
        setLeftTab(!leftTab)
        setRightTab(!rightTab)
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">키인친구</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        <button type="button" className="btn_alram on" onClick={() => navigate("../notification")}>
                            <span className="i-set i_alram"></span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="tab ty1">
                    <ul>
                        <li id="lefttab" className="on">
                            <Link to="#tab1" onClick={(e)=>{
                                e.preventDefault();
                                onClickTab()
                            }}><span>내가 구독한</span></Link>
                        </li>
                        <li id="righttab" className="off">
                            <Link to="#tab2" onClick={(e) => {
                                e.preventDefault();
                                onClickTab()
                            }}><span>나를 구독한</span></Link>
                        </li>
                    </ul>
                </div>
                <div className="inr-c">
                    {
                        leftTab ? (
                            <div id="tab1" className="lst_list1">
                                <ul className="i_m_their_follower">
                                    {
                                        followerList.map((v,i)=>{
                                            const follower = v.follower_member
                                            return (
                                                <li key={v+i}><Link to={`/mykiin/neighbor?id=${follower.member_id}`} className="b">
                                                    <div className="im"><img src={require("../../../assets/images/common/img_nomem.jpg")}></img></div>
                                                    <p className="t1"><strong>{follower.username}</strong>님</p>
                                                </Link></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        ) : (
                            <div id="tab2" className="lst_list1">
                                <ul className="they_following_me">
                                        {
                                            followeeList.map((v,i) => {
                                                const followee = v.following_member
                                                return (
                                                    <li key={v+i}><Link to={`/mykiin/neighbor?id=${followee.member_id}`} className="b">
                                                        <div className="im"><img src={require("../../../assets/images/common/img_nomem.jpg")}></img></div>
                                                        <p className="t1"><strong>{followee.username}</strong>님</p>
                                                    </Link></li>
                                                )
                                            })
                                        }
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Friend;