import { current } from "@reduxjs/toolkit";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase, addCart } from "../store";

function Cart() {
  let newData = useSelector((state) => {
    return state.newData;
  });
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  return (
    <div>
      {state.user}의 바구니
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>

        <tbody>
          {newData.map((a, i) => {
            return (
              <tr key={i}>
                <td>{newData[i].id}</td>
                <td>{newData[i].name}</td>
                <td>{newData[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      // console.log(a); // 깨달음 (a는 현재 object나 array를 나타내는구나)
                      dispatch(increase(a.id));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}

          {/* <tr>
            <td>{newData[1].id}</td>
            <td>{newData[1].name}</td>
            <td>{newData[1].count}</td>
            <td>??</td>
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
