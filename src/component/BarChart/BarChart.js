import React, { useState, useEffect } from 'react';
import $ from "jquery";

const BarChart = ({ userPK }) => {
    const [testScore, setTestScore] = useState([]);
    const [myskinType, setMyskinType] = useState(undefined);
    const [myskinTypeName, setMyskinTypeName] = useState("");
    const [myskinTypeImg, setMyskinTypeImg] = useState("");
    const [myskinTypetxt, setMyskinTypetxt] = useState("");
    const [D_O, setD_O] = useState([]);
    const [R_S, setR_S] = useState([]);
    const [N_P, setN_P] = useState([]);
    const [T_W, setT_W] = useState([]);
    const [do_alpha, setDo_alpha] = useState([]);
    const [rs_alpha, setRs_alpha] = useState([]);
    const [np_alpha, setNp_alpha] = useState([]);
    const [tw_alpha, setTw_alpha] = useState([]);

    useEffect(() => {
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member/my_skin?member_id=" + userPK,
            success: (response) => {
                const results = response[0];
                if (results === undefined) return;

                setDo_alpha(results.do_alphabet);
                setRs_alpha(results.rs_alphabet);
                setNp_alpha(results.np_alphabet);
                setTw_alpha(results.tw_alphabet);

                setTestScore(() => {
                    const result = [];
                    setD_O(((results.do_score - 4) * 100 / 12).toFixed(0));
                    setR_S(100 - ((results.rs_score - 6) * 100 / 18).toFixed(0));
                    setN_P(100 - ((results.np_score - 4) * 100 / 12).toFixed(0));
                    setT_W(100 - ((results.tw_score - 6) * 100 / 18).toFixed(0));
                    result.push(D_O);
                    result.push(R_S);
                    result.push(N_P);
                    result.push(T_W);
                    return result;
                });
                setMyskinType(results.do_alphabet + results.rs_alphabet + results.np_alphabet + results.tw_alphabet);
                skinTypeName(results.do_alphabet + results.rs_alphabet + results.np_alphabet + results.tw_alphabet);
            },
            error: (response) => console.log(response)
        });
    }, []);

    const skinTypeName = (myskinType) => {
        switch (myskinType) {
            case 'DSPW':
                setMyskinTypeName("예민한 고슴도치");
                setMyskinTypeImg(require("../../assets/images/animal/DSPW.png"));
                setMyskinTypetxt("고슴도치처럼 외부 환경에 민감하게 반응하고 보송보송한 피부");
                break;
            case 'DSPT':
                setMyskinTypeName("상냥한 사슴");
                setMyskinTypeImg(require("../../assets/images/animal/DSPT.png"));
                setMyskinTypetxt("사슴처럼 외부 환경에 연약하고 보송보송하고 탱탱한 피부");
                break;
            case 'DSNW':
                setMyskinTypeName("눈치 빠른 여우");
                setMyskinTypeImg(require("../../assets/images/animal/DSNW.png"));
                setMyskinTypetxt("여우처럼 외부 환경에 민감하게 반응하고 보송보송하고 균일한 피부");
                break;
            case 'DSNT':
                setMyskinTypeName("작고 소중한 다람쥐");
                setMyskinTypeImg(require("../../assets/images/animal/DSNT.png"));
                setMyskinTypetxt("다람쥐처럼 보송보송하고 균일하고 탱탱한 피부");
                break;
            case 'DRPW':
                setMyskinTypeName("패션왕 얼룩말");
                setMyskinTypeImg(require("../../assets/images/animal/DRPW.png"));
                setMyskinTypetxt("얼룩말처럼 외부 환경에 강하고 보송보송한 피부");
                break;
            case 'DRPT':
                setMyskinTypeName("멋진 무늬의 기린");
                setMyskinTypeImg(require("../../assets/images/animal/DRPT.png"));
                setMyskinTypetxt("기린처럼 외부 환경에 강하고 보송보송하고 탱탱한 피부");
                break;
            case 'DRNW':
                setMyskinTypeName("여유로운 거북이");
                setMyskinTypeImg(require("../../assets/images/animal/DRNW.png"));
                setMyskinTypetxt("거북이처럼 외부 환경에 강하고 보송보송하고 균일한 피부");
                break;
            case 'DRNT':
                setMyskinTypeName("안아주고 싶은 코알라");
                setMyskinTypeImg(require("../../assets/images/animal/DRNT.png"));
                setMyskinTypetxt("코알라처럼 외부 환경에 강하고 보송보송하고 균일하고 탱탱한 피부");
                break;
            case 'OSPW':
                setMyskinTypeName("폴짝폴짝 개구리");
                setMyskinTypeImg(require("../../assets/images/animal/OSPW.png"));
                setMyskinTypetxt("개구리처럼 외부 환경에 연약하고 매끄러운 피부");
                break;
            case 'OSPT':
                setMyskinTypeName("연약한 개복치");
                setMyskinTypeImg(require("../../assets/images/animal/OSPT.png"));
                setMyskinTypetxt("개복치처럼 외부 환경에 연약하고 매끄럽고 탱탱한 피부");
                break;
            case 'OSNW':
                setMyskinTypeName("왕관을 쓴 해마");
                setMyskinTypeImg(require("../../assets/images/animal/OSNW.png"));
                setMyskinTypetxt("해마처럼 외부 환경에 연약하고 매끄럽고 균일한 피부");
                break;
            case 'OSNT':
                setMyskinTypeName("말랑말랑 해파리");
                setMyskinTypeImg(require("../../assets/images/animal/OSNT.png"));
                setMyskinTypetxt("해파리처럼 외부 환경에 연약하고 매끄럽고 균일하고 탱탱한 피부");
                break;
            case 'ORPW':
                setMyskinTypeName("춤추는 바다코끼리");
                setMyskinTypeImg(require("../../assets/images/animal/ORPW.png"));
                setMyskinTypetxt("바다코끼리처럼 외부 환경에 강하고 매끄러운 피부");
                break;
            case 'ORPT':
                setMyskinTypeName("헤엄치는 해달");
                setMyskinTypeImg(require("../../assets/images/animal/ORPT.png"));
                setMyskinTypetxt("해달처럼 외부 환경에 강하고 매끄럽고 탱탱한 피부");
                break;
            case 'ORNW':
                setMyskinTypeName("뒤뚱뒤뚱 펭귄");
                setMyskinTypeImg(require("../../assets/images/animal/ORNW.png"));
                setMyskinTypetxt("펭귄처럼 외부 환경에 강하고 매끄럽고 균일한 피부");
                break;
            case 'ORNT':
                setMyskinTypeName("행복한 고래");
                setMyskinTypeImg(require("../../assets/images/animal/ORNT.png"));
                setMyskinTypetxt("고래처럼 외부 환경에 강하고 매끄럽고 균일하고 탱탱한 피부");
                break;
        }
    };

    return (
        <div className="b_chart">
            <p className="skinType">{myskinType ? myskinType : "undefined"}</p>
            <p className="skinTypeName">{myskinTypeName ? myskinTypeName : "undefined"}</p>
            <img className="skinTypeImg" src={myskinTypeImg ? myskinTypeImg : require("../../assets/images/common/bg_reviewbox.jpg")} />
            <p className="skinTypetxt">{myskinTypetxt ? myskinTypetxt : "undefined"}</p>
            <div className="tit">
                <div className="balancing">
                    {
                        D_O < 25 ?
                            <div>
                                <p className="bar_percent2" style={{ color: "#a91100", fontWeight: "bolder" }}>D<br /><span>{D_O ? (100 - D_O) : "undefined"}%</span><br />건성</p>
                                <div className="bar_chart" style={{ backgroundColor: "rgba(255,191,183,0.62)" }}><span style={{ width: `${(100 - D_O)}%`, backgroundColor: "#f8a79e" }}></span></div>
                                <p className="bar_percent">O<br /><span className="c-gray">{D_O ? D_O : "undefined"}%</span><br />지성</p>
                                <p className="b_t1">유수분 균형이 좋지 않은 건성입니다.</p>
                            </div>
                            : (D_O >= 25) && (D_O < 45) ?
                                <div>
                                    <p className="bar_percent2" style={{ color: "#a91100", fontWeight: "bolder" }}>D<br /><span>{D_O ? (100 - D_O) : "undefined"}%</span><br />건성</p>
                                    <div className="bar_chart" style={{ backgroundColor: "rgba(255,191,183,0.62)" }}><span style={{ width: `${(100 - D_O)}%`, backgroundColor: "#f8a79e" }}></span></div>
                                    <p className="bar_percent">O<br /><span className="c-gray">{D_O ? D_O : "undefined"}%</span><br />지성</p>
                                    <p className="b_t1">유수분 균형이 좋은 건성입니다.</p>
                                </div>
                                : (D_O >= 45) && (D_O <= 54) ?
                                    <div>
                                        <p className="bar_percent2" style={{ color: "#a91100", fontWeight: "bolder" }}>D<br /><span>{D_O ? (100 - D_O) : "undefined"}%</span><br />건성</p>
                                        <div className="bar_chart" style={{ backgroundColor: "rgba(255,191,183,0.62)" }}><span style={{ width: `${(100 - D_O)}%`, backgroundColor: "#f8a79e" }}></span></div>
                                        <p className="bar_percent">O<br /><span className="c-gray">{D_O ? D_O : "undefined"}%</span><br />지성</p>
                                        <p className="b_t1">유수분 균형이 좋은 피부입니다.</p>
                                    </div>
                                    : (D_O > 54) && (D_O <= 75) ?
                                        <div>
                                            <p className="bar_percent2">D<br /><span className="c-gray">{D_O ? (100 - D_O) : "undefined"}%</span><br />건성</p>
                                            <div className="bar_chart" style={{ backgroundColor: "rgba(255,191,183,0.62)" }}><span style={{ left: `${(100 - D_O)}%`, width: `${D_O}%`, backgroundColor: "#f8a79e" }}></span></div>
                                            <p className="bar_percent" style={{ color: "#a91100", fontWeight: "bolder" }}>O<br /><span>{D_O ? D_O : "undefined"}%</span><br />지성</p>
                                            <p className="b_t1">유수분 균형이 좋은 지성입니다.</p>
                                        </div>
                                        :
                                        <div>
                                            <p className="bar_percent2">D<br /><span className="c-gray">{D_O ? (100 - D_O) : "undefined"}%</span><br />건성</p>
                                            <div className="bar_chart" style={{ backgroundColor: "rgba(255,191,183,0.62)" }}><span style={{ left: `${(100 - D_O)}%`, width: `${D_O}%`, backgroundColor: "#f8a79e" }}></span></div>
                                            <p className="bar_percent" style={{ color: "#a91100", fontWeight: "bolder" }}>O<br /><span>{D_O ? D_O : "undefined"}%</span><br />지성</p>
                                            <p className="b_t1">유수분 균형이 좋지 않은 지성입니다.</p>
                                        </div>
                    }
                </div>
                <div className="strong">
                    {
                        rs_alpha == 'S' ?
                            <div>
                                <p className="bar_percent2" style={{ color: "rgb(0,113,178)", fontWeight: "bolder" }}>S<br /><span>{R_S ? (100 - R_S) : (R_S == 0) ? 100 : "undefined"}%</span><br />민감성</p>
                                <div className="bar_chart" style={{ backgroundColor: "rgba(147,181,198,0.62)" }}><span style={{ width: `${(100 - R_S)}%`, backgroundColor: "#71a1b6" }}></span></div>
                                <p className="bar_percent">R<br /><span className="c-gray">{R_S ? R_S : (R_S == 0) ? 0 : "undefined"}%</span><br />저항성</p>
                                <p className="b_t1">민감성 높은 피부입니다.</p>
                            </div>
                            :
                            <div>
                                <p className="bar_percent2">S<br /><span className="c-gray">{R_S ? (100 - R_S) : "undefined"}%</span><br />민감성</p>
                                <div className="bar_chart" style={{ backgroundColor: "rgba(147,181,198,0.62)" }}><span style={{ left: `${(100 - R_S)}%`, width: `${R_S}%`, backgroundColor: "#71a1b6" }}></span></div>
                                <p className="bar_percent" style={{ color: "rgb(0,113,178)", fontWeight: "bolder" }}>R<br /><span>{R_S ? R_S : "undefined"}%</span><br />저항성</p>
                                <p className="b_t1">저항성 높은 피부입니다.</p>
                            </div>
                    }
                </div>
                <div className="even">
                    {
                        np_alpha == "P" ?
                            <div>
                                <p className="bar_percent2" style={{ color: "rgb(28,140,20)", fontWeight: "bolder" }}>P<br /><span>{N_P ? (100 - N_P) : (N_P == 0) ? 100 : "undefined"}%</span><br />색소성</p>
                                <div className="bar_chart" style={{ backgroundColor: "rgba(132,169,140,0.62)" }}><span style={{ width: `${(100 - N_P)}%`, backgroundColor: "#6ea97b" }}></span></div>
                                <p className="bar_percent">N<br /><span className="c-gray">{N_P ? N_P : (N_P == 0) ? 0 : "undefined"}%</span><br />비색소성</p>
                                <p className="b_t1">색소성 높은 피부입니다.</p>
                            </div>
                            :
                            <div>
                                <p className="bar_percent2">P<br /><span className="c-gray">{N_P ? (100 - N_P) : "undefined"}%</span><br />색소성</p>
                                <div className="bar_chart" style={{ backgroundColor: "rgba(132,169,140,0.62)" }}><span style={{ left: `${(100 - N_P)}%`, width: `${N_P}%`, backgroundColor: "#6ea97b" }}></span></div>
                                <p className="bar_percent" style={{ color: "rgb(28,140,20)", fontWeight: "bolder" }}>N<br /><span>{N_P ? N_P : "undefined"}%</span><br />비색소성</p>
                                <p className="b_t1">균일한 비색소성 피부입니다.</p>
                            </div>
                    }
                </div>
                <div className="tight">
                    {
                        tw_alpha == "W" ?
                            <div>
                                <p className="bar_percent2" style={{ color: "rgb(197,174,8)", fontWeight: "bolder" }}>W<br /><span>{T_W ? (100 - T_W) : (T_W == 0) ? 100 : "undefined"}%</span><br />주름</p>
                                <div className="bar_chart" style={{ backgroundColor: "rgba(253,204,110,0.56)" }}><span style={{ width: `${(100 - T_W)}%`, backgroundColor: "#fcbf49" }}></span></div>
                                <p className="bar_percent">T<br /><span className="c-gray">{T_W ? T_W : (T_W == 0) ? 0 : "undefined"}%</span><br />탄력</p>
                                <p className="b_t1">탄력이 부족한 피부입니다.</p>
                            </div>
                            :
                            <div>
                                <p className="bar_percent2">W<br /><span className="c-gray">{T_W ? (100 - T_W) : "undefined"}%</span><br />주름</p>
                                <div className="bar_chart" style={{ backgroundColor: "rgba(253,204,110,0.56)" }}><span style={{ left: `${(100 - T_W)}%`, width: `${T_W}%`, backgroundColor: "#fcbf49" }}></span></div>
                                <p className="bar_percent" style={{ color: "rgb(197,174,8)", fontWeight: "bolder" }}>T<br /><span>{T_W ? T_W : "undefined"}%</span><br />탄력</p>
                                <p className="b_t1">탄력이 좋은 피부입니다.</p>
                            </div>
                    }
                </div>
            </div>
            <div className="txt_box1 pr-mb1">
            </div>
        </div>
    );
};

export default BarChart;
