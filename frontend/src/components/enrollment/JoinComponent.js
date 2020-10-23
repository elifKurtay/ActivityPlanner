import React, {Component} from "react";
import axios from "axios";

import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";

class JoinComponent extends Component {
	state = {
		items: [],
		snackbarProperties: {
			isOpen: false,
			message: "",
			severity: ""
		},
        hasQuestions: false,
        questions: [],
        answers: [],
        redirect: false
	};

	componentDidMount() {
		console.log("JoinComponent mounted.");
        this.retrieveActivity();
        
        this.editBodyTemplate = this.editBodyTemplate.bind(this);
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

	async retrieveActivity() {
		await axios.get("/activities/2/"+ localStorage.getItem("enrollment"), { headers: {
                    'Authorization': localStorage.getItem("auth") } } )
            .then( (result) => {
			console.log(result.data);
			this.setState({
				items: result.data
			});
		}); 
		await axios.get("/activities/"+ localStorage.getItem("enrollment") + "/questions", { headers: {
                    'Authorization': localStorage.getItem("auth") } } )
            .then( (result) => {
			console.log(result.data);
            if(result.data.length !== 0 )
            {
                let arr = [];
                for(var i = 0; i < result.data.length; i++) {
                    let data = {question: result.data[i].question, answer: ""};
                    arr.push(data);
		        }
                this.setState({questions: result.data, answers: arr,hasQuestions: true});
            }
		}); 
		console.log(this.state.items);
	};

	async saveToDatabase() {
        //check date
        let today = Date.parse(new Date());
        let startDate = Date.parse(this.state.items.startDate);
        if(startDate >= today)
            this.snackbarOpen("Application deadline for this activity has passed.", "error")
        console.log("USERNAME IS: " + localStorage.getItem("username"));
        let body = localStorage.getItem("username");
        //decrement quota
        await axios.put("/activities/"+this.state.items.name+"/"+ body,this.state.answers, { headers: {
                    'Authorization': localStorage.getItem("auth") } } )
            .then( (result) => {
			    console.log(result.data);
                if(result.data) {
                    this.snackbarOpen("You have enrolled successfully!", "success");
            
                    console.log( "User joined " + this.state.items.name);         
				} else {
                    this.snackbarOpen("The quota for this activity is full. You could not have been registered.", "error")         
				}
		    });
        this.setState({redirect: true});
	};

    onEditorValueChange(props, value) {
        let updated = [...props.value];
        updated[props.rowIndex][props.field] = value;
        this.setState({answers: updated});
    }

    editBodyTemplate(props) {
        return (
            <InputText type="text" value={props.rowData["answer"]} onChange={(e) =>this.onEditorValueChange(props, e.target.value)}/>
        );
    };

    renderQuestions()  {
        const header = <div> Required Information For Enrollment </div>;

		let myTable = <DataTable ref={(el) => this.dt = el} value={this.state.answers} header={header} 
                resizableColumns={true} >
				<Column field="question" header="Question" style={{width: "300px"}}/>
                <Column editor={this.editBodyTemplate} field="answer" header="Answer"  bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
            </DataTable>;
        return myTable;
	};

	render() {
        let details = <div> 
            <div style={{display: "flex"}} >
                <div style={{width: "100px"}} >Name: </div>
                <div style={{width: "400px"}}> {this.state.items.name}</div>
            </div>  

            <div style={{display: "flex"}} > <br/> </div>

            <div style={{display: "flex"}} >
                <div style={{width: "100px"}} >Start Date: </div>
                <div style={{width: "400px"}}>{this.state.items.startDate}</div>
            </div>

            <div style={{display: "flex"}} > <br/> </div>

            <div style={{display: "flex"}} >
                <div style={{width: "100px"}} >End Date: </div>
                <div style={{width: "400px"}}>{this.state.items.endDate}</div>
            </div> 

            <div style={{display: "flex"}} > <br/> </div>  </div> ;

        let questions = !this.state.hasQuestions ? <div> <div style={{display: "flex"}} > 
                <div style={{width: "510px"}}>This activity does not require any additional information from you. </div>
            </div> <div style={{display: "flex"}} > 
                <div style={{width: "400px"}}>Please submit form if you would like to participate. </div>
            </div>  </div> : this.renderQuestions();

        if(this.state.redirect)
            return <Redirect to="/homepage" />;

		return <div style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
            {details}
            {questions}
            <div style={{display: "flex"}} > <br/> </div>
            <div className="p-col-12">
            <Button type="button" label="Submit Form" className="p-button-success" bodyStyle={{textAlign: 'center'}} 
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

export default JoinComponent;