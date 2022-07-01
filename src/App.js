import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import data from "./data.js";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./detail.js";
import axios from "axios";
import Cart from "./pages/Cart.js";
import { addCart } from "./store";
import { useDispatch } from "react-redux";

export default function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [count, setCount] = useState(0);
  let [탭, 탭변경] = useState(0);
  let [another, setAnother] = useState(0);
  let dispatch = useDispatch();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">H&Y</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event");
                setAnother(another + 1);
              }}
            >
              Event
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              Main 페이지임
              <button
                onClick={() => {
                  console.log(shoes[1]);
                  dispatch(addCart(shoes[1]));
                }}
              >
                장바구니
              </button>
              <div className="main-bg"></div>
              <div>
                {shoes.map(function (a, i) {
                  return (
                    <Col>
                      <img
                        src={
                          "https://codingapple1.github.io/shop/shoes" +
                          (i + 1) +
                          ".jpg"
                        }
                        width="80%"
                      />
                      <h4>{shoes[i].title}</h4>
                      <p>{shoes[i].content}</p>
                      <p>{shoes[i].price}</p>
                    </Col>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  setCount(count + 1);
                  {
                    if (count >= 2) {
                      alert("로딩중입니다.");
                    } else {
                      axios
                        .get(
                          "https://codingapple1.github.io/shop/data" +
                            (count + 2) +
                            ".json"
                        )
                        .then((결과) => {
                          let newShoes = [...shoes, ...결과.data];
                          setShoes(newShoes);
                          console.log(shoes);
                        });
                    }
                  }
                }}
              >
                버튼
              </button>
              <div>
                <Nav variant="tabs" defaultActiveKey="link0">
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        탭변경(0);
                      }}
                      eventKey="link0"
                    >
                      버튼0
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        탭변경(1);
                      }}
                      eventKey="link1"
                    >
                      버튼1
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        탭변경(2);
                      }}
                      eventKey="link2"
                    >
                      버튼2
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <TabBtn 탭={탭} />
            </div>
          }
        />

        {/* <Route
          path="/detail"
          element={
            <div>
              detail 페이지임
              <Container>
                <Row>
                  {shoes.map(function (a, i) {
                    return (
                      <Col>
                        <img
                          src={
                            "https://codingapple1.github.io/shop/shoes" +
                            (i + 1) +
                            ".jpg"
                          }
                          width="80%"
                        />
                        <h4>{shoes[i].title}</h4>
                        <p>{shoes[i].content}</p>
                        <p>{shoes[i].price}</p>
                      </Col>
                    );
                  })}
                </Row>
              </Container> */}

        {/* <Container>
                <Row>
                  {새신발.map(function (a, i) {
                    return (
                      <Col>
                        <img
                          src={
                            "https://codingapple1.github.io/shop/shoes" +
                            (i + 1) +
                            ".jpg"
                          }
                          width="80%"
                        />
                        <h4>{새신발[i].title}</h4>
                        <p>{새신발[i].content}</p>
                        <p>{새신발[i].price}</p>
                      </Col>
                    );
                  })}
                </Row>
              </Container> */}
        {/* <Detail shoes={data} />
            </div>
          }
        /> */}

        {/* <Route path="/detail/:id" element={<Detail shoes={shoes} />} /> */}
        <Route path="/about" element={<div>about 페이지임</div>}>
          <Route
            path="member"
            element={<div>about 안의 member 페이지임</div>}
          />
          <Route
            path="location"
            element={<div>about 안의 location 페이지임</div>}
          />
        </Route>
        <Route path="/event" element={<Event another={another}></Event>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="*" element={<div>404 NOT FOUND - 없는 페이지</div>} />
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </div>
  );
}

function Event(props) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 10);

    return () => {
      setFade("");
    };
  }, [props.another]);

  return (
    <div className={"start " + fade}>
      <h4>무슨 내용이 들어갈까요?</h4>
      <Outlet></Outlet>
      <inputCode />
    </div>
  );
}

function TabBtn(props) {
  // if (props.탭 == 0) {
  //   return <div>내용0</div>;
  // } else if (props.탭 == 1) {
  //   return <div>내용1</div>;
  // } else if (props.탭 == 2) {
  //   return <div>내용2</div>;
  // }
  let [fade, setFade] = useState("");
  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 10);

    return () => {
      setFade("");
    };
  }, [props.탭]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.탭]}
    </div>
  );
}

function Tab(props) {
  [<div>내용</div>, <div>내용</div>, <div>내용</div>][props.탭];
}

// 아래 코드가 input 한 ㅏ만들고 거기에 유저가 숫자 말고 다른거 입력할 때 마다 console.log에 출력하는 코드다.
// 입력할 때 마다 text usestate가 바뀌는데 내가 useEffect의 두 번째 파라미터에 text를 넣었으니 text가 바뀔 때 마다
// useEffect 안의 코드가 실행되어야 하는것이 맞다.
// 그런데 useState와 useEffect가 오류가 뜬다. 내일 30일 해결해보자. 복습 철저히.

// function inputCode() {
//   let [text, textState] = useState("");

//   useEffect(() => {
//     console.log("그러지마세요");
//   }, [text]);

//   return (
//     <input
//       onChange={(e) => {
//         textState(e.target.value);
//       }}
//     ></input>
//   );
// }
