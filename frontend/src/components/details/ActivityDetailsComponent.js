import React, {Component} from "react";
import AddQuestionComponent from "../AddQuestionComponent";
import axios from "axios";

import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

class ActivityDetailsComponent extends Component {
	state = {
		items: [],
		oldActivityName: "",
		editMode: { name:false,
			startDate:false,
			endDate:false,
			quota: false
		},
        snackbarProperties: {
			isOpen: false,
			message: "",
			severity: ""
		}
	};

	componentDidMount() {
		console.log("ActivityDetailsComponent mounted.");
        this.retrieveActivity();
	};

	async retrieveActivity() {
		await axios.get("/activities/2/"+ localStorage.getItem("details"), { headers: {
                    'Authorization': localStorage.getItem("auth") } } )
            .then( (result) => {
			console.log(result.data);
			this.setState({
				items: result.data
			});
			this.setState({oldActivityName: this.state.items.name});
		}); 
		
		console.log(this.state.items);
	};

	snackbarOpen = (message, severity) => {
        console.log(message, severity);
        this.setState(prevState => {
          let snackbarProperties = {...prevState.snackbarProperties}
          snackbarProperties.isOpen = true;
          snackbarProperties.message = message;
          snackbarProperties.severity = severity;
          return {snackbarProperties};
        })
      }
      snackbarClose = () => {
        this.setState(prevState => {
          let snackbarProperties = {...prevState.snackbarProperties}
          snackbarProperties.isOpen = false;
          snackbarProperties.message = "";
          snackbarProperties.severity = "";
          return {snackbarProperties};
        })
      }

	changeEditMode = (prop) => {
		console.log(prop + " in edit mode ");
		if(prop === "name")
			this.setState({editMode: {name: !this.state.editMode.name }});
		else if(prop === "quota")
			this.setState({editMode: {quota: !this.state.editMode.quota }});
		else if(prop === "startDate")
			this.setState({editMode: {startDate: !this.state.editMode.startDate }});
		else if(prop === "endDate")
			this.setState({editMode: {endDate: !this.state.editMode.endDate }});
		
	};

	updateValue = (prop, newVal) => {
		console.log(prop + " updated: " + newVal );
		if(prop === "name")
			this.setState({items: {name:newVal, startDate: this.state.items.startDate, remainingQuota: this.state.items.remainingQuota,
					endDate: this.state.items.endDate, quota: this.state.items.quota}, editMode: {name: false }});
		else if(prop === "quota")
			this.setState({items: {name: this.state.items.name, startDate: this.state.items.startDate, remainingQuota: this.state.items.remainingQuota,
					endDate: this.state.items.endDate, quota:newVal}, editMode: {quota: false }});
		else if(prop === "startDate")
			this.setState({items: {name: this.state.items.name, quota: this.state.items.quota, remainingQuota: this.state.items.remainingQuota,
					endDate: this.state.items.endDate, startDate:newVal}, editMode: {startDate: false }});
		else if(prop === "endDate")
			this.setState({items: {name: this.state.items.name, startDate: this.state.items.startDate, remainingQuota: this.state.items.remainingQuota,
					quota: this.state.items.quota, endDate:newVal}, editMode: {endDate: false }});
	};

	renderEditView = (prop) => {
		let newEdit = {name: this.state.items.name, startDate:this.state.items.startDate, 
                        endDate:this.state.items.endDate, quota: this.state.items.quota };
		if(prop === "name")
			return <div>
				<InputText type="text" defaultValue={newEdit.name}  onChange={(e) => newEdit.name = e.target.value}/>
				<Button onClick={() => {this.changeEditMode(prop)}} label="X"/>
				<Button onClick={() => {this.updateValue(prop, newEdit.name )}} label="OK"/>
			</div>
		else if(prop === "quota")
			return <div>
				<InputText type="text" defaultValue={newEdit.quota} onChange={(e) => newEdit.quota = e.target.value}/>
				<Button onClick={() => {this.changeEditMode(prop)}} label="X"/>
				<Button onClick={() => {this.updateValue(prop, newEdit.quota)}} label="OK"/>
			</div>
		else if(prop === "startDate")
			return <div>
				<InputText type="text" defaultValue={newEdit.startDate} onChange={(e) => newEdit.startDate = e.target.value}/>
				<Button onClick={() => {this.changeEditMode(prop)}} label="X"/>
				<Button onClick={() => {this.updateValue(prop, newEdit.startDate)}} label="OK"/>
			</div>
		else if(prop === "endDate")
			return <div>
				<InputText type="text" defaultValue={newEdit.endDate} onChange={(e) => newEdit.endDate = e.target.value}/>
				<Button onClick={() => {this.changeEditMode(prop)}} label="X"/>
				<Button onClick={() => {this.updateValue(prop, newEdit.endDate)}} label="OK"/>
			</div>
	}

