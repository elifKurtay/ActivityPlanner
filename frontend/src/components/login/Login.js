import React, {Component} from "react";
import loginImg from "./images/login.svg";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {InputText} from 'primereact/inputtext';

export class Login extends Component {
  
  state = {
		username: "",
        password: "",
        redirect: false
	};

  async login() {
    let inputData = { username: this.state.username, password: this.state.password};
    console.log(inputData);
    await axios.post("/login", inputData)
      .then(response => {
        console.log(response);
        if(response != null) {
            this.setState({redirect: true});
            localStorage.setItem( "auth", "Bearer " + response.data.token);
            localStorage.setItem( "username", this.state.username );
        }
      })
      .catch(error => { console.log(error.response) });
    console.log("auth: " + localStorage.getItem("auth"));
  };

  render() {
    if(this.state.redirect)
        return <Redirect to="/homepage" />;
    else
        return (
          <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
              <div className="image">
                <img src={loginImg} />
              </div>
              <div className="form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <InputText type="text" value={this.state.username} 
                        onChange={(e) => this.setState({ username: e.target.value })} placeholder="username" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <InputText type="password" value={this.state.password} 
                            onChange={(e) => this.setState({ password: e.target.value })} placeholder="password" />
                </div>
              </div>
            </div>
            <div className="footer">
              <button type="button" className="btn" onClick={() => this.login()} >
                Login
              </button>
            </div>
          </div>
        );
  }

}

