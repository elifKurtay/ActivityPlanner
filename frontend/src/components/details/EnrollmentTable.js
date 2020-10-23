import React, {Component} from "react";
import axios from "axios";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

class EnrollmentTable extends Component{
	
	state = {
		users: [],
        expandedRows: null
	};

	componentDidMount() {
		console.log("EnrollmentTable mounted.");
		this.retrieveUsers();
        this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
   
	};

	async retrieveUsers() {
		await axios.get("/activities/" + localStorage.getItem("details") + "/enrolledUsers", { headers: {
                    'Authorization': localStorage.getItem("auth") } } )
		  .then(response => {
			console.log(response);
			if(response != null) {
				this.setState({users: response.data});

			}
		  })
		  .catch(error => { console.log(error.response) });
	}

	rowExpansionTemplate(data) {
		const header = <div> Required Information Given During Enrollment </div>;
		console.log(data);
		let myTable = <DataTable ref={(el) => this.dt = el} value={data.answers} 
                resizableColumns={true} >
				<Column field="question" header="Question" style={{width: "300px"}}/>
                <Column field="answer" header="Answer"  bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
            </DataTable>;
        return  (
            <div>
                {myTable}
            </div>
        );
    }

	render() {
		const header = <div> List of Enrolled Users </div>;

		let myTable = <DataTable ref={(el) => this.dt = el} value={this.state.users} header={header} 
                expandedRows={this.state.expandedRows} onRowToggle={(e) => this.setState({expandedRows:e.data})}
                        rowExpansionTemplate={this.rowExpansionTemplate} paginator={true} rows={5} >
				<Column expander={true} style={{width:'3em'}}/>
				<Column field="name" header="Name" />
                <Column field="surname" header="Surname" />
                <Column field="email" header="Email" />
            </DataTable>

		return <div > {myTable}
        </div>;
	};
};

export default EnrollmentTable;