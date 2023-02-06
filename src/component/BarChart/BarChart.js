import React, { useState, useEffect} from 'react';
import $ from "jquery";
const BarChart = ({ userPK }) => {
    const [testScore, setTestScore] = useState([]);
    const [myskinType, setMyskinType] = useState(undefined);
    const [myskinTypeName, setMyskinTypeName] = useState("");
    const [D_O,setD_O] = useState([]);
    const [R_S,setR_S] = useState([]);
    const [N_P,setN_P] = useState([]);
    const [T_W,setT_W] = useState([]);
    const [do_alpha, setDo_alpha] = useState([])
    const [rs_alpha, setRs_alpha] = useState([])
    const [np_alpha, setNp_alpha] = useState([])
    const [tw_alpha, setTw_alpha] = useState([])

    useEffect(() => {
        $.ajax({
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/myskin/?search=" + userPK,
            success: (response) => {
                const results = response.results[0];
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
                    // setD_O(results.balancing_score.toFixed(0));
                    // setR_S(results.strong_score.toFixed(0));
                    // setN_P(results.even_score.toFixed(0));
                    // setT_W(results.tight_score.toFixed(0));
                    // setStability(results.target_id.target_score.toFixed(0))
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
                setMyskinTypeName("건조한 민감성 색소 주름 피부");
                break;
            case 'DSPT':
                setMyskinTypeName("건조한 민감성 색소 탄력 피부");
                break;
            case 'DSNW':
                setMyskinTypeName("건조한 민감성 비색소 주름 피부");
                break;
            case 'DSNT':
                setMyskinTypeName("건조한 민감성 비색소 탄력 피부");
                break;
            case 'DRPW':
                setMyskinTypeName("건조한 저항성 색소 주름 피부");
                break;
            case 'DRPT':
                setMyskinTypeName("건조한 저항성 색소 탄력 피부");
                break;
            case 'DRNW':
                setMyskinTypeName("건조한 저항성 비색소 주름 피부");
                break;
            case 'DRNT':
                setMyskinTypeName("건조한 저항성 비색소 탄력 피부");
                break;
            case 'OSPW':
                setMyskinTypeName("지성의 민감성 색소 주름 피부");
                break;
            case 'OSPT':
                setMyskinTypeName("지성의 민감성 색소 탄력 피부");
                break;
            case 'OSNW':
                setMyskinTypeName("지성의 민감성 비색소 주름 피부");
                break;
            case 'OSNT':
                setMyskinTypeName("지성의 민감성 비색소 탄력 피부");
                break;
            case 'ORPW':
                setMyskinTypeName("지성의 저항성 색소 주름 피부");
                break;
            case 'ORPT':
                setMyskinTypeName("지성의 저항성 색소 탄력 피부");
                break;
            case 'ORNW':
                setMyskinTypeName("지성의 저항성 비색소 주름 피부");
                break;
            case 'ORNT':
                setMyskinTypeName("지성의 저항성 비색소 탄력 피부");
                break;
        }
    }

    return (
        <div className="b_chart">
            <p className="skinType">{myskinType ? myskinType : "undefined"}</p>
            <p className="skinTypeName">{myskinTypeName ? myskinTypeName : "undefined"}</p>
            {/*<img className="skinTypeImg" src={require("../../assets/images/tmp_mem.jpg")} />*/}
            {/*<img className="skinTypeImg" src={require(`../../assets/images/${myskinType}.jpg`)} />*/}
            <div className="tit">
                <div className="balancing">
                    {
                        D_O < 25 ?
                            <div>
                                <p className="bar_percent2" style={{color: "#a91100", fontWeight:"bolder"}}>D<br/><span>{D_O ? (100 - D_O) : "undefined"}%</span><br/>건성</p>
                                <div className="bar_chart" style={{backgroundColor: "rgba(255,191,183,0.62)"}}><span style={{width: `${(100 - D_O)}%`, backgroundColor: "#f8a79e"}}></span></div>
                                <p className="bar_percent">O<br/><span className="c-gray">{D_O ? D_O : "undefined"}%</span><br/>지성</p>
                                <p className="b_t1">유수분 균형이 좋지 않은 건성입니다.</p>
                            </div>
                        : (D_O >= 25) && (D_O < 45) ?
                            <div>
                                <p className="bar_percent2" style={{color: "#a91100", fontWeight:"bolder"}}>D<br/><span>{D_O ? (100 - D_O) : "undefined"}%</span><br/>건성</p>
                                <div className="bar_chart" style={{backgroundColor: "rgba(255,191,183,0.62)"}}><span style={{width: `${(100 - D_O)}%`, backgroundColor: "#f8a79e"}}></span></div>
                                <p className="bar_percent">O<br/><span className="c-gray">{D_O ? D_O : "undefined"}%</span><br/>지성</p>
                                <p className="b_t1">유수분 균형이 좋은 건성입니다.</p>
                            </div>
                        : (D_O >= 45) && (D_O <= 54) ?
                            <div>
                                <p className="bar_percent2" style={{color: "#a91100", fontWeight:"bolder"}}>D<br/><span>{D_O ? (100 - D_O) : "undefined"}%</span><br/>건성</p>
                                <div className="bar_chart" style={{backgroundColor: "rgba(255,191,183,0.62)"}}><span style={{width: `${(100 - D_O)}%`, backgroundColor: "#f8a79e"}}></span></div>
                                <p className="bar_percent">O<br/><span className="c-gray">{D_O ? D_O : "undefined"}%</span><br/>지성</p>
                                <p className="b_t1">유수분 균형이 좋은 피부입니다.</p>
                            </div>
                        : (D_O > 54) && (D_O <= 75) ?
                            <div>
                                <p className="bar_percent2">D<br/><span className="c-gray">{D_O ? (100 - D_O) : "undefined"}%</span><br/>건성</p>
                                <div className="bar_chart" style={{backgroundColor: "rgba(255,191,183,0.62)"}}><span style={{left: `${(100-D_O)}%`, width: `${D_O}%`, backgroundColor: "#f8a79e"}}></span></div>
                                <p className="bar_percent" style={{color: "#a91100", fontWeight:"bolder"}}>O<br/><span>{D_O ? D_O : "undefined"}%</span><br/>지성</p>
                                <p className="b_t1">유수분 균형이 좋은 지성입니다.</p>
                            </div>
                        :
                            <div>
                                <p className="bar_percent2">D<br/><span className="c-gray">{D_O ? (100 - D_O) : "undefined"}%</span><br/>건성</p>
                                <div className="bar_chart" style={{backgroundColor: "rgba(255,191,183,0.62)"}}><span style={{left: `${(100-D_O)}%`, width: `${D_O}%`, backgroundColor: "#f8a79e"}}></span></div>
                                <p className="bar_percent" style={{color: "#a91100", fontWeight:"bolder"}}>O<br/><span>{D_O ? D_O : "undefined"}%</span><br/>지성</p>
                                <p className="b_t1">유수분 균형이 좋지 않은 지성입니다.</p>
                            </div>
                    }
                </div>
                <div className="strong">
                    {
                        rs_alpha == 'S' ?
                            <div>
                                <p className="bar_percent2" style={{color: "rgb(0,113,178)", fontWeight:"bolder"}}>S<br/><span>{R_S ? (100 - R_S) : "undefined"}%</span><br/>민감성</p>
                                <div className="bar_chart" style={{backgroundColor: "rgba(147,181,198,0.62)"}}><span style={{ width: `${(100-R_S)}%`, backgroundColor: "#71a1b6"}}></span></div>
                                <p className="bar_percent">R<br/><span className="c-gray">{R_S ? R_S : "undefined"}%</span><br/>저항성</p>
                                <p className="b_t1">민감성 높은 피부입니다.</p>
                            </div>
                            :
                            <div>
                                <p className="bar_percent2">S<br/><span className="c-gray">{R_S ? (100 - R_S) : "undefined"}%</span><br/>민감성</p>
                                <div className="bar_chart" style={{backgroundColor: "rgba(147,181,198,0.62)"}}><span style={{ left: `${(100 - R_S)}%`, width: `${R_S}%`, backgroundColor: "#71a1b6"}}></span></div>
                                <p className="bar_percent" style={{color: "rgb(0,113,178)", fontWeight:"bolder"}}>R<br/><span>{R_S ? R_S : "undefined"}%</span><br/>저항성</p>
                                <p className="b_t1">저항성 높은 피부입니다.</p>
                            </div>
                    }
                </div>
                <div className="even">
                    {
                        np_alpha == "P" ?
                            <div>
                                <p className="bar_percent2" style={{color: "rgb(28,140,20)", fontWeight:"bolder"}}>P<br/><span>{N_P ? (100 - N_P) : "undefined"}%</span><br/>색소성</p>
                                <div className="bar_chart" style={{backgroundColor: "rgba(132,169,140,0.62)"}}><span style={{width: `${(100 - N_P)}%`, backgroundColor: "#6ea97b"}}></span></div>
                                <p className="bar_percent">N<br/><span className="c-gray">{N_P ? N_P : "undefined"}%</span><br/>비색소성</p>
                                <p className="b_t1">색소성 높은 피부입니다.</p>
                            </div>
                            :
                            <div>
                                <p className="bar_percent2">P<br/><span className="c-gray">{N_P ? (100-N_P) : "undefined"}%</span><br/>색소성</p>
                                <div className="bar_chart" style={{backgroundColor: "rgba(132,169,140,0.62)"}}><span style={{left: `${(100-N_P)}%`, width: `${N_P}%`, backgroundColor: "#6ea97b"}}></span></div>
                                <p className="bar_percent" style={{color: "rgb(28,140,20)", fontWeight:"bolder"}}>N<br/><span>{N_P ? N_P : "undefined"}%</span><br/>비색소성</p>
                                <p className="b_t1">균일한 비색소성 피부입니다.</p>
                            </div>
                    }
                </div>
                <div className="tight">
                    {
                        tw_alpha == "W" ?
                            <div>
                                <p className="bar_percent2" style={{color: "rgb(197,174,8)", fontWeight:"bolder"}}>W<br/><span>{T_W ? (100 - T_W) : "undefined"}%</span><br/>주름</p>
                                <div className="bar_chart" style={{backgroundColor: "rgba(253,204,110,0.56)"}}><span style={{width: `${(100 - T_W)}%`, backgroundColor: "#fcbf49"}}></span></div>
                                <p className="bar_percent">T<br/><span className="c-gray">{T_W ? T_W : "undefined"}%</span><br/>탄력</p>
                                <p className="b_t1">탄력이 부족한 피부입니다.</p>
                            </div>
                            :
                            <div>
                                <p className="bar_percent2">W<br/><span className="c-gray">{T_W ? (100 - T_W) : "undefined"}%</span><br/>주름</p>
                                <div className="bar_chart" style={{backgroundColor: "rgba(253,204,110,0.56)"}}><span style={{left: `${(100 - T_W)}%`, width: `${T_W}%`, backgroundColor: "#fcbf49"}}></span></div>
                                <p className="bar_percent" style={{color: "rgb(197,174,8)", fontWeight:"bolder"}}>T<br/><span>{T_W ? T_W: "undefined"}%</span><br/>탄력</p>
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