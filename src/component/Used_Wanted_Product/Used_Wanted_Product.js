import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

const Used_Wanted_Product = ({ userPK }) => {
    const [used, setUsed] = useState([]);
    const [wanted, setWanted] = useState([]);
    const [username, setUsername] = useState();
    let dup = [];

    const checkDuplicate = (product_id) => {
        if (dup[product_id] > 0)
            return 'Y';
        else return 'N';
    };

    useEffect(() => {
        $.ajax({
            async: false, type: 'GET',
            url: "https://dev.odoc-api.com/member/member_display?member_id=" + userPK,
            success: (response) => setUsername(response[0].username),
            error: (response) => console.log(response)
        });
    }, []);

    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member_product/review_member?member_id=" + userPK,
            success: (response) => {
                const result = [];
                response.map(v => { if (v.product != null) result.push(v); });
                setUsed(result);
            },
            error: (response) => console.log(response.results)
        });
    }, []);

    useEffect(() => {
        $.ajax({
            async: true, type: "GET",
            url: "https://dev.odoc-api.com/member_product/product_like_display?member_id=" + userPK,
            success: (response) => setWanted(response),
            error: (response) => console.log(response)
        });
    }, []);

    return (
        <>
            <div className="pr-mb2">
                <div className="hd_tit">
                    <h2 className="h_tit1">사용해본 제품</h2>
                    {
                        userPK == sessionStorage.getItem("user_pk") ?
                            <p className="h_txt1"><span>내가 리뷰를 남긴 제품들이에요.<br />리뷰를 작성하고 화장대에 추가해 보세요.</span></p>
                            :
                            <p className="h_txt1"><span>{username}님이 리뷰를 남긴 제품들이에요.</span></p>
                    }
                </div>

                {
                    (used.length == 0) & (userPK == sessionStorage.getItem("user_pk"))?
                        <div className="btn-bot">
                            <Link to="/search" className="btn-pk s blue2 bdrs" style={{fontSize: "4vw", height: "11vw", width: "50%"}}><span>사용해본 제품 추가하기</span></Link>
                        </div>
                        :
                        <div className="lst_prd">
                            <ul>
                                {used.map((v, i) => {
                                    const duplicate = checkDuplicate(v.product.product_id);
                                    dup[v.product.product_id] = 1;
                                    return (
                                        duplicate === 'N' ?
                                            <li key={v + i}>
                                                <div className="thumb">
                                                    <Link to={`/main/products/${v.product.product_id}`}>
                                                        <span className="im" style={{ backgroundImage: `url(${v.product.product_img_path})` }}></span>
                                                    </Link>
                                                    <button type="button" className="btn_del">
                                                        <span className="i-set i_del_b">삭제</span>
                                                    </button>
                                                </div>
                                                <div className="txt"><Link to={`/main/products/${v.product.product_id}`}>
                                                    <p className="t1">{v.product.brand.brand_name}</p>
                                                    <p className="t2">{v.product.product_name}</p>
                                                </Link></div>
                                            </li>
                                            : null
                                    );
                                })}
                            </ul>
                        </div>
                }
            </div>

            <div className="pr-mb2">
                <div className="hd_tit">
                    <h2 className="h_tit1">관심 제품</h2>
                    {
                        userPK == sessionStorage.getItem("user_pk") ?
                            <p className="h_txt1"><span>내가 좋아요 누른 제품들이에요.</span></p>
                            :
                            <p className="h_txt1"><span>{username}님이 좋아요 누른 제품들이에요.</span></p>
                    }
                </div>

                {
                    (wanted.length == 0) & (userPK == sessionStorage.getItem("user_pk")) ?
                        <div className="btn-bot">
                            <Link to="/search" className="btn-pk s blue2 bdrs" style={{fontSize: "4vw", height: "11vw", width: "50%"}}><span>관심 제품 추가하기</span></Link>
                        </div>
                        :
                        <div className="lst_prd">
                            <ul>
                                {wanted.map((v, i) => {
                                    return (
                                        <li key={v + i}>
                                            <div className="thumb">
                                                <Link to={`/main/products/${v.like_product.product_id}`}>
                                                    <span className="im" style={{ backgroundImage: `url(${v.like_product.product_img_path})` }}></span>
                                                </Link>
                                                <button type="button" className="btn_del">
                                                    <span className="i-set i_del_b">삭제</span>
                                                </button>
                                            </div>
                                            <div className="txt"><Link to={`/main/products/${v.like_product.product_id}`}>
                                                <p className="t1">{v.like_product.brand.brand_name}</p>
                                                <p className="t2">{v.like_product.product_name}</p>
                                            </Link></div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                }
            </div>
        </>
    );
};

export default Used_Wanted_Product;
