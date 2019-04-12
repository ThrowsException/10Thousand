import React from "react";
import ReactDOM from "react-dom";
import { ResponsiveLine, Line } from "@nivo/line";

class Welcome extends React.Component {
  componentDidMount() {
    // fetch("achievements").then(function(response) {
    //   console.log(response);
    // });
  }

  render() {
    return (
      <>
        <h1>Hello, {this.props.name}</h1>
        <Chart />
      </>
    );
  }
}

class Chart extends React.Component {
  render() {
    const data = [
      {
        id: "achievement",
        data: [
          { x: "2018-01-01", y: 7 },
          { x: "2018-01-02", y: 5 },
          { x: "2018-01-03", y: 11 },
          { x: "2018-01-04", y: 9 },
          { x: "2018-01-05", y: 12 },
          { x: "2018-01-06", y: 16 },
          { x: "2018-01-07", y: 13 },
          { x: "2018-01-08", y: 13 }
        ]
      }
    ];

    const MyResponsiveLine = ({ data }) => (
      <ResponsiveLine
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
        data={data}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          precision: "day"
        }}
        axisBottom={{
          format: "%b %d"
        }}
      />
    );

    return (
      <div style={{ height: "900px", width: "1000px" }}>
        <MyResponsiveLine data={data} />
      </div>
    );
  }
}

ReactDOM.render(<Welcome />, document.getElementById("root"));
