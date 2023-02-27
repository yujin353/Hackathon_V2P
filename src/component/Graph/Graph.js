import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import $ from "jquery";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Graph = ({ userPK }) => {
    const [myskinScore, setMyskinScore] = useState([]);
    const [myskinType, setMyskinType] = useState(undefined);
    const [bTarget, setBTarget] = useState(undefined);
    const btnRef1 = useRef(null);
    const navigate = useNavigate();

    /* data to be used in the polar graph */
    const data = {
        labels: ['밸런싱', '견고성', '균일성', '탄력성', '안정성'],
        datasets: [
            {
                label: 'My Skin',
                data: myskinScore,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    // 'rgba(31, 188 , 211, 0.5)',
                    // 'rgba(203, 226 , 180, 0.5)',
                    // 'rgba(247, 191 , 168, 0.5)',
                    // 'rgba(246, 182 , 202, 0.5)',
                    // 'rgba(155, 213 , 189, 0.5)',
                ],
                borderWidth: 1,
            }
        ],
    };

    const options = {
        scales: {
            r: {
                min: 0,
                max: 100,
            },
        }
    };

    /* set skin type test score */
    useEffect(() => {
        $.ajax({
            async: false, type: "GET",
            url: "https://dev.odoc-api.com/member/my_skin?member_id=" + userPK,
            success: (response) => {
                const results = response[0];
                if (results === undefined) return;
                setMyskinScore(() => {
                    const result = [];
                    const balance = results.balancing_score; // 밸런싱
                    const robustness = results.strong_score; // 견고성
                    const uniformity = results.even_score; // 균일성
                    const resilience = results.tight_score; // 탄력성
                    const stability = results.target.target_score; // 안정성
                    result.push(balance);
                    result.push(robustness);
                    result.push(uniformity);
                    result.push(resilience);
                    result.push(stability);
                    return result;
                });
                setMyskinType(results.do_alphabet + results.rs_alphabet + results.np_alphabet + results.tw_alphabet);
                setBTarget(results.target.target_name);
            },
            error: (response) => console.log(response)
        });
    }, []);

    return (
        <>
            <div className="area_type"><PolarArea data={data} options={options} /></div>
            <div className="txt_box1 pr-mb1">
                <div className="box">
                    <p style={{ fontSize: '4vw', height: '6vw' }}>내 피부 타입은 <strong className="c-blue">{myskinType ? myskinType : "undefined"}</strong> 입니다.</p>
                    <p style={{ fontSize: '4vw', height: '18vw' }}>부스팅 타겟은 <strong className="c-blue">{bTarget ? bTarget : "undefined"}</strong>입니다.
                        {bTarget ?
                            <button type="button" className="btn_bmore" ref={btnRef1} onClick={() => navigate(`/mykiin/detailresult?id=${userPK}`)}>
                                <span className="i-aft i_link1">결과 상세분석</span></button>
                            : null}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Graph;
