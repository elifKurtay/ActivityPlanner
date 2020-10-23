import React, {Component} from "react";
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {InputNumber} from 'primereact/inputnumber';
import {Calendar} from 'primereact/calendar';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

import { Dialog } from 'primereact/dialog';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import AddQuestionComponent from "../AddQuestionComponent";

class AddActivityComponent extends Component {
    
	state = {
		name: "new activity",
		startDate:null,
		endDate:null,
		quota: 0, 
        remainingQuota: 0,
        snackbarProperties: {
            isOpen: false,
            message: "",
            severity: ""
        }
	}
	
	componentDidMount() {
		console.log("AddActivityComponent mounted.");

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;

        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);

        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        this.invalidDates = [today];

        this.dateTemplate = this.dateTemplate.bind(this);
	};

    dateTemplate(date) {
        if (date.day > 10 && date.day < 15) {
            return (
                <div style={{ backgroundColor: '#1dcbb3', color: '#ffffff',
                fontWeight: 'bold', borderRadius: '50%', width: '2em', height: '2em',
                lineHeight: '2em', padding: 0 }}>{date.day}</div>
            );
        }
        else {
            return date.day;
        }
    }

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

  async addQuestions() {
		let questions = JSON.parse(localStorage.getItem("questions"));
		console.log("Added questions: " + questions);
        await axios.put("/activities/" + this.state.name +"/addQuestions", questions,
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

	async addElement() {
        let inputData = {
            name: this.state.name,
		    startDate:this.state.startDate,
		    endDate:this.state.endDate,
		    quota: this.state.quota, 
            remainingQuota: this.state.quota,
            ownerUsername: localStorage.getItem("username")
        };

        console.log(inputData);

        await axios.post("/activities", inputData, { headers: {
                    'Authorization': localStorage.getItem("auth") } } )
          .then(response => {
            this.addQuestions();
            this.snackbarOpen("Activity has been added successfully!", "success");
          })
          .catch(error => {
            if (error.response.status === 400) {
              this.snackbarOpen(error.response.data.errors[0].defaultMessage, "error")
            }
            console.log(error.response);
        });
        
	};


	renderContent() {
        let today = new Date();

        return (
            <div style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                <div style={{textAlign: 'center'}}>
                    </div>

                <div style={{display: "flex"}} >
                    <div style={{width: "100px"}}>Name: </div>
                    <div style={{width: "500px"}} > <InputText id="float-input" type="text" size={30} value={this.state.name}
                            onChange={(e) => this.setState({name: e.target.value})} /> </div>
                </div> 
                <div style={{display: "flex"}} > <br/> </div>

                    <div style={{display: "flex"}} >
                    <div style={{width: "100px"}}>Start Date: </div>
                    <div style={{width: "500px"}} ><Calendar showIcon={true} dateFormat="dd/mm/yy" value={this.state.startDate} 
                        onChange={(e) => this.setState({ startDate: e.target.value  })} minDate={today}
                            showTime={false} showSeconds={false} /></div>
                </div>
                <div style={{display: "flex"}} > <br/> </div>

                <div style={{display: "flex"}} >
                    <div style={{width: "100px"}} >End Date: </div>
                    <div style={{width: "500px"}}><Calendar showIcon={true} minDate={this.state.startDate} dateFormat="dd/mm/yy" 
                                value={this.state.endDate} 
                        onChange={(e) => this.setState({ endDate: e.target.value })} showTime={false} showSeconds={false} /></div>
                </div> 
                <div style={{display: "flex"}} > <br/> </div>

                <div style={{display: "flex"}} >
                    <div style={{width: "100px"}}>Quota: </div>
                    <div style={{width: "500px"}}><InputNumber value={Number(this.state.quota)} mode="decimal" 
                            onChange={(e) => this.setState({quota: e.target.value})} min={0}  /> </div>
                </div>  
                <div style={{display: "flex"}} > <br/> </div>

                <AddQuestionComponent/>
                <div style={{display: "flex"}} > <br/> </div>

                <div className="p-col-12">
                <Button type="button" label="Save Activity" className="p-button-success" bodyStyle={{textAlign: 'center'}} 
                    onClick={ () => this.addElement()}/> </div>

                <Snackbar open={this.state.snackbarProperties.isOpen} autoHideDuration={5000} onClose={this.snackbarClose}
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                  <Alert onClose={this.snackbarClose} severity={this.state.snackbarProperties.severity}>
                    {this.state.snackbarProperties.message}
                  </Alert>
                </Snackbar>
            </div>
        );
        
    };

	render() {
		
		return <div> <br/>
			
			<Accordion style={{backgroundColor: "#54FE3C"}}>
            <AccordionTab style={{backgroundColor: "#54FE3C"}} header="Add New Activity">
                <div header="New Activity Form" >
                    {this.renderContent()}
                </div>
            </AccordionTab>
            </Accordion>
            
		</div>;
	};
};
export default AddActivityComponent;