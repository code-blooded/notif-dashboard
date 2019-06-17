import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

class LineGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [
                {
                    x: [],
                    y: [],
                    type: 'scatter',
                    marker: {color: this.getColor()},
                    name: 'Model 1'
                }
            ],
            layout: { 
                title: {
                    text: "Performance vs Time",
                    font: {
                        family: 'Courier New, monospace',
                        size: 24
                    }
                },
                shapes: [
                    // filled Rectangle
                    {
                        'type': 'rect',
                        'x0': '2019-10-03 22:23:00',
                        'y0': 95,
                        'x1': '2019-10-12 22:23:00',
                        'y1': 100,
                        'fillcolor': 'green',
                        'opacity': 0.15
                    },
                    // filled Rectangle
                    {
                        'type': 'rect',
                        'x0': '2019-10-03 22:23:00',
                        'y0': 92,
                        'x1': '2019-10-12 22:23:00',
                        'y1': 95,
                        'fillcolor': 'red',
                        'opacity': 0.15
                    }
                ],
                width: 0.45 * window.innerWidth,
                height: 0.45 * window.innerHeight,
                yaxis: {
                    title: {
                        text: 'Accuracy %'
                    }
                },
                datarevision: 0
            },
            revision: 0
        };

    }
    getColor(){
        return 'rgb(' + this.getRandomInt() + ',' + this.getRandomInt() + ',' + this.getRandomInt() + ')';
    }
    getRandomInt() {
        return Math.floor(Math.random() * (255));
    }
    componentDidMount(){
        axios.get("http://localhost:4001/getVersionData").then(response=>{
            response.data.forEach(element => {
                this.state.data[0].x.push(element.timestamp);
                this.state.data[0].y.push(parseFloat(element.accuracy));
            });
            this.state.layout.datarevision = this.state.revision + 1;
            this.setState({revision: this.state.revision+1});
        });   
    } 
    render() {
        return (
            <div>
                <Plot
                    data={
                        this.state.data
                    }
                    layout={
                        this.state.layout
                    }
                    revision={
                        this.state.revision
                    }
                />
            </div>
        );
    }
}

export default LineGraph;