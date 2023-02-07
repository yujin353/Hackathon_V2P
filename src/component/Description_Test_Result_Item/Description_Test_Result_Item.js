import React, { useRef } from "react"
import $ from "jquery";

const Description_Test_Result_Item = () => {
    const btnRef2 = useRef(null)

    return (
        <>
            <div className="detailbox">
                <div className="pr-mb2">
                    <div className="hd_tit">
                        <h2 className="h_tit1" style={{textAlign: "center", marginTop: "4vw"}}>평가 항목 설명</h2>
                        <p className="b_txt1"><span><strong className="bshadow1">D : DRY - 건성</strong><br />피지 양이 적어 수분보유 능력이 부족한 피부입니다.<br /><span><strong className="bcolor1">특징 |</strong> 건조함, 칙칙함, 거칠거칠함, 간지러움, 따가움, 하얗게 일어나는 각질, 건선, 피부갈라짐, 잔주름</span></span></p>
                        <p className="b_txt1"><span><strong className="bshadow1">O : OILY - 지성</strong><br />피지 생성이 많아 번들거리거나 여드름이 발생하는 피부입니다.<br /><span><strong className="bcolor1">특징 |</strong> 번들거림, 여드름, 블랙헤드, 화이트헤드, 넓은모공</span></span></p>
                        <p className="b_txt1"><span><strong className="bshadow2">R : RESISTANT - 저항성</strong><br />피부 민감도가 낮아 외부 자극에 대한 방어력이 높은 피부입니다.<br /><span><strong className="bcolor2">특징 |</strong> 사용하는 화장품이나 환경에 변화에도 피부의 변화가 두드러지지 않음</span></span></p>
                        <p className="b_txt1"><span><strong className="bshadow2">S : SENSITIVE - 민감성</strong><br />피부 민감도가 높아 외부 자극에 대한 반응이 크게 나타나는 피부입니다.<br /><span><strong className="bcolor2">특징 |</strong> 따가움, 여드름, 붉어짐, 간지러움</span></span></p>
                        <p className="b_txt1"><span><strong className="bshadow3">N : NON-PIGMENT - 비색소성</strong><br />멜라닌 활성도가 낮아 색소침착도가 낮은 피부입니다.<br /><span><strong className="bcolor3">특징 |</strong> 타고난 피부색과는 상관 없이, 피부 전체 색상이 균일하며, 햇빛을 쬐어도 다시 본래 색으로 돌아옴</span></span></p>
                        <p className="b_txt1"><span><strong className="bshadow3">P : PIGMENT - 색소성</strong><br />멜라닌 활성도가 높아 색소침착도가 높은 피부입니다.<br /><span><strong className="bcolor3">특징 |</strong> 타고난 피부색과는 상관 없이, 기미, 주근깨, 잡티 등이 쉽게 생김</span></span></p>
                        <p className="b_txt1"><span><strong className="bshadow4">T : TIGHT - 탄력성</strong><br />피부의 노화지수가 낮아 피부 결이 고르고 주름이 적은 피부입니다.<br /><span><strong className="bcolor4">특징 |</strong> 배게 눌린자국이 오래가지 않음, 피부가 단단하고 두꺼움</span></span></p>
                        <p className="b_txt1"><span><strong className="bshadow4">W : WRINKLED - 주름성</strong><br />피부의 노화지수가 높아 피부 결이 고르지 않고 주름이 많은 피부입니다.<br /><span><strong className="bcolor4">특징 |</strong> 배게 눌린자국이 오래감, 피부가 연하고 얇음, 눈가주름, 입가주름, 세로로 늘어진 모공</span></span></p>
                    </div>
                </div>

                <div className="pr-mb2">
                    <div className="hd_tit">
                        <h2 className="h_tit1" style={{textAlign: "center"}}>결과 설명</h2>
                        <p className="b_txt1"><span><strong>밸런싱 <span className="eng-gray">BALANCING</span></strong><br />피부 유수분의 균형을 나타내는 지수입니다.<br /><span className="subgray">건성과 지성에 치우치지 않은 균형잡힌 피부일수록 높은 점수를 나타냅니다.</span></span></p>
                        <p className="b_txt1"><span><strong>견고성 <span className="eng-gray">STRONGNESS</span></strong><br />피부 본연의 힘을 나타내는 지수입니다.<br /><span className="subgray">저항성에 가까운 피부일수록 높은 점수를 나타냅니다.</span></span></p>
                        <p className="b_txt1"><span><strong>균일성 <span className="eng-gray">EVENNESS</span></strong><br />피부톤의 균일함을 나타내는 지수입니다.<br /><span className="subgray">비색소성에 가까운 피부일수록 높은 점수를 나타냅니다.</span></span></p>
                        <p className="b_txt1"><span><strong>탄력성 <span className="eng-gray">TIGHTNESS</span></strong><br />피부 탄력성을 나타내는 지수입니다.<br /><span className="subgray">탄력성에 가까운 피부일수록 높은 점수를 나타냅니다.</span></span></p>
                        <p className="b_txt1"><span><strong>안정성 <span className="eng-gray">STABILITY</span></strong><br />피부의 안정성을 나타내는 지수입니다.<br /><span className="subgray">안정성에 가까운 피부일수록 높은 점수를 나타냅니다.</span></span></p>
                    </div>
                </div>
            </div>
            <button type="button" id="btn_box_more" className="btn-pk s blue2 bdrs w100p" ref={btnRef2} style={{marginTop: "3vw"}}
                    onClick={() => {
                        $(btnRef2.current).children(".i-aft").toggleClass("i_arr_b1 i_arr_b2")
                        if ($(btnRef2.current).children(".i-aft").contents()[0].data === "평가 항목 세부 설명 보기") {
                            $(btnRef2.current).children(".i-aft").contents()[0].data = "닫기"
                            $(btnRef2.current).prev().show()
                        } else {
                            $(btnRef2.current).children(".i-aft").contents()[0].data = "평가 항목 세부 설명 보기"
                            $(btnRef2.current).prev().hide()
                        }
                    }}>
                <span className="i-aft i_arr_b1">평가 항목 세부 설명 보기</span>
            </button>
        </>
    )
}

export default Description_Test_Result_Item;
