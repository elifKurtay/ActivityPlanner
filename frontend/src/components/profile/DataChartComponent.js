import React, {Component} from "react";
import axios from "axios";

import {Chart} from 'primereact/chart';

class DataChartComponent extends Component{
	state = {
		items: [],
		labels: [],
		data: []
	};

	componentDidMount() {
		console.log("MyDataComponent mounted.");

        this.retrieveActivities();
	};

	async retrieveActivities() {
		await axios.get("/activities/1/"+ localStorage.getItem("username") , { headers: {
                    'Authorization': localStorage.getItem("auth") } }  ).then( (result) => {
			
			console.log(result.data);
			
			let labels = [];
			let data = [];
            for(var i = 0; i < result.data.length; i++) {
                labels.push(result.data[i].name);
				data.push(result.data[i].quota - result.data[i].remainingQuota);
			}
			this.setState({
				items: result.data,
				labels: labels,
				data: data
			});
		}); 
		console.log(this.state.labels);
		console.log(this.state.data);
	};

	render() {
		const bar = {labels: this.state.labels, datasets: [{
			label: "Enrollment Count",
			backgroundColor: "#42A5F5",
			data: this.state.data
		}]}

		return <div> 
			<br/>
			<Chart style={{width: "800px"}} type="bar" data={bar} />
			<br/>
		</div>;
	};
}

export default DataChartComponent;