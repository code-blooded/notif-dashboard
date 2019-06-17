import React, { Component } from "react";
import axios from 'axios';

class NotificationDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            Data:[]
        }
    }
    componentDidMount(){
      
        axios.get(process.env.REACT_APP_TRANSACTION_DETAILS_ADDRESS, {params: { notification_id: this.props.notification_id } }).then(response=>{
            this.setState({
                Data: response.data
            });
        })
    }
    render() {
        var detailsStyle = {
            border: '5px',
            padding: 20,
            paddingTop:20
        };
        var tableStyle={
            'list-style-type': 'none',
            display:'flex'
        }
        var listStyle = {
            padding:10,
            fontWeight:600,
            fontSize:25,
            width:'100%'
        }
        let detailsStyleLeft={
            'width':'100%',
            'text-align':'center'
        }
        let detailsStyleRight={
            'width':'100%',
            'text-align':'center'
        }
        let titleStyle={
            paddingBottom: '30px',
            'text-align':'center'
        }
        return (
            <div style={detailsStyle}>
            <h1  style={titleStyle}>Notification Details</h1>
                <ul style={tableStyle}>
                    <div style={detailsStyleLeft}> 
                    <li style={listStyle}>Account ID: {this.state.Data.account_id}</li>
                    <li style={listStyle}>Account Type: {this.state.Data.account_type}</li>
                    <li style={listStyle}>Notification ID: {this.state.Data.notification_id}</li>
                    <li style={listStyle}>Notification Type:  {this.state.Data.notification_type}</li>
                    <li style={listStyle}>Time Stamp: {this.state.Data.timestamp}</li>
                    </div>
                    <div style={detailsStyleRight}> 
                    <li style={listStyle}>Status: {this.state.Data.status}</li>
                    <li style={listStyle}>Age: {this.state.Data.age}</li>
                    <li style={listStyle}>Gender: {this.state.Data.gender}</li>
                    <li style={listStyle}>Country: {this.state.Data.country}</li>
                    <li style={listStyle}>Zip Code: {this.state.Data.zipcode}</li>
                    </div>
                </ul>
            </div>
    
        );
    }
};


 
export default NotificationDetails;