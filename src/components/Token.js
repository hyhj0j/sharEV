import React, { Component } from "react";
import evt from "./evt.png";
import eth from "./eth.png";
import img_bg from "./img_bg.png";

import "./App";
//id=account를 app.js에서 정의함.(현재 계정주소 저장)
//현재계정에서 토큰주소에 이더보내면 토큰 받도록 해보기...

class Token extends Component {
  render() {
    return (
      <main>
        <section className="box1 box">
          <div className="box1__column">
            <img
              src={img_bg}
              className="img_bg"
              alt="background_img"
              width="480px"
            />
          </div>
          <div className="box1__column">
            <div className="box__title page1">블록체인 기반</div>
            <div className="box__title page2">전기자동차 전력거래 플랫폼</div>

            <p>
              거래 시스템에 블록체인 기술을 융합하여 중앙 집중형으로 이루어지던
              거래를 블록체인 기반의 분산형 거래방식으로 변경합니다.
            </p>
            <p>
              투명하고 신뢰성있는 에너지 거래 시스템을 구축하고 수요 및 공급을
              효율적으로 관리하기 위해 sharEV와 함께해요!
            </p>
            <p>
              *블록체인 : 네트워크에 참여하는 모든 사용자가 관리 대상이 되는
              모든 데이터를 분산하여 저장하는 데이터 분산처리기술
            </p>
          </div>
        </section>
        <section className="box1-1 box">
          <div className="box1__text">
            <div className="box__title wallet__title">나의 토큰 지갑</div>
            <div className="wallet">
              <div className="wallet__column">
                <img
                  src={eth}
                  className="img__token"
                  alt="EVtoken"
                  width="300px"
                />
                <div className="wallet__column wallet__text">
                  현재 보유하고 있는 ethereum
                </div>
                <div className="wallet__column wallet__number eth">
                  {this.props.ethBalance}
                </div>
              </div>
              <div className="wallet__column">
                <img
                  src={evt}
                  className="img__token"
                  alt="EVtoken"
                  width="300px"
                />
                <div className="wallet__column wallet__text">
                  현재 보유하고 있는 EVT
                </div>
                <div className="wallet__column wallet__number evt">
                  {this.props.balance}
                </div>
              </div>
            </div>
            <form
              className="form__box"
              onSubmit={event => {
                event.preventDefault();
                const tokenvalue = this.tokenmount.value;
                this.props.buyToken(tokenvalue);
              }}
            >
              <div className="form1">
                <input
                  id="tokenmount"
                  ref={input => {
                    this.tokenmount = input;
                  }}
                  type="text"
                  className="form-size"
                  placeholder="환전할 이더를 입력하세요."
                  required
                />
                <button type="submit" className="token__btn">
                  환전
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }
}

export default Token;
