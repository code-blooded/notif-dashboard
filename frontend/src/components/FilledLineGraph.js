import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

class FilledLineGraph extends Component {
    constructor(props){
        super(props);

        this.state = {
            all : {},
            daywise : {},
            data : [
                {
                    x: [],
                    y: [],
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: 'rgb(0,176,246)'},
                    name: 'Mean'
                },
                {
                    x: [],
                    y: [],
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: 'rgba(0,176,246,0.4)'},
                    name: 'Worst'
                },
                {
                    x: [],
                    y: [],
                    fill: 'tonexty',
                    fillcolor: 'rgba(0,176,246,0.2)',
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: 'rgba(0,176,246,0.6)'},
                    name: 'Best'
                }
            ],
            layout: { 
                title: {
                    text: "Model Prediction Time vs Time",
                    font: {
                        family: 'Courier New, monospace',
                        size: 24
                    },
                },
                shapes: [],
                width: 0.45 * window.innerWidth,
                height: 0.45 * window.innerHeight,
                yaxis: {
                    title: {
                        text: 'Exec time in ms'
                    }
                }
            }
        };
    }
    render() {
        return (
            <div>
                <Plot
                data={
                    this.props.data
                }
                layout={
                    this.props.layout
                }
                />
            </div>
        );
    }
}

export default FilledLineGraph;