	renderTextView = (prop) => {
		var defVal = "";
		if(prop === "name")
			defVal = this.state.items.name;
		else if(prop === "quota")
			defVal = this.state.items.quota;
		else if(prop === "startDate")
			defVal = this.state.items.startDate;
		else if(prop === "endDate")
			defVal = this.state.items.endDate;

		return <div onDoubleClick={() => {this.changeEditMode(prop)}} >
				{defVal}
			</div>;
	}

	async addQuestions() {
		let questions = JSON.parse(localStorage.getItem("questions"));
		console.log("Added questions: " + questions);
        await axios.put("/activities/" + localStorage.getItem("details") +"/addQuestions", questions,
						{ headers: { 'Authorization': localStorage.getItem("auth") } } )
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            if (error.response.status === 400) {
              this.snackbarOpen(error.response.data.errors[0].defaultMessage, "error")
            }
            console.log(error.response);
        });
	    console.log("new question added");
	};

	async saveToDatabase() {
		let activityName = this.state.items.name;
		let data = {name: this.state.items.name, quota: this.state.items.quota, remainingQuota: this.state.items.remainingQuota,
					endDate: this.state.items.endDate, startDate:this.state.items.startDate, ownerUsername: localStorage.getItem("username") };
        await axios.put("/activities/" + this.state.oldActivityName, data, { headers: {
                    'Authorization': localStorage.getItem("auth") } } )
        .then(response => {
            console.log("Activity named " + activityName + "has been edited!");
			this.snackbarOpen("Activity details have been edited!", "success")
			localStorage.setItem("details", this.state.items.name);
			this.retrieveActivity();
        })
		this.addQuestions();
        
		console.log(activityName + "edited.");
	}

	render() {
		let nameText = this.state.editMode.name ? 
			this.renderEditView("name") : this.renderTextView("name");

		let quotaText = this.state.editMode.quota ? 
			this.renderEditView("quota") : this.renderTextView("quota");
		let startDateText = this.state.editMode.startDate ? 
			this.renderEditView("startDate") : this.renderTextView("startDate");
		let endDateText =  this.state.editMode.endDate ? 
			this.renderEditView("endDate") : this.renderTextView("endDate");

		return <div style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
            <div  style={{textAlign: 'center'}}>
                </div>
                    
            <div style={{display: "flex"}} >
                <div style={{width: "100px"}} >Name: </div>
                <div style={{width: "400px"}}> {nameText}</div>
            </div>  

            <div style={{display: "flex"}} > <br/> </div>

            <div style={{display: "flex"}} >
                <div style={{width: "100px"}} >Start Date: </div>
                <div style={{width: "400px"}}>{startDateText}</div>
            </div>

            <div style={{display: "flex"}} > <br/> </div>

            <div style={{display: "flex"}} >
                <div style={{width: "100px"}} >End Date: </div>
                <div style={{width: "400px"}}>{endDateText}</div>
            </div> 

            <div style={{display: "flex"}} > <br/> </div>

            <div style={{display: "flex"}} >
                <div style={{width: "100px"}} >Quota: </div>
                <div style={{width: "400px"}}> {quotaText} </div>
            </div>  

            <div style={{display: "flex"}} > <br/> </div>

			<div style={{display: "flex"}} >
                <div style={{width: "100px"}} >Remaining Quota: </div>
                <div style={{width: "400px"}}>{this.state.items.remainingQuota} </div>
            </div>  
			<AddQuestionComponent/>
            <div style={{display: "flex"}} > <br/> </div>
                    
            <div className="p-col-12">
            <Button type="button" label="Save Changes" className="p-button-success" bodyStyle={{textAlign: 'center'}} 
                onClick={ () => this.saveToDatabase()}/> </div>

			<Snackbar open={this.state.snackbarProperties.isOpen} autoHideDuration={5000} onClose={this.snackbarClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                      <Alert onClose={this.snackbarClose} severity={this.state.snackbarProperties.severity}>
                        {this.state.snackbarProperties.message}
                      </Alert>
                    </Snackbar>
        </div>
            
	};
}
export default ActivityDetailsComponent;

