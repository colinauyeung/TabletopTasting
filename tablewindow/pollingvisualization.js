votesA = [0];
votesB = [0]

width = 500;
height = 70;
total = 0

const margin = { top: 50, bottom: 50, left: 50, right: 50 }

// Object A
var svgA = d3.select("#text887")
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    .attr('viewBox', [0, 0, width, height]);


const y = d3.scaleBand()
    .domain(1)
    .range([height, 0]);

const x = d3.scaleLinear()
    .domain([0, 100])
    .range([margin.left, width - margin.right]);

// full grey bar 
svgA.append('g')
    .attr('fill', 'grey')
    .selectAll('rect')
    .data(votesA)
    .enter().append("rect")
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', y.bandwidth)
    .attr('width', width)

// blue bar
svgA.append('g')
    .attr('fill', 'royalblue')
    .attr("id", "rectA")
    .selectAll('rect')
    .data(votesA)
    .enter().append("rect")
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', y.bandwidth())
    .attr('width', (votesA[0] / total) * width)

svgA.node()

var svgB = d3.select("#text502")
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    .attr('viewBox', [0, 0, width, height]);

// full grey bar 
svgB.append('g')
    .attr('fill', 'grey')
    .selectAll('rect')
    .data(votesB)
    .enter().append("rect")
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', y.bandwidth)
    .attr('width', width)

// blue bar
svgB.append('g')
    .attr('fill', 'royalblue')
    .attr("id", "rectB")
    .selectAll('rect')
    .data(votesB)
    .enter().append("rect")
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', y.bandwidth())
    .attr('width', (votesB[0] / total) * width)

svgB.node()

// update votes for object A
windowManager.sharedData.watch("votesA", function (prop, action, newValue, oldValue) {
    console.log("A: " + newValue.votes);
    votesA[0]++;
    total++;
    updateBar("#rectA", votesA);
    updateBar("#rectB", votesB)
})

// update votes for object B
windowManager.sharedData.watch("votesB", function (prop, action, newValue, oldValue) {
    console.log("B: " + newValue.votes);
    votesB[0]++;
    total++;
    updateBar("#rectA", votesA);
    updateBar("#rectB", votesB)
})

function updateBar(rect, votes) {
    var rects = d3.select(rect)
        .selectAll("rect")
        .data(votesA);

    // enter selection
    rects
        .enter().append("rect");

    // update selection
    rects
        .transition()
        .duration(300)
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', y.bandwidth())
        .attr('width', (votes[0] / total) * width)

    // exit selection
    rects
        .exit().remove();
}