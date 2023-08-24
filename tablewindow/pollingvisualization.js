/*TODO:
- polling (i guess needs to run on timer? every like 5s)
    - count '1's and '2's in chat
    - update vote for each cup
    - update svg
- make bars horizontal?
- position svg better if possible??
*/

data = [{ name: 'Cup A', votes: 60 }];

width = 300;
height = 400;

const margin = { top: 50, bottom: 50, left: 50, right: 50 }

var svg = d3.select("#text887")
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    .attr('viewBox', [0, 0, width, height]);


const y = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right]);

const x = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

// // full grey bar 
svg.append('g')
    .attr('fill', 'grey')
    .selectAll('rect')
    .data(data)
    .join("rect")
    .attr('x', (d) => 100)
    .attr('y', (d, i) => x(i))
    .attr('height', y.bandwidth)
    .attr('width', d => x(0) - x(d.votes))

// blue bar
svg.append('g')
    .attr('fill', 'royalblue')
    .selectAll('rect')
    .data(data)
    .join("rect")
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', y.bandwidth())
    .attr('width', d => x(0) - x(d.votes))

svg.node()

windowManager.sharedData.watch("votesA", function (prop, action, newValue, oldValue) {
    console.log("A: " + newValue.votes);
})