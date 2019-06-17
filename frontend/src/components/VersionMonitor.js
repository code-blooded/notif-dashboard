import React, { Component } from 'react';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import FilledLineGraph from './FilledLineGraph';
import PieChart from './PieChart';
import axios from 'axios';
import Graph from './Graph';

class VersionMonitor extends Component {
    constructor(props){
        super(props);

        this.state = {
            all: {},
            daywise: {},
            confusion_daywise: {},
            nvt : {
                data : {
                    x: [],
                    y: [],
                    type: 'scatter',
                    marker: {color: 'red'}
                },
                layout : { 
                    title: {
                        text: "Notifications vs Time"
                    }
                }
            }
        }

    }
    
    componentDidMount(){

        axios.get(process.env.REACT_APP_GET_ALL_NOTIFICATIONS_ADDRESS).then(response=>{
            this.state.all=response.data;
            this.setState({});

            for (let index = 0; index < this.state.all.length; index++) {
                const element = this.state.all[index];
                let day = element['timestamp'].split(" ")[0];
                if(day in this.state.daywise){
                    this.state.daywise[day].push(element);
                } else {
                    this.state.daywise[day] = [];
                    this.state.daywise[day].push(element)
                }
            }
    
            let X = Object.keys(this.state.daywise);

            let Y = []
            for (let index = 0; index < X.length; index++) {
                const element = this.state.daywise[X[index]];
                Y.push(element.length);
            }

            console.log(X,Y);

            this.state.nvt.data = [
                {
                    x: X,
                    y: Y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: 'rgba(0,176,246,0.4)'},
                    name: 'Worst'
                }
            ];

            this.setState({});

        });


      }

    render() {
        var displayStyles = {
            'display':'flex', 
            'flex-direction':'row'
        };
        return (
            <div>
                <div style={displayStyles}>
                    <Graph data={this.state.nvt.data}></Graph>
                </div>
            </div>
        );
    }
}

export default VersionMonitor;