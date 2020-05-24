<script>
  import { onMount } from "svelte";
  import { format, subDays } from "date-fns";
  import * as d3 from "d3";

  export let hours = 0;
  export let date = format(new Date(), "yyyy-MM-dd");

  export const data = [
    { date: subDays(new Date(), 3), value: 4 },
    { date: subDays(new Date(), 2), value: 12 },
    { date: subDays(new Date(), 1), value: 15 }
  ];

  let el;

  onMount(() => {
    graphData();
  });

  export const handleClick = () => {
    data.push({ date: new Date(date), value: hours });
    data.sort((a, b) => a.date - b.date);
    addData();
  };

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 1000;
  const height = 200;

  let y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  let x = d3
    .scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right]);

  let line = d3
    .line()
    .defined(d => !isNaN(d.value))
    .x(d => x(d.date))
    .y(d => y(d.value));

  const yAxis = g =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .text(data.y)
      );

  const xAxis = g =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    );

  const graphData = () => {
    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

    svg
      .append("g")
      .attr("class", "xaxis")
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "yaxis")
      .call(yAxis);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("class", "line")
      .attr("d", line);

    d3.select(el).append(() => svg.node());
  };

  const addData = () => {
    y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    x = d3
      .scaleUtc()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

    const svg = d3.select(el);
    svg.select(".line").attr("d", line);
    svg
      .selectAll("g.xaxis")
      .transition()
      .duration(1500)
      .call(xAxis);
    svg
      .selectAll("g.yaxis")
      .transition()
      .duration(1500)
      .call(yAxis);
  };
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Welcome to 10 Thousand</h1>
  <p>
    Ten Thousand provides a way to track your progress in hours over long
    periods of time. Maybe you're trying to learn guitar or a new language. Ten
    thousand lets tou track how much time you're spending refining or learning a
    new skill.
  </p>
  <p>
    Ten Thousand lets your create any goal and being tracking it easily take a
    second to try
  </p>
  <h2>Learning Italian</h2>
  <input type="number" bind:value={hours} />
  <input type="date" bind:value={date} />
  <button on:click={handleClick}>Click me</button>
  <div bind:this={el} />
</main>
