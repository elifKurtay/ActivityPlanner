import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route} from "react-router-dom";

import ActivityDetailsComponent from "./components/details/ActivityDetailsComponent";
import UserChartComponent from "./components/details/UserChartComponent";
import EnrollmentTable from "./components/details/EnrollmentTable";
import AppTopBar from "./components/AppTopBar";
import JoinComponent from "./components/enrollment/JoinComponent";
import UserActivities from "./components/homepage/UserActivities";
import LoginComponent from "./components/login/LoginComponent";
import AddActivityComponent from "./components/profile/AddActivityComponent";
import DataChartComponent from "./components/profile/DataChartComponent";
import MyDataComponent from "./components/profile/MyDataComponent";

function Profile() {
    return <div> <AppTopBar/>
            <br/>
            My Profile
            <br/> <AddActivityComponent/> <br/>
            <MyDataComponent/> <br/>
            <DataChartComponent/>
            </div>;
}

function Homepage() {
    return <div><AppTopBar/> 
            <br/> <UserActivities/> <br/>
            </div>;
}

function Login() {
    return <div> <br/> <br/><LoginComponent/> 
            </div>;
}

function ActivityDetails() {
    const header = <div> <h1 style={{ textAlign: 'center', align:"center", color:"blue", fontSize: "24px"}}
                    > ACTIVITY DETAILS</h1> </div>;
    return <div><AppTopBar/> <br/> {header} <br/> 
        <ActivityDetailsComponent/><br/>
        <EnrollmentTable/> <br/>
        <UserChartComponent/>
        </div>;
}

function Enrollment() {
    const header = <div> <h1 style={{ textAlign: 'center', align:"center", color:"blue", fontSize: "24px"}}> 
                    ACTIVITY DETAILS</h1> </div>;
    return <div><AppTopBar/> <br/> {header} <br/> 
        <JoinComponent/>
        </div>;
}

function App() {
   
  return (
    <Router>
        <div className="App">  </div>
        <Route path="/details/" component={ActivityDetails} />
        <Route path="/login/" component={Login} />
        <Route path="//" component={Login} />
        <Route path="/profile/" component={Profile} />
        <Route path="/homepage/" component={Homepage} />
        <Route path="/enrollment/" component={Enrollment} />
    </Router>
  );
}

export default App;
