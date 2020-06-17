import React from "react";
import profileImg from "./image/woman.png";
import "./login.css";
import { Link } from "react-router-dom";

class signup extends React.Component {
  componentDidMount() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (e) {
      alert(xhr.readyState);
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          if (xhr.responseText == "success") {
            signupTrue();
          } else {
            alert(xhr.responseText);
          }
        } else {
          console.log(xhr.responseText);
        }
      }
    };

    this.requestSignup = () => {
      var id = document.getElementById("id").value;
      var pw = document.getElementById("pw").value;
      var name = document.getElementById("name").value;
      alert("request signup");

      alert("before xhr.open");
      xhr.open(
        "GET",
        "http://155.230.28.207:3000/signup?id=" +
          id +
          "&pw=" +
          pw +
          "&name=" +
          name,
        true
      );
      alert("after xhr.open");

      xhr.send();
      alert("after xhr.send");
    };

    function signupTrue() {
      return <Link to="/loginPage"></Link>;
    }
  }

  render() {
    return (
      <div className="contact-form">
        <img src={profileImg} className="avatar" />
        <h2>Sign Up</h2>
        <form>
          <p>이름</p>
          <input type="text" className="form-control" id="name" />
          <p>아이디</p>
          <input type="text" className="form-control" id="id" />
          <p>비밀번호</p>
          <input type="password" className="form-control" id="pw" />
          <input
            type="submit"
            name=""
            value="Sign Up"
            onClick={() => this.requestSignup()}
          />
          <p>
            이미 계정이 있으신가요?
            <Link to="/loginPage">로그인하기</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default signup;
