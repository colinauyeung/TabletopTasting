require('dotenv').config()

const remote = require('electron').remote
const windowManager = remote.require('electron-window-manager');
const linkPreviewGenerator = require("link-preview-generator");
const forceBoundary = require("d3-force-boundary");

const cups = [502, 887];

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

async function getlinkpreview(link) {
    let bits = link.split(":");
    if (bits.length < 1) {
        return null;
    }
    if (bits[0] === "http" || bits[0] == "https") {
        const previewData = await linkPreviewGenerator(link);
        var box = document.createElement("div");
        box.className = "previewbox";
        var image = document.createElement("img");
        image.src = previewData.img;
        image.className = "previewimg";
        var text = document.createElement("div");
        text.className = "previewtext";
        var title = document.createElement("h3");
        title.className = "previewtitle";
        title.innerHTML = previewData.title;
        var description = document.createElement("p");
        description.className = "previewdescription";
        description.innerHTML = previewData.description;

        text.appendChild(title);
        text.appendChild(description);
        box.appendChild(image);
        box.appendChild(text);
        return box;
    }
    return null;


}

var timestamp = 0;

// windowManager.sharedData.watch("chat887", function (prop, action, newValue, oldValue) {
//     console.log(newValue)
    // let text = document.getElementById("chat887")
    // const child = document.createElement('p');
    // const user = document.createElement('span');
    // user.append(newValue.name + ": ");
    // user.classList.add('username');
    // const message = document.createElement('span');
    // message.append(newValue.message);
    // child.appendChild(user);
    // child.appendChild(message);

    // // child.append(newValue.name + ": " + newValue.message)
    // text.appendChild(child);

    // console.log("nodes:" + text.childNodes.length)
    // if (text.childNodes.length > 5) {
    //     text.removeChild(text.firstChild);
    // }
// })

// windowManager.sharedData.watch("chat502", function (prop, action, newValue, oldValue) {
    // console.log(newValue)
    // let text = document.getElementById("chat502")
    // // text.append(newValue.name + ": " + newValue.message)
    // const child = document.createElement('p');
    // const user = document.createElement('span');
    // user.append(newValue.name + ": ");
    // user.classList.add('username');
    // const message = document.createElement('span');
    // message.append(newValue.message);
    // child.appendChild(user);
    // child.appendChild(message);

    // // child.append(newValue.name + ": " + newValue.message)
    // text.appendChild(child);

    // if (text.childNodes.length > 5) {
    //     text.removeChild(text.firstChild);
    // }
// })


var height = 700;
var width = 1250;
// var data ={ 
//     "nodes": 
//     [{"id": "cup1", "fx": width/4, "fy": height/2},
//     {"id":"cup2", "fx": 3*(width/4), "fy": height/2},
//     {"id": "A"},
//     {"id": "B"},
//     {"id": "C"},
//     {"id": "D"},
//     {"id": "E"},
//     {"id": "F"},
//     {"id": "G"},
//     {"id": "H"},
//     {"id": "I"},
//     {"id": "J"},
//     {"id": "K"}], 
//     "links": 
//     [{"source": "cup1", "target": "A", "strength":1},
//     {"source": "cup1", "target": "B", "strength":0.5},
//     {"source": "cup1", "target": "C", "strength":0.2}, 
//     {"source": "cup2", "target": "A", "strength":0},
//     {"source": "cup2", "target": "B", "strength":0.5},
//     {"source": "cup2", "target": "C", "strength":0.8},
//     {"source": "cup1", "target": "D", "strength":0.1},
//     {"source": "cup2", "target": "D", "strength":0.9},
//     {"source": "cup1", "target": "E", "strength":0.4},
//     {"source": "cup2", "target": "E", "strength":0.6},
//     {"source": "cup1", "target": "F", "strength":0.7},
//     {"source": "cup2", "target": "F", "strength":0.3},
//     {"source": "cup1", "target": "G", "strength":0},
//     {"source": "cup2", "target": "G", "strength":1},
//     {"source": "cup1", "target": "H", "strength":0.3},
//     {"source": "cup2", "target": "H", "strength":0.7},
//     {"source": "cup1", "target": "I", "strength":0.9},
//     {"source": "cup2", "target": "I", "strength":0.1},
//     {"source": "cup1", "target": "J", "strength":0.6},
//     {"source": "cup2", "target": "J", "strength":0.4},
//     {"source": "cup1", "target": "K", "strength":0},
//     {"source": "cup2", "target": "K", "strength":0},
//     ]
//     }

var data ={ 
    "nodes": 
    [
        {"id": "cup1", "fx": width/4, "fy": height/2, "color": "Black"},
        {"id":"cup2", "fx": 3*(width/4), "fy": height/2, "color":"Black"}
    ], 
    "links": 
    []
}

const colors = ["Blue", "BlueViolet", "Coral", "Chartreuse", "DarkGreen", 
"DarkGoldenRod", "Crimson","Orange", "Gold", "PowderBlue", "Peru", "Pink", "Plum",
"SlateGray", "Teal", "LightGreen", "Maroon"]
function randomcolor(){
    var index = Math.ceil(Math.random() * colors.length)
    return colors[index]
}

