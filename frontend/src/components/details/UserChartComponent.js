import React, {Component} from "react";
import axios from "axios";

import {Chart} from 'primereact/chart';

class UserChartComponent extends Component{
	state = {
		users: [],
		labels: [],
		data: []
	};

	componentDidMount() {
		console.log("MyDataComponent mounted.");

        this.retrieveActivities();
	};

	async retrieveActivities() {
		await axios.get("/activities/" + localStorage.getItem("details") + "/enrolledUsers", { headers: {
                    'Authorization': localStorage.getItem("auth") } } )
		  .then(result => {
			console.log(result);
			if(result != null) {
				let labels = [];
				let data = [];
				for(var i = 0; i < result.data.length; i++) { data.push(0);}

				for(var i = 0; i < result.data.length; i++) {
					let date = result.data[i].creationDate.substring(0,10);
					let index = labels.findIndex(d => d === date);
					if( index === -1)
						labels.push(date);
					index = labels.findIndex(d => d === date);
					data[index]++;
				}
					
				this.setState({users: result.data, labels: labels, data: data});
			}
		  })
		  .catch(error => { console.log(error.result) });
	};

	render() {
		const bar = {labels: this.state.labels, datasets: [{
			label: "Enrollment Count In Dates",
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

export default UserChartComponent;