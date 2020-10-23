import React, {Component} from "react";
import { Dialog } from 'primereact/dialog';
import TextField from '@material-ui/core/TextField';
import {Button} from 'primereact/button';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

class AddQuestionComponent extends Component {
	state = {
        snackbarProperties: {
            isOpen: false,
            message: "",
            severity: ""
        },
        visible: false,
        visible2: false,
        questions: [],
        selectedQuestion: ""
	}


	componentDidMount() {
		console.log("AddQuestionComponent mounted.");

        this.deleteBodyTemplate = this.deleteBodyTemplate.bind(this);
        this.editBodyTemplate = this.editBodyTemplate.bind(this);
        this.retrieveActivity();
	};

	

    async retrieveActivity() {
		await axios.get("/activities/"+ localStorage.getItem("details") + "/questions", { headers: {
                    'Authorization': localStorage.getItem("auth") } } )
            .then( (result) => {
			console.log(result.data);
			this.setState({
				questions: result.data
			});
		}); 
	};

    renderDialogContent() {
        if (this.state.visible) {
            let question = "";
            return ( <div style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                <div style={{display: "flex"}} >
                    <div  >Question to be asked to the participant: </div>
                </div>  
                <div style={{display: "flex"}} > <br/> </div>

                <div style={{display: "flex"}} >
                    <div style={{width: "400px"}}> <TextField id="outlined-multiline-flexible" label="Question" style={{width: "40ch"}}
                            multiline rowsMax={4} defaultValue={question} onChange={(e) => question = e.target.value} variant="outlined"/> </div>
                </div>

                <div style={{display: "flex"}} > <br/> </div>

                <div className="p-col-12">
                <Button type="button" label="ADD" className="p-button-success" bodyStyle={{textAlign: 'center'}} 
                    onClick={ () => this.addQuestion(question)}/> </div>
            </div>
            );
        }
    }

    renderEditDialogContent() {
        if (this.state.visible2) {
            let question = "";
            return ( <div style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                <div style={{display: "flex"}} >
                    <div  >Question to be asked to the participant: </div>
                </div>  
                <div style={{display: "flex"}} > <br/> </div>

                <div style={{display: "flex"}} >
                    <div style={{width: "400px"}}> <TextField id="outlined-multiline-flexible" label="Question" style={{width: "40ch"}}
                            multiline rowsMax={4} defaultValue={question} onChange={(e) => question = e.target.value} variant="outlined"/> </div>
                </div>

                <div style={{display: "flex"}} > <br/> </div>

                <div className="p-col-12">
                <Button type="button" label="SAVE" className="p-button-success" bodyStyle={{textAlign: 'center'}} 
                    onClick={ () => this.editQuestion(question)}/> </div>
            </div>
            );
        }
    }

    addQuestion(prop) {
        let questions = this.state.questions;
        let ques = {question: prop};
        questions.push(ques);
        this.setState({questions: questions, visible: false});
        localStorage.setItem("questions", JSON.stringify(questions));
	};

    removeQuestion() {
        var question = this.state.selectedQuestion;
        console.log(question);
        var filtered = this.state.questions.filter(function(value, index, arr){ return value !== question;});
        console.log("Filtered: " + filtered);
        this.setState({questions: filtered});
        localStorage.setItem("questions", JSON.stringify(filtered));
	};

    editQuestion(prop) {
        let question = this.state.selectedQuestion;
        let questions = this.state.questions;
        let index = questions.findIndex( q => q=== question);
        let ques = {question: prop};
        questions.splice(index, 1, ques);
        this.setState({questions: questions, visible2: false});
        localStorage.setItem("questions", JSON.stringify(questions));
	};

    deleteBodyTemplate() {
        return (
            <Button label="Delete" type="button" icon="pi pi-trash" className="p-button-danger" onClick={ () => this.removeQuestion()}></Button>
        );
    };

    editBodyTemplate() {
        return (
            <Button label="Edit" type="button" icon="pi pi-pencil" className="p-button-warning" onClick={ () => this.setState({visible2: true})}></Button>
        );
    };

    render() {
		const header = <div> List of Questions </div>;

		let myTable = <DataTable ref={(el) => this.dt = el} value={this.state.questions} selectionMode="single" header={header} 
                resizableColumns={true} selection={this.state.selectedQuestion} onSelectionChange={e => this.setState({selectedQuestion: e.value})}
                paginator={true} rows={5}>
				<Column selectionMode="single" style={{width:'3em'}}/>
				<Column field="question" header="Question" />
                <Column body={this.editBodyTemplate} header="Edit" headerStyle={{width: '8em', textAlign: 'center'}} bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
                <Column body={this.deleteBodyTemplate} header="Delete" headerStyle={{width: '8em', textAlign: 'center'}} bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
            </DataTable>;

		return <div> <br/>
            <div className="p-col-12">
                <Button type="button" label="Add Question" className="p-button" bodyStyle={{textAlign: 'left'}}  style={{float: "right"}}
                    onClick={ () => this.setState({visible: true})}/> </div>
            <br/> <br/>
			{myTable}
            <Dialog header="Add Question" visible={this.state.visible} modal={true} onHide={() => this.setState({visible: false})}>
                    {this.renderDialogContent()}
            </Dialog>
            <Dialog header="Edit Question" visible={this.state.visible2} modal={true} onHide={() => this.setState({visible2: false})}>
                    {this.renderEditDialogContent()}
            </Dialog>
            <Snackbar open={this.state.snackbarProperties.isOpen} autoHideDuration={5000} onClose={this.snackbarClose}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={this.snackbarClose} severity={this.state.snackbarProperties.severity}>
                {this.state.snackbarProperties.message}
                </Alert>
            </Snackbar>
            
		</div>;
	};

}

export default AddQuestionComponent;