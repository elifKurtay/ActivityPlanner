import React, {Component} from 'react';
import LoginAvatar from "./LoginAvatar";

class LoginPage extends Component {
	render() {

    return (
      <form>
	<div className="svgContainer">
		<div>
			<svg className="mySVG"  viewBox="0 0 200 200">
				<defs>
					<circle id="armMaskPath" cx="100" cy="100" r="100"/>	
				</defs>
				<LoginAvatar/>
			</svg>
		</div>
	</div>
	
	<div class="inputGroup inputGroup1">
		<label for="email1">Email</label>
		<input type="text" id="email" class="email" maxlength="256"/>
		<p class="helper helper1">email@domain.com</p>
		<span class="indicator"></span>
	</div>
	<div class="inputGroup inputGroup2">
		<label for="password">Password</label>
		<input type="password" id="password" class="password" />
	</div>
	<div class="inputGroup inputGroup3">
		<button id="login">Log in</button>
	</div>	
</form>
    );
  }

}
export default LoginPage;