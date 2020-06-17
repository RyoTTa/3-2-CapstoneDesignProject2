import React from "react";
import "./delCamera.css";
import { withRouter, Link } from "react-router-dom";

class delCamera extends React.Component {
  handleClick() {
    console.log("delete success!");
  }

  render() {
    return (
      <div className="delCam">
        <h1>Camera List</h1>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>카메라 번호</th>
              <th>위치</th>
              <th>위도</th>
              <th>경도</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>001</th>
              <th>공대 9호관</th>
              <th>35.88689</th>
              <th>128.608494</th>
              <th>
                <button>삭제</button>
              </th>
            </tr>
            <tr>
              <th>002</th>
              <th>IT 4호관</th>
              <th>35.888154</th>
              <th>128.6109</th>
              <th>
                <button>삭제</button>
              </th>
            </tr>
            <tr>
              <th>003</th>
              <th>IT융복합관</th>
              <th>35.88814</th>
              <th>128.611388</th>
              <th>
                <button>삭제</button>
              </th>
            </tr>
            <tr>
              <th>004</th>
              <th>일청담</th>
              <th>35.8886653</th>
              <th>128.6120414</th>
              <th>
                <button>삭제</button>
              </th>
            </tr>
            <tr>
              <th>005</th>
              <th>경북대북문</th>
              <th>35.8923811</th>
              <th>128.6094879</th>
              <th>
                <button>삭제</button>
              </th>
            </tr>
            <tr>
              <th>006</th>
              <th>중앙도서관</th>
              <th> 35.8915206</th>
              <th>128.6120736</th>
              <th>
                <button>삭제</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default delCamera;