var svg = d3.select("svg")
.attr("width",width)
.attr("height",height);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }).strength(d=>d.strength))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("boundary", forceBoundary(20, 20, width-20, height-20).border(10).strength(0.001));

var linkcontainer = svg.append("g").selectAll("line")  

var link = linkcontainer
.data(data.links)
.enter().append("line")
.attr("stroke","white");

var nodecontainer = svg.append("g").selectAll("circle")

let node = nodecontainer
.data(data.nodes, d=>{return d.id})
.enter().append("circle")
.attr("r", 5)
.attr("fill", d=>d.color)
.call(d3.drag()
.on("start", dragstarted)
.on("drag", dragged)
.on("end", dragended));

simulation
.nodes(data.nodes)
.on("tick", ticked)
.alphaDecay(0);

simulation.force("link")
.links(data.links);

function decay(){
data.links.forEach(i=>{
    if(i.strength!==0){
    i.strength = i.strength*0.99;
    }
})
simulation.force("link")
.links(data.links);
}

let checked = false;
function update(name,val,cup){
    checked = false;
    data.links.forEach(e=>{
        if(e.target.id === name){
            if(e.source.id === "cup1"){
                if(cup===1){
                    e.strength = val;
                }
            }
            else{
                if(cup!==1){
                    e.strength = val;
                }
                
            }
            checked = true;
        }


    })
    if(checked){
        simulation
        .nodes(data.nodes)
        .on("tick", ticked)
        .alphaDecay(0);
    

        simulation.force("link")
        .links(data.links);
        checked = true;
        return;
    };
    var localcolor = randomcolor()
    data.nodes.push({id:name, color:localcolor})
    if(cup===1){
        data.links.push({"source": "cup1", "target": name, "strength":val})
        data.links.push({"source": "cup2", "target": name, "strength":0})
    }
    else{
        data.links.push({"source": "cup1", "target": name, "strength":0})
        data.links.push({"source": "cup2", "target": name, "strength":val})
    }


    svg.selectAll("circle").remove()
    svg.selectAll("line").remove()
    
    node = nodecontainer
    .data(data.nodes, d=>{return d.id})
    .enter().append("circle")
    .attr("r", 5)
    .attr("fill", d=>d.color)
    .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

    link = linkcontainer
    .data(data.links)
    .enter().append("line")
    .attr("stroke","white");

    // node = node.merge(newnode)

    simulation
    .nodes(data.nodes)
    .on("tick", ticked)
    .alphaDecay(0);


    simulation.force("link")
    .links(data.links);
}

    
function ticked() {
link
.attr("x1", function(d) { return d.source.x; })
.attr("y1", function(d) { return d.source.y; })
.attr("x2", function(d) { return d.target.x; })
.attr("y2", function(d) { return d.target.y; });
node
.attr("cx", function(d) { return d.x; })
.attr("cy", function(d) { return d.y; });
}    
    
// Reheat the simulation when drag starts, and fix the subject position.
function dragstarted(event) {
if (!event.active) simulation.alphaTarget(0.3).restart();
event.fx = d3.event.x;
event.fy = d3.event.y;
}

// Update the subject (dragged node) position during drag.
function dragged(event) {
event.fx = d3.event.x;
event.fy = d3.event.y;
}

// Restore the target alpha so the simulation cools after dragging ends.
// Unfix the subject position now that it’s no longer being dragged.
function dragended(event) {
if (!event.active) simulation.alphaTarget(0);
event.fx = null;
event.fy  = null;
}

let timer = setInterval(decay, 500);

windowManager.sharedData.watch("chat887", function (prop, action, newValue, oldValue) {
    update(newValue.name, 1, 1);
})

windowManager.sharedData.watch("chat502", function (prop, action, newValue, oldValue) {
    update(newValue.name, 1, 0);
})

// windowManager.sharedData.watch("chat", function (prop, action, newValue, oldValue) {
//     console.log(newValue)
//     if (newValue) {
//         let chatA = document.getElementById("chat887").style.visibility = "visible";
//         let chatB = document.getElementById("chat502").style.visibility = "visible";
//     }
// })
var timestamp = 0;
windowManager.sharedData.watch("cup887", function (prop, action, newValue, oldValue) {
    // var cup = document.getElementById("cup887")


    



    let x = ((newValue.refx - 625) * 1.50)+625;
    let y = ((newValue.refy-350)*1.5)+350;
    // let time = Date.now();
    // if (time > timestamp + 1000) {
    //     timestamp = time;
    // }
    // setTranslate(x, y, cup);
    node.each(d=>{
        if(d.id === "cup1"){
            d.fx = x;
            d.fy = y;
        }
    })
})

var timestamp2 = 0;
windowManager.sharedData.watch("cup502", function (prop, action, newValue, oldValue) {
    // var cup = document.getElementById("cup502")
    console.log(newValue);
    let x = ((newValue.refx - 625) * 1.50)+625;
    let y = ((newValue.refy-350)*1.5)+350;
    // let time = Date.now();
    // if (time > timestamp2 + 1000) {
    //     timestamp2 = time;
    // }
    // setTranslate(x, y, cup);
    node.each(d=>{
        if(d.id === "cup2"){
            d.fx = x;
            // d.fx = newValue.refx;
            d.fy = y;
            // d.fy = newValue.refy;
        }
    })
})
