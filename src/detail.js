import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Detail(props) {
  let [사라짐, 사라짐변경] = useState(true);
  useEffect(() => {
    // Detail 컴포넌트가 처음 update 될 때 이 코드 실행된다.
    console.log("안녕");
    setTimeout(() => {
      사라짐변경(false);
    }, 2000);
  });
  let [count, setCount] = useState(0);

  let { id } = useParams();
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes" + id + ".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          {/* <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}원</p> */}
          <h4 className="pt-5">{props.shoes.find((x) => x.id == id).title}</h4>
          <p>{props.shoes.find((x) => x.id == id).content}</p>
          <p>{props.shoes.find((x) => x.id == id).price}원</p>
          <button className="btn btn-danger">주문하기</button>
          <button
            onClick={() => {
              setCount(count + 1);
            }}
          >
            버튼
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
