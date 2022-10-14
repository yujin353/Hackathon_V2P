import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../../../component"
import PrivacyPolicy from "./PrivacyPolicy";
import KiinPolicy from "./KiinPolicy";
import $ from "jquery"

const Policy = () => {
    const navigate = useNavigate();
    const [firstModal, setFirstModal] = useState(false)
    const [secondModal, setSecondModal] = useState(false)
    const [checkBox, setCheckBox] = useState({
        agree0: false, agree1: false, agree2: false, pushAgree: false
    })
    const errorRef1 = useRef(null)
    const errorRef2 = useRef(null)

    const onClickCheckBox = (e) => {
        const name = e.target.name
        setCheckBox((prevState) => {
            return {
                ...prevState,
                [name]: !prevState[name]
            }
        });
    }
    const fullConsent = () => {
        setCheckBox(() => {
            if(checkBox.agree0 === true)return({agree0: false, agree1: false, agree2: false, pushAgree: false})
            else return({agree0: true, agree1: true, agree2: true, pushAgree: true})
        })
    }

    useEffect(() => {
        if($("#agree1").is(':checked')){
            errorRef1.current.className = "p mb40"
            $(errorRef1.current).next().addClass("hidden")
        }
        if ($("#agree2").is(':checked')) {
            errorRef2.current.className = "p mb40"
            $(errorRef2.current).next().addClass("hidden")
        }
    },[checkBox])


    const consentCheck = () => {
        let flag = false;
        if (!$("#agree1").is(':checked')) {
            errorRef1.current.className = "p"
            $(errorRef1.current).next().removeClass("hidden")
            flag = true;
        }
        if (!$("#agree2").is(':checked')) {
            errorRef2.current.className = "p"
            $(errorRef2.current).next().removeClass("hidden")
            flag = true;
        }
        if(flag)return false;
        if ($("#pushAgree").is(':checked')) $("#pushAgree").val("1");
        else $("#pushAgree").val("0");
        localStorage.setItem("policy_checked", true);
        navigate("../signup", {
            replace: true, 
            state: {
                pushAgree:checkBox.pushAgree
            }
        })
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit">이용 약관</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => navigate(-2)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                </div>
            </header>
            <div id="container" className="container sub member">
                <div className="area_member join">
                    <div className="top">
                        <div className="inr-c">
                            <h2 className="h_tit1">서비스 이용을 위한 동의 안내</h2>
                            <p className="t1">서비스 이용에 꼭 필요한 사항입니다.<br/>정책 및 약관을 선택해 모든 내용을 확인해 주세요.</p>
                        </div>
                    </div>
                    <div className="cont">
                        <div className="inr-c">
                            <div className="h">
                                <p className="h_tit1">전체 동의</p>
                                <label className="inp_checkbox">
                                    <input type="checkbox" id="agree0" name="agree0" onChange={fullConsent} checked={checkBox.agree0}/><span>&nbsp;</span>
                                </label>
                            </div>
                            <div className="p mb40" ref={errorRef1}>
                                <p className="t1">[필수]<span>&nbsp;</span>
                                    <Link to="/" className="a_link" onClick={(e) => {e.preventDefault(); setFirstModal(!firstModal)}}>개인정보 처리방침</Link>
                                </p>
                                <Modal open={firstModal} className="policy">
                                    <div id="popPrivacy" className="layerPopup pop_terms">
                                        <div className="popup">
                                            <div className="p_head">
                                                <h2 className="h_tit1 ta-c">개인정보 처리방침</h2>
                                                <button type="button" className="btn_close b-close" onClick={() => { setFirstModal(!firstModal) }}><span>닫기</span>
                                                </button>
                                            </div>
                                            <div className="p_cont">
                                                <PrivacyPolicy />
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                                <label className="inp_checkbox">
                                    <input type="checkbox" id="agree1" name="agree1" onChange={(e)=>onClickCheckBox(e)} checked={checkBox.agree1}/><span>&nbsp;</span>
                                </label>
                            </div>
                            <div id="error_1" className="p t_error mt10 mb20 hidden">개인정보 처리방침에 동의해주시기 바랍니다.</div>

                            <div className="p mb40" ref={errorRef2}>
                                <p className="t1">[필수]<span>&nbsp;</span>
                                    <Link to="/" className="a_link" onClick={(e) => {e.preventDefault(); setSecondModal(!secondModal)}}>키인 서비스 이용약관</Link>
                                </p>
                                <Modal open={secondModal} className="policy">
                                    <div id="popTerms" className="layerPopup pop_terms">
                                        <div className="popup">
                                            <div className="p_head">
                                                <h2 className="h_tit1 ta-c">키인 서비스 이용약관</h2>
                                                <button type="button" className="btn_close b-close" onClick={() => {setSecondModal(!secondModal)}}><span>닫기</span></button>
                                            </div>
                                            <div className="p_cont">
                                                <KiinPolicy />
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                                <label className="inp_checkbox">
                                    <input type="checkbox" id="agree2" name="agree2" onChange={(e)=>onClickCheckBox(e)} checked={checkBox.agree2}/><span>&nbsp;</span>
                                </label>
                            </div>
                            <div id="error_2" className="p t_error mt10 mb20 hidden">키인 서비스 이용약관에 동의해주시기 바랍니다.</div>
                            <div className="p">
                                <p className="t1">
                                    <Link to="/" onClick={(e) => {e.preventDefault()}}>[선택] 맞춤형 혜택 정보 푸시 알림 수신</Link>
                                </p>
                                <label className="inp_checkbox">
                                    <input type="checkbox" id="pushAgree" name="pushAgree" onChange={(e)=>onClickCheckBox(e)} checked={checkBox.pushAgree}/><span>&nbsp;</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fix_botm">
                    <button className="btn-pk blue n" onClick={consentCheck}><span>다음</span></button>
                </div>
            </div>
        </div>
    )
}

export default Policy;