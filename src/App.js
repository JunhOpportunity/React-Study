import "./styles.css";
// import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Nav, Navbar, Row, Col } from "react-bootstrap";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import data from "./data.js";
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./detail.js";

export default function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();
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
              }}
            >
              Event
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link to="/">Home</Link>
      <Link to="/detail">Detail</Link>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              Main 페이지임
              <div className="main-bg"></div>
            </div>
          }
        />

        <Route
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
              </Container>
              <Detail />
            </div>
          }
        />
        {/* <Route
          path="/about"
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
              </Container>
              <Detail />
            </div>
          }
        /> */}

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
        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="*" element={<div>404 NOT FOUND - 없는 페이지</div>} />
      </Routes>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>무슨 내용이 들어갈까요?</h4>
      <Outlet></Outlet>
    </div>
  );
}
