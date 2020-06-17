import React from "react";
import profileImg from "./image/man.png";
import "./login.css";
import { withRouter, Link, Redirect, useHistory } from "react-router-dom";

class login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);

    var xhr = new XMLHttpRequest();
    var history = this.props.history;

    xhr.onreadystatechange = function (e) {
      //alert(xhr.readyState);
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          if (xhr.responseText == "success") {
            LoginTrue();
          } else {
            alert(xhr.responseText);
          }
        } else {
          console.log(xhr.responseText);
        }
      }
    };

    this.requestLogin = () => {
      var id = document.getElementById("id").value;
      var pw = document.getElementById("pw").value;

      xhr.open(
        "GET",
        "http://155.230.28.207:3000/login?id=" + id + "&pw=" + pw,
        true
      );
      xhr.send();
      alert("hi");
    };

    function LoginTrue() {
      alert("Login Success");
      try {
        history.replace("/drawMap");
        history.goBack(1);
      } catch (e) {
        alert(e.message);
      }
      /*try {
        this.props.history.push("/addCamera");
      } catch (e) {
        alert(e.message);
      }*/
    }
  }

  render() {
    return (
      <div className="contact-form">
        <img src={profileImg} className="avatar"></img>
        <h2>Login</h2>
        <form>
          <p>아이디</p>
          <input type="text" className="form-control" id="id" />
          <p>비밀번호</p>
          <input type="password" className="form-control" id="pw" />
          <input
            type="submit"
            name=""
            value="Login"
            onClick={() => this.requestLogin()}
          />
          <p>
            계정이 없으세요?
            <Link to="/signUpPage">회원가입하기</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default login;
