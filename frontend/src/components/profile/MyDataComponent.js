import React, {Component} from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import axios from "axios";
import { Redirect } from "react-router-dom";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';


class MyDataComponent extends Component {

	
	state = {
		items: [],
        selectedItem: [], 
        visible: false,
        redirect: false
	};

	componentDidMount() {
		console.log("MyDataComponent mounted.");

        this.retrieveActivities();
        this.deleteBodyTemplate = this.deleteBodyTemplate.bind(this);
        this.detailsBodyTemplate = this.detailsBodyTemplate.bind(this);
	};

	retrieveActivities() {
		axios.get("/activities/1/"+ localStorage.getItem("username") , { headers: {
                    'Authorization': localStorage.getItem("auth") } }  ).then( (result) => {
			
			console.log(result.data);
			this.setState({
				items: result.data
			});
		}); 
        
		console.log(this.state.items);
	};

	deleteActivity() {
        let activityName = this.state.selectedItem.name;
        axios.delete("/activities/" + activityName, { headers: {
                    'Authorization': localStorage.getItem("auth") } } )
        .then(response => {
            this.setState( {
                items: this.state.items.filter((activity) => activity.name !== activityName)
        })
        console.log("Activity named " + activityName + "has been deleted!")
      })

        this.retrieveActivities();
		console.log(activityName + "deleted.");
	};


    detailsBodyTemplate() {
        let name = this.state.selectedItem.name;
        console.log("Name: " + name);
        localStorage.setItem("details", name);
        return (
            <Button type="button" icon="pi pi-search" className="p-button-success" onClick={ () => this.setState({redirect: true})}></Button>
        );
    };

    deleteBodyTemplate() {
        return (
            <Button label="Delete" type="button" className="p-button-danger" onClick={ () => this.setState({visible: true})}></Button>
        );
    };
    
    renderDialogContent() {
        if (this.state.selectedItem) {
            return (
                <div style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                    <div className="p-col-12" style={{textAlign: 'center'}}>
                       </div>
                    Would you like to delete this activity?
                    <div style={{display: "flex"}} > <br/> </div>
                    <div style={{display: "flex"}} >
                        <div style={{width: "100px"}} >Name: </div>
                        <div style={{width: "200px"}}> {this.state.selectedItem.name}</div>
                    </div>  

                    <div style={{display: "flex"}} > <br/> </div>

                    <div style={{display: "flex"}} >
                        <div style={{width: "100px"}} >Start Date: </div>
                        <div style={{width: "200px"}}> {this.state.selectedItem.startDate}</div>
                    </div>

                    <div style={{display: "flex"}} > <br/> </div>

                    <div style={{display: "flex"}} >
                        <div style={{width: "100px"}} >End Date: </div>
                        <div style={{width: "200px"}}>{this.state.selectedItem.endDate}</div>
                    </div> 

                    <div style={{display: "flex"}} > <br/> </div>

                    <div className="p-col-12">
                    <Button type="button" label="Delete Activity" className="p-button-danger" bodyStyle={{textAlign: 'center'}} 
                        onClick={ () => this.deleteActivity()}/> </div>
                </div>
            );
        }
        else {
            return null;
        }
    }
	
	render() {
		
        const header = <div> List of My Activities </div>;

		let myTable = <DataTable ref={(el) => this.dt = el} value={this.state.items} selectionMode="single" header={header} 
                resizableColumns={true} selection={this.state.selectedItem} onSelectionChange={e => this.setState({selectedItem: e.value})}
                paginator={true} rows={5}>
				<Column selectionMode="single" style={{width:'3em'}}/>
				<Column field="name" header="Name" />
                <Column field="startDate" header="Start Date" />
                <Column field="endDate" header="End Date" />
                <Column field="quota" header="Total Quota" />
                <Column field="remainingQuota" header="Remaining Quota" />
                <Column body={this.detailsBodyTemplate} header="Details" headerStyle={{width: '8em', textAlign: 'center'}} bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
                <Column body={this.deleteBodyTemplate} header="Delete" headerStyle={{width: '8em', textAlign: 'center'}} bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
            </DataTable>
        if(this.state.redirect)
            return <Redirect to="/details" />;
        else
		    return <div> 
			    <br/>
			    {myTable}
                <Dialog header="Activity Details" visible={this.state.visible} modal={true} onHide={() => this.setState({visible: false})}>
                        {this.renderDialogContent()}
                </Dialog>
		    </div>;
	};
};

export default MyDataComponent;
