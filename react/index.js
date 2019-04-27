import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ResponsiveLine, Line } from "@nivo/line";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-areas: "content";
`;

const Layout = styled.div`
  grid-area: content;
  height: 75vh;
  width: 100vw;
`;

const Welcome = props => {
  return (
    <Container>
      <Layout>
        <h1>Hello, {props.name}</h1>
        <Chart />
      </Layout>
    </Container>
  );
};

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

const Chart = () => {
  const [data, setData] = useState([]);

  const handleClick = (date, hours) => {
    const newElement = { x: date, y: hours };

    if (data.length === 0) {
      setData([newElement]);
    } else {
      // find if date already exists
      const updateExisting = data.find(o => o.x === date);

      // Find item to update
      if (updateExisting) {
        let updated = data.map(el => {
          if (el.x == date) {
            return Object.assign({}, el, { y: hours + el.y });
          } else return el;
        });
        setData(updated);
      } else {
        setData([...data, { x: date, y: hours }]);
      }
    }
  };

  const MyResponsiveLine = ({ achievement }) => {
    return (
      <ResponsiveLine
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
        data={achievement}
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
  };

  let total = 0;
  let sorted = data
    .sort((a, b) => {
      return new Date(a.x) - new Date(b.x);
    })
    .map(x => {
      total += x.y;
      x.y = total;
      return x;
    });

  return (
    <>
      <MyResponsiveLine
        achievement={[
          {
            id: "achievement",
            data: sorted
          }
        ]}
      />
      <TrackingForm submit={handleClick} />
    </>
  );
};

ReactDOM.render(<Welcome />, document.getElementById("root"));
