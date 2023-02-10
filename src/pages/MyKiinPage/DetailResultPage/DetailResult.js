import React, { useState, useEffect, useRef } from "react"
import {  useNavigate, useSearchParams} from "react-router-dom";
import $ from "jquery"
import BarChart from "../../../component/BarChart";
import Description_Test_Result_Item from "../../../component/Description_Test_Result_Item";

const DetailResult = ()=> {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userPK = searchParams.get("id")
    const [username, setUsername] = useState()
    const [bTarget, setBTarget] = useState(undefined);
    const [bTargetType, setBTargetType] = useState("");
    const [bTargetImprovement, setBTargetImprovement] = useState("");
    const [bTargetRec, setBTargetRec] = useState("");

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    useEffect(() => {
        $.ajax({
            async: false, type: "GET",
            url: "https://api.odoc-api.com/api/v1/myskin/?search=" + userPK,
            success: (response) => {
                const results = response.results[0];
                if (results === undefined) return;
                setBTarget(results.target_id.target_name.trim());
                boost(results.target_id.target_name);
            },
            error: (response) => console.log(response)
        });
    }, []);

    useEffect(() => {
        $.ajax({
            async: false, type: 'GET',
            url: "https://api.odoc-api.com/api/v1/members/" + userPK + "/",
            success: (response) => setUsername(response.username),
            error: (response) => navigate("/mykiin")
        });
    }, [])

    const boost = (bTarget) => {
        bTarget = bTarget.trim()
        switch (bTarget) {
            case '극지성':
                setBTargetType("피지 생성이 매우 많은 피부입니다.");
                setBTargetImprovement("여분의 피지와 노폐물을 제거하고 충분한 수분을 보충합니다. 사용하는 화장품의 개수를 줄입니다.");
                setBTargetRec("닦아내는 토너, 피지 흡착 성분으로 이루어진 팩, 오일성분이 적게 든 스킨케어 제품");
                break;
            case '극건성':
                setBTargetType("피지 생성이 매우 부족한 피부입니다. ");
                setBTargetImprovement("유분과 수분이 균형있게 포함된 화장품을 사용합니다. 제형의 점성이 낮은 제품부터 차례대로 충분한 시간을 들여 도포합니다.");
                setBTargetRec("피부 장벽강화성분이 포함된 스킨케어 제품, 오일, 오일성분이 포함된 밤 타입 제품, 수분증발을 억제하는 성분이 포함된 제품");
                break;
            case '모공성':
                setBTargetType("피지 생성이 많고 모공이 잘 막히는 피부입니다. ");
                setBTargetImprovement("모공을 막고 있는 각질을 제거하고 피지를 제거합니다.");
                setBTargetRec("스크럽 타입 클렌저, 살리실산, AHA  등 피지를 녹여주는 제품");
                break;
            case '염증성 민감증':
                setBTargetType("여드름, 접촉성 피부염, 주사성 피부염, 아토피 등 염증성 피부질환을 갖고 있는 피부입니다.");
                setBTargetImprovement("물리적 자극을 최소화하고 청결에 유의하며 피부의 온도를 낮게 유지합니다. 과도하게 피지를 제거하기보다는 피부 스트레스를 낮추고 장벽을 강화합니다.");
                setBTargetRec("모델링팩, 성분이 적게 든 스킨케어 제품, 판테놀, 시카 등 장벽강화 성분이 포함된 제품");
                break;
            case '자극성 민감증':
                setBTargetType("외부의 물리적 자극에 대한 반응이 큰 피부입니다.");
                setBTargetImprovement("최대한 깨끗한 손 이외에 얼굴에 닿는 것이 적도록 주의합니다. 금속 장신구 선택에 유의합니다.");
                setBTargetRec("성분이 적게 든 스킨케어 제품, 판테놀, 시카 등 장벽강화 성분이 포함된 제품");
                break;
            case '화학적 민감성':
                setBTargetType("화학성분에 대한 반응이 큰 피부입니다.");
                setBTargetImprovement("트러블이 났던 화장품의 성분을 주의깊게 살핍니다. 인공적인 향이 들어있는 제품은 사용하지 않습니다.");
                setBTargetRec("성분이 적게 든 스킨케어 제품, 판테놀, 시카 등 장벽강화 성분이 포함된 제품, 향료가 포함되지 않은 제품");
                break;
            case '주사성 민감성':
                setBTargetType("외부 자극에 대한 저항으로 홍조가 잘 나타나는 피부입니다.");
                setBTargetImprovement("물리적 자극을 최소화합니다. 갑작스러운 온도 변화에 주의합니다.");
                setBTargetRec("모델링팩, 성분이 적게 든 스킨케어 제품, 판테놀, 시카 등 장벽강화 성분이 포함된 제품");
                break;
            case '종합 민감성':
                setBTargetType("전체적으로 민감한 피부입니다.");
                setBTargetImprovement("물리적, 화학적 자극에 유의합니다. 청결에 유의합니다. 피부의 온도를 낮게 유지합니다. 깨끗한 손 이외에 얼굴에 닿는 것이 적도록 주의합니다. 인공적인 향이 들어있는 제품은 사용하지 않습니다. 갑작스러운 온도 변화에 주의합니다.");
                setBTargetRec("모델링팩, 성분이 적게 든 스킨케어 제품, 판테놀, 시카 등 장벽강화 성분이 포함된 제품");
                break;
            case '둔감성':
                setBTargetType("피부의 변화가 거의 없는 피부입니다.");
                setBTargetImprovement("묵은 각질을 제거하면 피부 표면 결이 한층 고르게 변화하고, 기능성화장품의 효과가 좋아집니다.");
                setBTargetRec("스크럽, 필링, 토너");
                break;
            case '자외선 색소침착':
                setBTargetType("태양광 노출로 인하여 피부톤에 색소침착이 보이는 피부입니다.");
                setBTargetImprovement("자외선에 직접적으로 노출되지 않도록 모자, 양산, 자외선차단제를 적극적으로 활용합니다. \n" + "이미 발생한 색소침착부위에 미백개선 기능성화장품을 도포하면 개선될 수 있습니다.");
                setBTargetRec("자외선 차단 기능성 화장품, 미백개선 기능성화장품");
                break;
            case '마찰성 색소침착':
                setBTargetType("물리적 마찰로 인하여 피부톤에 색소침착이 보이는 피부입니다.");
                setBTargetImprovement("물리적 마찰이 자주 일어나는 부위에 피부 보습 및 유연화를 도울 수 있는 보습제를 사용합니다. \n" + "이미 발생한 색소침착부위에 미백개선 기능성화장품을 도포하면 개선될 수 있습니다.");
                setBTargetRec("피부 장벽강화성분이 포함된 스킨케어 제품, 수분증발을 억제하는 성분이 포함된 제품, 자외선 차단 기능성 화장품, 미백개선 기능성화장품");
                break;
            case '생활습관성 탄력감소':
                setBTargetType("생활습관으로 인하여 탄력이 감소된 피부입니다.");
                setBTargetImprovement("자외선 차단, 충분한 수분 섭취, 충분한 수면, 바른자세, 흡연환경 노출 줄이기 등 생활습관을 개선합니다.");
                setBTargetRec("피부 장벽강화성분이 포함된 스킨케어 제품, 수분증발을 억제하는 성분이 포함된 제품, 자외선 차단 기능성 화장품, 주름개선 기능성화장품");
                break;
            case '자가판단적 탄력감소':
                setBTargetType("탄력이 감소되었다고 판단한 피부입니다.");
                setBTargetImprovement("자외선 차단, 충분한 수분 섭취, 충분한 수면, 바른자세, 흡연환경 노출 줄이기 등 생활습관을 개선합니다. 스트레스를 개선합니다.");
                setBTargetRec("피부 장벽강화성분이 포함된 스킨케어 제품, 수분증발을 억제하는 성분이 포함된 제품, 자외선 차단 기능성 화장품, 주름개선 기능성화장품");
                break;
        }
    }

    return (
        <div>
            <header id="header" className="header">
                <div className="inr-c">
                    <h2 className="tit"><strong className="c-blue">{username}</strong>님의 키인</h2>
                    <div className="lft">
                        <button type="button" className="btn-back c-white" onClick={() => navigate(-1)}>
                            <span className="i-aft i_back">뒤로</span>
                        </button>
                    </div>
                    <div className="rgh">
                        {/* <button type="button" className="btn_alram on" onClick={() => navigate("/mypage/notification")}>
                            <span className="i-set i_alram"></span>
                        </button> */}
                    </div>
                </div>
            </header>

            <div id="container" className="container sub myk">
                <div className="inr-c">
                    <div className="hd_tit"><h2 className="h_tit1">상세 분석결과</h2></div>
                    <div className="d_R_box">
                        <BarChart userPK={userPK}/>

                        <h2 className="h_tit1" style={{textAlign: "center"}}>부스팅 타겟</h2>
                        <p className="b_txt4">내 피부의 개선을 위하여 우선적으로 공략해야할 목표입니다. 부스팅타겟을 개선하면 내 피부의 전반적인 컨디션이 좋아집니다.</p>
                        <p className="b_txt2"><strong className="c-blue">{username}</strong>님의 부스팅 타겟은 <strong>{bTarget ? bTarget : "undefined"}</strong> 입니다.</p>
                        {
                            bTarget == '없음' ? <p></p>
                            :
                            <div>
                                <p className="b_txt3"><strong>{bTarget ? bTarget : "undefined"} 피부 특징 | </strong> {bTargetType ? bTargetType : "undefined"}</p>
                                <p className="b_txt3"><strong>개선방안 | </strong> {bTargetImprovement ? bTargetImprovement : "undefined"}</p>
                                <p className="b_txt3"><strong>제품추천 | </strong> {bTargetRec ? bTargetRec : "undefined"}</p>
                            </div>
                        }
                    </div>
                    <Description_Test_Result_Item />
                </div>
            </div>
        </div>
    )
}


export default DetailResult;