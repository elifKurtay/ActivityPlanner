import React, {Component} from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import axios from "axios";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Redirect } from "react-router-dom";


class UserActivities extends Component {

	state = {
		items: [],
        selectedItem: [], 
        visible: false,
        redirect: false
	};

	componentDidMount() {
		console.log("UserActivities mounted.");
        
        this.retrieveActivities();
        this.joinBodyTemplate = this.joinBodyTemplate.bind(this);
	};

	retrieveActivities() {
		axios.get("/activities", { headers: {
                    'Authorization': localStorage.getItem("auth") } } )
            .then( (result) => {
			console.log(result.data);
			this.setState({
				items: result.data
			});
		}); 
		console.log(this.state.items);
        console.log(this.state.selectedItem);
	};

    joinBodyTemplate() {
        return (
            <Button type="button" label="Join" icon="pi pi-plus" iconPos="right" 
                className="p-button-success" onClick={ () => this.setState({visible: true})}></Button>
        );
    };
    

    renderDialogContent() {
        if (this.state.selectedItem) {
            localStorage.setItem("enrollment", this.state.selectedItem.name);
            return ( <div style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                <div className="p-col-12" style={{textAlign: 'center'}}>
                    </div>
                <div style={{display: "flex"}} >
                    <div style={{width: "300px"}} >Would you like to enroll to this activity?</div>
                </div>  
                <div style={{display: "flex"}} > <br/> </div>

                <div style={{display: "flex"}} >
                    <div style={{width: "100px"}} >Name: </div>
                    <div style={{width: "400px"}}> {this.state.selectedItem.name}</div>
                </div>  

                <div style={{display: "flex"}} > <br/> </div>

                <div style={{display: "flex"}} >
                    <div style={{width: "100px"}} >Start Date: </div>
                    <div style={{width: "400px"}}> {this.state.selectedItem.startDate}</div>
                </div>

                <div style={{display: "flex"}} > <br/> </div>

                <div style={{display: "flex"}} >
                    <div style={{width: "100px"}} >End Date: </div>
                    <div style={{width: "400px"}}>{this.state.selectedItem.endDate}</div>
                </div> 

                <div style={{display: "flex"}} > <br/> </div>

                <div className="p-col-12">
                <Button type="button" label="Join the Activity" className="p-button-success" bodyStyle={{textAlign: 'center'}} 
                    onClick={ () => this.setState({redirect: true})}/> </div>
            </div>
            );
        }
        else {
            return null;
        }
    }
	
	render() {
        const header = <div> List of Activities </div>;

		let myTable = <DataTable ref={(el) => this.dt = el} value={this.state.items} selectionMode="single" header={header} 
                selection={this.state.selectedItem} onSelectionChange={e => this.setState({selectedItem: e.value})}>
				<Column selectionMode="single" style={{width:'3em'}}/>
				<Column field="name" header="Name" />
                <Column field="startDate" header="Start Date" />
                <Column field="endDate" header="End Date" />
                <Column body={this.joinBodyTemplate} header="Join" headerStyle={{width: '8em', textAlign: 'center'}} 
                        bodyStyle={{textAlign: 'center', overflow: 'visible'}} />
            </DataTable>

        if(this.state.redirect)
            return <Redirect to="/enrollment" />;
        else
		    return <div> 
			    <br/>
			    {myTable}
                <Dialog header="Activity Details" visible={this.state.visible} modal={true} 
                        onHide={() => this.setState({visible: false})}>
                        {this.renderDialogContent()}
                </Dialog>
                
		    </div>;
	};
};

export default UserActivities;
