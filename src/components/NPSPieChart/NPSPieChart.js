import * as React from "react";

import { Component } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./NPSPieChart.scss";
//things I would never do:
class NPSPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }

  render() {
    return (
      <div className="NPSPieChart">
        <PieChart
          data={this.props.data}
          {...this.props}
          radius={PieChart.defaultProps.radius - 7}
          label={({ dataEntry }) => {
            if (dataEntry.value > 0) {
              return Math.round(dataEntry.percentage) + "%";
            } else {
              return "";
            }
          }}
          labelPosition={100 - 40 / 2}
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontSize: "8px",
            color: "white",
          }}
          animate
          segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
          lineWidth={40}
          labelStyle={{
            fill: "#fff",
            opacity: 0.75,
            fontSize: "8px",
            pointerEvents: "none",
          }}
          onMouseOver={(_, index) => {
            this.setState({
              selected: index + 1,
            });
          }}
          onMouseOut={() => {
            this.setState({
              selected: undefined,
            });
          }}
        />
        <span className="inner-text">
          {this.state.selected && this.state.selected > 0 && (
            <span>
              {this.props.data[this.state.selected - 1].title +
                ":  " +
                this.props.data[this.state.selected - 1].value}
            </span>
          )}
        </span>
      </div>
    );
  }
}
export default NPSPieChart;
