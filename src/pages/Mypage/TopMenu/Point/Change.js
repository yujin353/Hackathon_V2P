import React from "react"
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery"

const Change = () => {
    const navigate = useNavigate();

    const bankAdd = () => {
        $(".area_bank_top").hide();
        $(".area_bank").show();
    }

    const bankDel = () => {
        $(".area_bank_top .box").hide();
        $(".area_bank_top .btn_bank").show();
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">교환하기</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white"
                            onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        <button type="button" className="btn_alram on" onClick={() => navigate("../../notification")}>
                            <span className="i-set i_alram"></span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub mypage2">
                <div className="inr-c pd-ty2">
                    <div className="box_point ty2 pr-mb1">
                        <p>
                            <span>사용 가능한 포인트</span>
                            <Link to="#" className="btn-pk ss blue2 bdrs"
                                onClick={(e)=>{
                                    e.preventDefault();
                                    alert('준비중입니다')
                                }}>
                                <span>내역보기</span>
                            </Link>
                        </p>
                        <p className="t2">5,340 P</p>
                    </div>
                    <div className="hd_tit2">
                        <h2 className="h_tit1">은행 계좌 환급</h2>
                        <p>입금까지 영업일 기준 3-5일이 소요됩니다.</p>
                    </div>
                    <div className="area_bank_top">
                        <button type="button" className="btn-pk s blue2 w100p btn_bank" onClick={bankAdd}><span className="i-aft i_add_b">은행추가</span></button>
                        <div className="box">
                            <p className="t1">신한</p>
                            <p className="t2">0101 4567 8912 ****</p>
                            <button type="button" className="btn-pk ss bdrs blue2" onClick={bankDel}><span>삭제</span></button>
                        </div>
                    </div>
                </div>
                <div className="area_bank">
                    <div className="line-bot"></div>
                    <div className="inr-c pd-ty2">
                        <div className="box-inp">
                            <div>
                                <label>예금주</label>
                                <input type="text" placeholder="예금주를 입력하세요"/>
                                    <p className="t_error hidden">예금주를 입력하세요</p>
                            </div>
                            <div className="bdn">
                                <label>은행명</label>
                                <div className="lst_chk">
                                    <label className="inp_txtbt"><input type="radio" name="radio01"/><span>기업</span></label>
                                    <label className="inp_txtbt"><input type="radio" name="radio01"/><span>우리</span></label>
                                    <label className="inp_txtbt"><input type="radio" name="radio01"/><span>국민</span></label>
                                    <label className="inp_txtbt"><input type="radio" name="radio01"/><span>하나</span></label>
                                    <label className="inp_txtbt"><input type="radio" name="radio01"/><span>농협</span></label>
                                    <label className="inp_txtbt"><input type="radio" name="radio01"/><span>신한</span></label>
                                    <label className="inp_txtbt"><input type="radio" name="radio01"/><span>기업</span></label>
                                    <label className="inp_txtbt"><input type="radio" name="radio01"/><span>신협</span></label>
                                </div>
                                <p className="t_error hidden">은행명을 선택하세요</p>
                            </div>
                            <div>
                                <label>계좌번호</label>
                                <input type="text" placeholder="계좌번호를 입력하세요"/>
                                <p className="t_error hidden">계좌번호를 입력하세요</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inr-c pd-ty2">
                    <div className="box-inp">
                        <div>
                            <label>환급금액<em className="c-gray"> (최소 환급액:5,000원) </em></label>
                            <div className="ip">
                                <input type="text" placeholder="환급금액을 입력하세요"/><p>원</p>
                            </div>
                            <p className="t_error hidden">환급금액을 입력하세요</p>
                        </div>
                    </div>
                </div>
                <div className="fix_botm">
                    <Link to="../refund" className="btn-pk blue n"><span>환급</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Change;