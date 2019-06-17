import React from 'react';
import './App.css';
import Table from './components/Table';
import { Router, Route } from 'react-router';
import history from './components/history';
import NotificationDetails from './components/NotificationDetails';
import VersionMonitor from "./components/VersionMonitor";
import {Tabs, Tab} from 'react-bootstrap';

function App() {
  let titleStyle={
    paddingTop:'20px',
    paddingBottom: '20px',
    'text-align':'center'
  }

  return (
    <div>
      <Tabs defaultActiveKey="home" 
       transition={false}
       onSelect={key =>{ 
         if(key=="Monitor") history.push('/versionMonitor');
         else if(key=="Home") history.goBack();
        }}
      >
        <Tab eventKey="Home" title="Home"></Tab>
        <Tab eventKey="Monitor" title="Monitor"></Tab>
      </Tabs>
       <Router history={history}>
         <Route exact path="/versionMonitor" component={VersionMonitor}></Route>
         <Route exact path='/' render={() =>
          <div>
          <h1 style={titleStyle}>Notification Monitor</h1>
          <p></p>
          <Table></Table>
          </div>
           } />
         <Route path="/details/:notification_id" render={({match})=>(<NotificationDetails notification_id={match.params.notification_id}></NotificationDetails>)} />
      </Router>  
    </div>
  );
}

export default App;
