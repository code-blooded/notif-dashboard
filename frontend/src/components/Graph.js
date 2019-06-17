import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class Graph extends Component {
    state = {
        layout: { 
            title: {
                text: "Notifications vs Time",
                font: {
                    family: 'Courier New, monospace',
                    size: 24
                }
            },
            shapes: [],
            width: 0.45 * window.innerWidth,
            height: 0.45 * window.innerHeight,
            yaxis: {
                title: {
                    text: 'No. of notifications'
                }
            }
        }
    };
  render() {
    return (
        <div>
         <Plot
           data={[
                this.props.data
           ]}
           layout={
               this.state.layout
           }
         />
       </div>
    );
  }
}

export default Graph;