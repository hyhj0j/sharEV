import React, { Component } from "react";
import Identicon from "identicon.js";

class Main extends Component {
  render() {
    return (
      <main>
        <section className="box2 box">
          <div className="box2__column box__title">
            🚗⚡ 전력 거래를 위해 <br></br>자동차 정보를 등록하세요!
          </div>
          <div className="box2__column">
            <form
              className="form2"
              onSubmit={event => {
                event.preventDefault();
                const carNum = this.carInfo1.value;
                const name = this.carInfo2.value;
                const socI = this.carInfo3.value;
                const socR = this.carInfo4.value;

                this.props.setCar(carNum, name, socI, socR);
              }}
            >
              <div className="form-box">
                <input
                  id="carInfo1"
                  ref={input => {
                    this.carInfo1 = input;
                  }}
                  type="text"
                  className="form2"
                  placeholder="차 번호를 입력하세요"
                  required
                />

                <input
                  id="carInfo2"
                  ref={input => {
                    this.carInfo2 = input;
                  }}
                  type="text"
                  className="form2"
                  placeholder="이름을 입력하세요"
                  required
                />

                <input
                  id="carInfo3"
                  ref={input => {
                    this.carInfo3 = input;
                  }}
                  type="text"
                  className="form2"
                  placeholder="현재 전력 상태를 입력하세요"
                  required
                />

                <input
                  id="carInfo4"
                  ref={input => {
                    this.carInfo4 = input;
                  }}
                  type="text"
                  className="form2"
                  placeholder="원하는 전력 상태를 입력하세요"
                  required
                />
                <button type="submit" className="info__btn">
                  정보등록
                </button>
              </div>
            </form>
          </div>
        </section>
        <div className="box__title trades">
          👇전력 거래 목록👇
          <br></br>
          <span className="trades__text">
            [거래하기] 버튼이 없는 포스트잇은 전력 거래 완료를 뜻합니다.
          </span>
        </div>

        <section className="box3 box">
          {this.props.cars.map((car, key) => {
            return (
              <div className="popup" key={key}>
                <div className="popup__title">
                  <img
                    className="mr-2"
                    width="50"
                    height="50"
                    src={`data:image/png;base64,${new Identicon(
                      car.owner,
                      30
                    ).toString()}`}
                  />
                  <span className="">No. {car.id.toString()}</span>

                  {!car.purchased ? (
                    <button
                      className="trade__btn"
                      name={car.id}
                      value={car.price}
                      onClick={event => {
                        this.props.buyCar(
                          event.target.name,
                          event.target.value
                        );
                      }}
                    >
                      거래하기
                    </button>
                  ) : null}
                </div>
                <ul id="postList" className="car__list">
                  <li className="car__info">
                    <p>자동차 번호 : {car.carNum}</p>
                    <p>자동차 주인 이름 : {car.name}</p>
                    <p>자동차 주인 주소 : {car.owner}</p>
                    <p>거래 가격 : {car.price.toString()}</p>
                  </li>
                </ul>
              </div>
            );
          })}
        </section>
      </main>
    );
  }
}

export default Main;
