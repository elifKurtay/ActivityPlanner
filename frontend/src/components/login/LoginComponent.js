import React, {Component} from "react";
import {Login, Register} from "./index"; 

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

class LoginComponent extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  changeState() {
    
    if (this.state.isLogginActive) {
        this.rightSide.classList.remove("right");
        this.rightSide.classList.add("left");
    } else {
        this.rightSide.classList.remove("left");
        this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }
   
    
    render() {
        const current = this.state.isLogginActive ? "Register" : "Login";
        const currentActive = this.state.isLogginActive ? "login" : "register";
        return (
          <div className="App">
             <div className="login">
                <div className="container" ref={ref => (this.container = ref)}>
                {this.state.isLogginActive && (
                    <Login containerRef={ref => (this.current = ref)} />
                )}
                {!this.state.isLogginActive && (
                    <Register containerRef={ref => (this.current = ref)} />
                )}
                </div>
                <RightSide
                current={current}
                currentActive={currentActive}
                containerRef={ref => (this.rightSide = ref)}
                onClick={this.changeState.bind(this)}
                />
            </div>
          </div>
        );
    }
}

export default LoginComponent;