votesA = [0];
votesB = [0];
votesC = [0];

width = 500;
height = 70;
total = 0

const margin = { top: 50, bottom: 50, left: 50, right: 50 }
var format = d3.format(".0%")

const y = d3.scaleBand()
    .domain(1)
    .range([height, 0]);

const x = d3.scaleLinear()
    .domain([0, 100])
    .range([margin.left, width - margin.right]);

function makebar(votesArr, aID){
    // Object A
    var svgA = d3.select("#bar" + aID)
    .attr("width", width)
    .attr("height", height)
    .attr('viewBox', [0, 0, width, height]);

    // full grey bar 
    svgA.append('g')
        .attr('fill', 'grey')
        .selectAll('rect')
        .data(votesArr)
        .enter().append("rect")
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', y.bandwidth)
        .attr('width', width)

    // blue bar
    svgA.append('g')
        .attr('fill', 'royalblue')
        .attr("id", "rect" + aID)
        .selectAll('rect')
        .data(votesArr)
        .enter().append("rect")
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', y.bandwidth())
        .attr('width', (votesA[0] / total) * width)

    svgA.select("#rect" + aID) // adding the text labels to the bar
        .data(votesArr)
        .enter().append("text")
        .attr("id", "text"+aID)
        .attr("x", 465)
        .attr("y", 35) // y position of the text inside bar
        .attr("dx", -3) // padding-right
        .attr("dy", ".35em") // vertical-align: middle
        .attr("text-anchor", "end") // text-align: right
        .attr("fill", "white")
        .attr("font-size", "20px")
        .text("0% (0)");

    svgA.node()
}

makebar(votesA, "A")
makebar(votesB, "B")
makebar(votesC, "C")

// // Object A
// var svgA = d3.select("#barA")
// .attr("width", width)
// .attr("height", height)
// .attr('viewBox', [0, 0, width, height]);

// // full grey bar 
// svgA.append('g')
//     .attr('fill', 'grey')
//     .selectAll('rect')
//     .data(votesA)
//     .enter().append("rect")
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('height', y.bandwidth)
//     .attr('width', width)

// // blue bar
// svgA.append('g')
//     .attr('fill', 'royalblue')
//     .attr("id", "rectA")
//     .selectAll('rect')
//     .data(votesA)
//     .enter().append("rect")
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('height', y.bandwidth())
//     .attr('width', (votesA[0] / total) * width)

// svgA.select("#rectA") // adding the text labels to the bar
//     .data(votesA)
//     .enter().append("text")
//     .attr("id", "textB")
//     .attr("x", 465)
//     .attr("y", 35) // y position of the text inside bar
//     .attr("dx", -3) // padding-right
//     .attr("dy", ".35em") // vertical-align: middle
//     .attr("text-anchor", "end") // text-align: right
//     .attr("fill", "white")
//     .attr("font-size", "20px")
//     .text("0% (0)");

// svgA.node()

// var svgB = d3.select("#barB")
//     .attr("width", width)
//     .attr("height", height)
//     .attr('viewBox', [0, 0, width, height]);

// // full grey bar 
// svgB.append('g')
//     .attr('fill', 'grey')
//     .selectAll('rect')
//     .data(votesB)
//     .enter().append("rect")
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('height', y.bandwidth)
//     .attr('width', width)

// // blue bar
// svgB.append('g')
//     .attr('fill', 'royalblue')
//     .attr("id", "rectB")
//     .selectAll('rect')
//     .data(votesB)
//     .enter().append("rect")
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('height', y.bandwidth())
//     .attr('width', (votesB[0] / total) * width)

// svgB.select("#rectB") // adding the text labels to the bar
//     .data(votesB)
//     .enter().append("text")
//     .attr("id", "textB")
//     .attr("x", 465)
//     .attr("y", 35) // y position of the text inside bar
//     .attr("dx", -3) // padding-right
//     .attr("dy", ".35em") // vertical-align: middle
//     .attr("text-anchor", "end") // text-align: right
//     .attr("fill", "white")
//     .attr("font-size", "20px")
//     .text("0% (0)");

// svgB.node()

// update votes for object A
windowManager.sharedData.watch("votesA", function (prop, action, newValue, oldValue) {
    console.log("A: " + newValue.votes);
    votesA[0]++;
    total++;
    updateBar("A", votesA);
    updateBar("B", votesB)
})

// update votes for object B
windowManager.sharedData.watch("votesB", function (prop, action, newValue, oldValue) {
    console.log("B: " + newValue.votes);
    votesB[0]++;
    total++;
    updateBar("A", votesA);
    updateBar("B", votesB)
})

function updateBar(object, votes) {
    var rects = d3.select("#rect" + object)
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

    // update text
    let percent = (votes / total)
    console.log(percent);
    var texts = d3.select("#rect" + object)
        .selectAll("text")
        .data(votesA);

    console.log(texts);
    // enter selection
    texts
        .enter().append("text");

    // update selection
    texts
        .attr("x", 480)
        .attr("y", 35) // y position of the text inside bar
        .attr("dx", -3) // padding-right
        .attr("dy", ".35em") // vertical-align: middle
        .attr("text-anchor", "end") // text-align: right
        .attr("fill", "white")
        .attr("font-size", "20px")
        .text(format(percent) + " (" + votes + ")");


    // exit selection
    texts
        .exit().remove();


}