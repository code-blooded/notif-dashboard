import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

import history from './history';
import axios from 'axios';

export default class Table extends Component{
    constructor(props){
        super(props);
        this.state = { 
          Data: {
            columns: ['notification_id','notification_type','account_id','timestamp','status'],
            headers:['Notification ID','Type', 'Account ID','Timestamp','Status'],
            rows: []
          }
      }
      
    }
    
    componentDidMount() {

      axios.get(process.env.REACT_APP_GET_ALL_NOTIFICATIONS_ADDRESS).then(response=>{
        this.state.Data.rows=response.data;
        this.setState({});
        console.log(this.state.Data);
      })
      // getting Data through websockets
      const socket = socketIOClient(process.env.REACT_APP_IP_ADDRESS);
      socket.on("FromPredictionAPI", (data)=>{ 
        this.state.Data.rows.push(data);
        this.setState({});
      });
    }

    render() {
      
      let dataColumns = this.state.Data.columns;
      let dataRows = this.state.Data.rows;
      let goToNotificationDetails=(id)=>{
        history.push('/details/' + id);
      }
      let tableHeaders = (
        <thead>
            <tr>
              {
                this.state.Data.headers.map(function(column) {
                  return <th>{column}</th>; 
                })
              }
            </tr>
        </thead>);
  
      let tableBody = dataRows.map(function(row) {
        return (
          <tr>
            {dataColumns.map(function(column) {
              if(column=='notification_id'){
                return <td><a href={row[column]} onClick={() =>goToNotificationDetails(row[column])}>{row[column]}</a></td>;
              }
              else{
              return <td>{row[column]}</td>;
            } 
            })
              }
          </tr>); 
        });
       
      // Decorate with Bootstrap CSS
      return (
      <table className="table table-bordered table-hover" width="100%">
          {tableHeaders}
          {tableBody}
      </table>) 
        }
    };


