import React, {Component} from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export class Register extends Component {
    
    state = {
            name: "",
            surname: "",
            username: "",
            email: "",
            password: "",
            redirect: false
	}

    async register() {
        let inputData = {"name":this.state.name,"surname": this.state.surname,
            "username": this.state.username, "email": this.state.email,
            "password": this.state.password };
        
        await axios.post("/register", inputData)
          .then(response => {
            console.log(inputData);
          })
          .catch(error => { console.log(error.response) });

        var data = { username: this.state.username, password: this.state.password};
        console.log(data);
        await axios.post("/login", data)
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
            <div className="header">Register</div>
            <div className="content">
              <div className="form">
                <div className="form-group">
                  <label htmlFor="Name">Name</label>
                  <input type="text" value={this.state.name} 
                        onChange={(e) => this.setState({ name: e.target.value })} placeholder="Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="Surname">Surname</label>
                  <input type="text" value={this.state.surname} 
                        onChange={(e) => this.setState({ surname: e.target.value })} placeholder="Surname" />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" value={this.state.username} 
                        onChange={(e) => this.setState({ username: e.target.value })} placeholder="username" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" value={this.state.email} 
                        onChange={(e) => this.setState({ email: e.target.value })} placeholder="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" value={this.state.password} 
                        onChange={(e) => this.setState({ password: e.target.value })} placeholder="password" />
                </div>
              </div>
            </div>
            <div className="footer" >
              <button type="button" className="btn" onClick={() => this.register()}>
                Register
              </button>
            </div>
          </div>
        );
  }

}
