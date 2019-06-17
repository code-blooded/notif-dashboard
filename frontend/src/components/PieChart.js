import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class PieChart extends Component {
    state = {
        layout: { 
            title: {
                text: "Graph",
                font: {
                    family: 'Courier New, monospace',
                    size: 24
                }
            },
            shapes: [],
            barmode: 'stack',
            width: 0.45 * window.innerWidth,
            height: 0.45 * window.innerHeight,
            yaxis: {
                title: {
                    text: 'No. of Frauds'
                }
            }
        }
    };
    componentDidMount(){
        this.state.layout['title']['text'] = this.props.titleText;
    }
    render() {
        return (
            <div>
                <Plot
                data={
                    this.props.data
                }
                layout={
                    this.state.layout
                }
                />
            </div>
        );
    }
}

export default PieChart;