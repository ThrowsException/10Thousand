import React, { useState } from "react";
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

const TrackingForm = ({ submit }) => {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState(0);

  return (
    <>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input
        type="number"
        value={hours}
        onChange={e => setHours(parseInt(e.target.value))}
      />
      <button
        onClick={() => {
          submit(date, hours);
        }}
      >
        Submit
      </button>
    </>
  );
};

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(date, hours) {
    const newElement = { x: date, y: hours };

    this.setState(prevState => {
      if (prevState.data.length == 0) {
        return { data: [newElement] };
      }

      // find if date already exists
      const updateExisting = prevState.data.find(o => o.x === date);

      // Find item to update
      if (updateExisting) {
        let data = prevState.data.map(el => {
          if (el.x == date) {
            return Object.assign({}, el, { y: hours });
          } else return el;
        });
        return { data };
      }

      return {
        data: [...prevState.data, { x: date, y: hours }]
      };
    });
  }

  render() {
    const data = [
      {
        id: "achievement",
        data: this.state.data
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
      <div style={{ height: "600px", width: "900px" }}>
        <MyResponsiveLine data={data} />
        <TrackingForm submit={this.handleClick} />
      </div>
    );
  }
}

ReactDOM.render(<Welcome />, document.getElementById("root"));
