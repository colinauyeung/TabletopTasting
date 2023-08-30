require('dotenv').config()

const remote = require('electron').remote
const windowManager = remote.require('electron-window-manager');
const linkPreviewGenerator = require("link-preview-generator");
const cloud = require("d3-cloud");
const forceBoundary = require("d3-force-boundary");

const emotes = ['MechaRobot', 'ImTyping', 'Shush', 'MyAvatar', 
'PizzaTime', 'LaundryBasket', 'ModLove', 'PotFriend', 'Jebasted', 
'PogBones', 'PoroSad', 'KEKHeim', 'CaitlynS', 'HarleyWink', 'WhySoSerious', 
'DarkKnight', 'FamilyMan', 'RyuChamp', 'HungryPaimon', 'TransgenderPride',
'PansexualPride', 'NonbinaryPride', 'LesbianPride', 'IntersexPride', 'GenderFluidPride', 
'GayPride', 'BisexualPride', 'AsexualPride', 'NewRecord', 'PogChamp', 'GlitchNRG', 
'GlitchLit', 'StinkyGlitch', 'GlitchCat', 'FootGoal', 'FootYellow', 'FootBall', 
'BlackLivesMatter', 'ExtraLife', 'VirtualHug', 'R-)', 'R)', ';-p', ';p', ';-P', 
';P', ':-p', ':p', ':-P', ':P', ';-)', ';)', ':-1', ':1', ':-2', ':2', '<3', ':-o', 
':o', ':-O', ':O', '8-)', 'B-)', 'B)', 'o.o', 'o_o', 'o.O', 'o_O', 'O.O', 'O_O', 
'O.o', 'O_o', ':-Z', ':Z', ':-z', ':z', ':-|', ':|', '>(', ':-D', ':D', ':-(', 
':(', ':-)', 'BOP', 'SingsNote', 'SingsMic', 'TwitchSings', 'SoonerLater', 'HolidayTree',
'HolidaySanta', 'HolidayPresent', 'HolidayLog', 'HolidayCookie', 'GunRun', 'PixelBob', 
'FBPenalty', 'FBChallenge', 'FBCatch', 'FBBlock', 'FBSpiral', 'FBPass', 'FBRun', 'MaxLOL',
'TwitchRPG', 'PinkMercy', 'MercyWing2', 'MercyWing1', 'PartyHat', 'EarthDay', 'TombRaid',
'PopCorn', 'FBtouchdown', 'TPFufun', 'TwitchVotes', 'DarkMode', 'HSWP', 'HSCheers',
'PowerUpL', 'PowerUpR', 'LUL', 'EntropyWins', 'TPcrunchyroll', 'TwitchUnity', 'Squid4', 
'Squid3', 'Squid2', 'Squid1', 'CrreamAwk', 'CarlSmile', 'TwitchLit', 'TehePelo',
'TearGlove', 'SabaPing', 'PunOko', 'KonCha', 'Kappu', 'InuyoFace', 'BigPhish', 
'BegWan', 'ThankEgg', 'MorphinTime', 'TheIlluminati', 'TBAngel', 'MVGame', 
'NinjaGrumpy', 'PartyTime', 'RlyTho', 'UWot', 'YouDontSay', 'KAPOW', 'ItsBoshyTime', 
'CoolStoryBob', 'TriHard', 'SuperVinlin', 'FreakinStinkin', 'Poooound', 'CurseLit', 
'BatChest', 'BrainSlug', 'PrimeMe', 'StrawBeary', 'RaccAttack', 'UncleNox', 'WTRuck', 
'TooSpicy', 'Jebaited', 'DogFace', 'BlargNaut', 'TakeNRG', 'GivePLZ', 'imGlitch', 
'pastaThat', 'copyThis', 'UnSane', 'DatSheffy', 'TheTarFu', 'PicoMause', 'TinyFace', 'DxCat',
'RuleFive', 'VoteNay', 'VoteYea', 'PJSugar', 'DoritosChip', 'OpieOP', 'FutureMan', 
'ChefFrank', 'StinkyCheese', 'NomNom', 'SmoocherZ', 'cmonBruh', 'KappaWealth', 'MikeHogu',
'VoHiYo', 'KomodoHype', 'SeriousSloth', 'OSFrog', 'OhMyDog', 'KappaClaus', 'KappaRoss',
'MingLee', 'SeemsGood', 'twitchRaid', 'bleedPurple', 'duDudu', 'riPepperonis', 'NotLikeThis',
'DendiFace', 'CoolCat', 'KappaPride', 'ShadyLulu', 'ArgieB8', 'CorgiDerp', 'PraiseIt',
'TTours', 'mcaT', 'NotATK', 'HeyGuys', 'Mau5', 'PRChase', 'WutFace', 'BuddhaBar',
'PermaSmug', 'panicBasket', 'BabyRage', 'HassaanChop', 'TheThing', 'EleGiggle',
'RitzMitz', 'YouWHY', 'PipeHype', 'BrokeBack', 'ANELE', 'PanicVis', 'GrammarKing',
'PeoplesChamp', 'SoBayed', 'BigBrother', 'Keepo', 'Kippa', 'RalpherZ', 'TF2John', 'ThunBeast',
'WholeWheat', 'DAESuppy', 'FailFish', 'HotPokket', '4Head', 'ResidentSleeper', 'FUNgineer',
'PMSTwin', 'ShazBotstix', 'BibleThump', 'AsianGlow', 'DBstyle', 'BloodTrail', 'OneHand',
'FrankerZ', 'SMOrc', 'ArsonNoSexy', 'PunchTrees', 'SSSsss', 'Kreygasm', 'KevinTurtle',
'PJSalt', 'SwiftRage', 'DansGame', 'GingerPower', 'BCWarrior', 'MrDestructoid',
'JonCarnage', 'Kappa', 'RedCoat', 'TheRinger', 'StoneLightning', 'OptimizePrime', 'JKanStyle',
'R)', ';P', ':P', ';)', ':2', '<3', ':O', 'B)', 'O_o', ':|', '>(', ':D', ':(', ':)']

var height = 700;
var width = 1250;

var emotestoggle = true;
var chatbackgroundtoggle = true;
var cloudtoggle = true;

var datadots ={ 
    "nodes": 
    [
        {"id":"cup1", "fx": width/5, "fy": height/2, "color": "Black"},
        {"id":"cup2", "fx": 2*(width/5), "fy": height/2, "color":"Black"},
        {"id":"cup3", "fx": 3*(width/5), "fy": height/2, "color":"Black"},
        {"id":"cup4", "fx": 4*(width/5), "fy": height/2, "color":"Black"},
    ], 
    "links": 
    []
}

var svgdots = d3.select("#dots")
.attr("width",width)
.attr("height",height);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }).strength(d=>d.strength))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("boundary", forceBoundary(20, 20, width-20, height-20).border(10).strength(0.001));

var linkcontainer = svgdots.append("g").selectAll("line")  

var link = linkcontainer
.data(datadots.links)
.enter().append("line")
.attr("stroke","white");

var nodecontainer = svgdots.append("g").selectAll("circle")

let node = nodecontainer
.data(datadots.nodes, d=>{return d.id})
.enter().append("circle")
.attr("r", 5)
.attr("fill", d=>d.color)
.call(d3.drag()
.on("start", dragstarted)
.on("drag", dragged)
.on("end", dragended));

simulation
.nodes(datadots.nodes)
.on("tick", ticked)
.alphaDecay(0);

simulation.force("link")
.links(datadots.links);

function decay(){
datadots.links.forEach(i=>{
    if(i.strength!==0){
    i.strength = i.strength*0.99;
    }
})
simulation.force("link")
.links(datadots.links);
}

let checked = false;
function update(name,val,cup){
    checked = false;
    datadots.links.forEach(e=>{
        if(e.target.id === name){
            if(e.source.id === "cup1" && cup===0){
                e.strength = val;
            }
            if(e.source.id === "cup2" && cup===1){
                e.strength = val;
            }
            if(e.source.id === "cup3" && cup===2){
                e.strength = val;
            }
            if(e.source.id === "cup4" && cup===3){
                e.strength = val;
            }
            checked = true;
        }


    })
    if(checked){
        simulation
        .nodes(datadots.nodes)
        .on("tick", ticked)
        .alphaDecay(0);
    

        simulation.force("link")
        .links(datadots.links);
        checked = true;
        return;
    };
    var localcolor = randomcolor()
    datadots.nodes.push({id:name, color:localcolor})
    if(cup===0){
        datadots.links.push({"source": "cup1", "target": name, "strength":val})
        datadots.links.push({"source": "cup2", "target": name, "strength":0})
        datadots.links.push({"source": "cup3", "target": name, "strength":0})
        datadots.links.push({"source": "cup4", "target": name, "strength":0})
    }
    if(cup===1){
        datadots.links.push({"source": "cup1", "target": name, "strength":0})
        datadots.links.push({"source": "cup2", "target": name, "strength":val})
        datadots.links.push({"source": "cup3", "target": name, "strength":0})
        datadots.links.push({"source": "cup4", "target": name, "strength":0})
    }
    if(cup===2){
        datadots.links.push({"source": "cup1", "target": name, "strength":0})
        datadots.links.push({"source": "cup2", "target": name, "strength":0})
        datadots.links.push({"source": "cup3", "target": name, "strength":val})
        datadots.links.push({"source": "cup4", "target": name, "strength":0})
    }
    if(cup===3){
        datadots.links.push({"source": "cup1", "target": name, "strength":0})
        datadots.links.push({"source": "cup2", "target": name, "strength":0})
        datadots.links.push({"source": "cup3", "target": name, "strength":0})
        datadots.links.push({"source": "cup4", "target": name, "strength":val})
    }


    svgdots.selectAll("circle").remove()
    svgdots.selectAll("line").remove()
    
    node = nodecontainer
    .data(datadots.nodes, d=>{return d.id})
    .enter().append("circle")
    .attr("r", 5)
    .attr("fill", d=>d.color)
    .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

    link = linkcontainer
    .data(datadots.links)
    .enter().append("line")
    .attr("stroke","white")
    .attr("opacity", "0");

    // node = node.merge(newnode)

    simulation
    .nodes(datadots.nodes)
    .on("tick", ticked)
    .alphaDecay(0);


    simulation.force("link")
    .links(datadots.links);
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

const colorsdots = ["Blue", "BlueViolet", "Coral", "Chartreuse", "DarkGreen", 
"DarkGoldenRod", "Crimson","Orange", "Gold", "PowderBlue", "Peru", "Pink", "Plum",
"SlateGray", "Teal", "LightGreen", "Maroon"]

function randomcolor(){
    var index = Math.ceil(Math.random() * colorsdots.length)
    return colorsdots[index]
}

function hide(){
    var clouds = document.getElementsByClassName("cloud");
    for(var i = 0; i<clouds.length; i++){
        clouds[i].style.visibility = "hidden"
    }
    var scrallchat = document.getElementsByClassName("scrollchat");
    for(var i = 0; i<scrallchat.length; i++){
        scrallchat[i].style.visibility = "hidden"
    }
    var bars = document.getElementsByClassName("bars");
    for(var i = 0; i<bars.length; i++){
        bars[i].style.visibility = "hidden"
    }
    var chats = document.getElementsByClassName("chat");
    for(var i = 0; i<chats.length; i++){
        chats[i].style.visibility = "hidden"
    }
    var notes = document.getElementsByClassName("notes");
    for(var i = 0; i<notes.length; i++){
        notes[i].style.visibility = "hidden"
    }
    emotestoggle = false;
    chatbackgroundtoggle = false;
    cloudtoggle = false;
    document.getElementById("dots").style.visibility = "hidden";
}

document.addEventListener("keydown", (event) => {
    // if (event.isComposing || event.keyCode === 229) {
    //   return;
    // }
    if(!event.ctrlKey){
        return;
    }
    if(event.code==="ControlLeft"){
        return;
    }
    hide()
    if(event.code === "Digit1"){
        cloudtoggle = true;
        var clouds = document.getElementsByClassName("cloud");
        for(var i = 0; i<clouds.length; i++){
            clouds[i].style.visibility = "visible"
        }
    }
    if(event.code === "Digit2"){
        emotestoggle = true;
    }
    if(event.code === "Digit3"){
        chatbackgroundtoggle = true;
    }
    if(event.code==="Digit4"){
        document.getElementById("dots").style.visibility = "visible";
    }
    // if
    if(event.code==="Digit5"){
        var chats = document.getElementsByClassName("chat");
        for(var i = 0; i<chats.length; i++){
            chats[i].style.visibility = "visible"
        }
    }

    if(event.code==="Digit6"){
        var notes = document.getElementsByClassName("notes");
        for(var i = 0; i<notes.length; i++){
            notes[i].style.visibility = "visible"
        }
    }

    if(event.code==="Digit7"){
        var bars = document.getElementsByClassName("bars");
        for(var i = 0; i<bars.length; i++){
            bars[i].style.visibility = "visible"
        }
    }
    console.log(event.code);
});

// setInterval(function(){console.log("Hello")}, 100)

//https://observablehq.com/@d3/word-cloud
const stopwords = new Set("i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(","))

function seperate(word){
    return words = word.split(/[\s.]+/g)
    .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
    .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
    .map(w => w.replace(/['’]s$/g, ""))
    .map(w => w.substring(0, 30))
    .map(w => w.toLowerCase())
    .filter(w => w && !stopwords.has(w))
}

//https://stackoverflow.com/questions/26881137/create-dynamic-word-cloud-using-d3-js

var fill = d3.scaleOrdinal(d3.schemeCategory10);
// var total = 1;
var data = [];
var datab = [];
var datac = [];
var datad = [];

function calcsize(weight, ltotal){
    // console.log((42 * (weight/total)) + 8)
    return ((10 * (weight/ltotal))*4) + 20
}

function updatecloud(lcdata, cloudid){
    lcdata.sort((a,b)=>{return -(a.count - b.count)});
    var data2 = lcdata.slice(0, 30);
    var max = 1;
    var total2 = 0;
    data2.forEach(d=>{
        if(d.count > max){
            max = d.count;
        }
        total2 = total2 + d.count;
    });
    // var scale = d3.scalePow([10,50],[1,max]);
    data2.forEach(d=>{
        d.weight = calcsize(d.count,total2);
        // d.weight = scale(d.count);
    })
    cloud().size([300, 300])
      .words(data2.map(function(d) {
        return {text: d.word, size: d.weight};
      }))
      .padding(1) 
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

    function draw(words) {
    
      console.log(words)
      document.getElementById(cloudid).innerHTML = "";
      d3.select("#"+ cloudid)
        .attr("width", 300)
        .attr("height", 300)
        .style("animation", "fade 10000ms 0ms infinite")
      .append("g")
        .attr("transform", "translate(150,150)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {

          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
}

setInterval(d=>{
    if(!cloudtoggle){
        return
    }
    updatecloud(data, "cloud")
}, 10000);

setInterval(d=>{
    if(!cloudtoggle){
        return
    }
    updatecloud(datab, "cloud2")
}, 10000);

setInterval(d=>{
    if(!cloudtoggle){
        return
    }
    updatecloud(datac, "cloud3")
}, 10000);

setInterval(d=>{
    if(!cloudtoggle){
        return
    }
    updatecloud(datad, "cloud4")
}, 10000);


//https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.05;
    }, 200);
}


const cups = [502, 887];

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function updatetracking(newValue, cupname, cupid ){
    let svgx = ((newValue.refx - 625) * 1.50)+625;
    let svgy = ((newValue.refy-350)*1.5)+350;
    var cup = document.getElementById(cupid)
    let x = svgx;
    let y = svgy;
    // let time = Date.now();
    // if(time > timestamp + 1000){
    //     timestamp = time;
    // }
    setTranslate(x, y, cup);

    // let svgx = ((newValue.refx - 625) * 1.50)+625;
    // let svgy = ((newValue.refy-350)*1.5)+350;
    node.each(d=>{
        if(d.id === cupname){
            d.fx = svgx;
            d.fy = svgy;
        }
    })

}

var timestamp = 0;
windowManager.sharedData.watch("cup887", function(prop, action, newValue, oldValue){
    updatetracking(newValue, "cup1", "cup887")
})

var timestamp2 = 0;
windowManager.sharedData.watch("cup502", function(prop, action, newValue, oldValue){
    updatetracking(newValue, "cup2", "cup502")
})

windowManager.sharedData.watch("cup740", function(prop, action, newValue, oldValue){
    updatetracking(newValue, "cup3", "cup740")
})

windowManager.sharedData.watch("cup53", function(prop, action, newValue, oldValue){
    updatetracking(newValue, "cup4", "cup53")
})

function setweights(data, message){
    var localwords = seperate(message);

    localwords.forEach(d=>{
        var found = false;
        data.forEach(e=>{
            if(d===e.word){
                e.count = e.count +1;
                e.weight=calcsize(e.count)
                found = true;
            }
        })  
        if(!found){
            data.push({word:d, count:1, weight:calcsize(1)});
        }  

        data.forEach(e=>{
            // if(d===e.word){
                // e.count = e.count +1;
            e.weight=calcsize(e.count);
                // found = true;
            // }
        })  
    })
}

function writechat(chatid, newValue){
    let text = document.getElementById(chatid)
    // text.append(newValue.name + ": " + newValue.message)
    const child = document.createElement('p');
    const user = document.createElement('span');
    user.append(newValue.name + ": ");
    user.classList.add('username');
    user.style.color = randomcolor();
    const message = document.createElement('span');
    message.append(newValue.message);
    child.appendChild(user);
    child.appendChild(message);

    // child.append(newValue.name + ": " + newValue.message)
    text.appendChild(child);

    if (text.childNodes.length > 5) {
        text.removeChild(text.firstChild);
    }
}

function drawemotes(textid, message){
    if(emotestoggle === true){
        let cup = document.getElementById(textid)
        // cup.appendChild(el);
        let div1 = document.createElement("div");
        var time = 4000+(Math.random()*3000);
        div1.style.animation = "up "+time+"ms 233ms infinite"
        div1.style.position = "absolute"
        var side = -25 + (Math.random()*50);
        div1.style.transform ="translateX("+side+"%)"
        let div2 = document.createElement("div");
        var time2 = 2500+(Math.random()*1000);
        div2.style.animation = "wobble"+1+" "+time2+"ms 275ms infinite ease-in-out";
        let img = document.createElement("img");
        img.src = `../twitchemotes/${message}.jpg`;
        img.style.width = "50%"
        // fade(img)
        cup.appendChild(div1);
        div1.appendChild(div2);
        div2.appendChild(img);
        var timer = setTimeout(function(){
            div1.remove();
        }, time)
    }
}

function updatescrollchat(message){
    if(chatbackgroundtoggle===true){
        let mainbox = document.getElementById("mainbox");
        let textbox = document.createElement("div");
        textbox.className = "scrollchat";
        textbox.innerHTML = message;
        var percent = 100;
        textbox.style.left = percent+"%";
        var height = 10+(Math.random()*80)
        textbox.style.top = height+"%"
        var size = 14+Math.ceil(Math.random()*16)
        textbox.style.fontSize = size+"px";
        var ran = Math.floor(Math.random()*4.9)
        textbox.style.color = palette[ran]
        var timer = setInterval(function(){
            percent = percent - 0.1;
            textbox.style.left = percent+"%";
        }, 20)
        mainbox.appendChild(textbox);
    }
}

var palette = ["#F5C1C1", "#FFFAB0", "#CBF2B8", "#DFC5E8", "#BAEEE5"]

windowManager.sharedData.watch("chat887", function(prop, action, newValue, oldValue){
    console.log(newValue)
    update(newValue.name, 1, 0);
    if(emotes.includes(newValue.message)){
        drawemotes("text887", newValue.message) 
    }

    setweights(datab, newValue.message)

    writechat("chat887", newValue)

})

windowManager.sharedData.watch("chat502", function(prop, action, newValue, oldValue){
    update(newValue.name, 1, 1);
    console.log(newValue)
    if(emotes.includes(newValue.message)){
        drawemotes("text502", newValue.message)
        
    }
    updatescrollchat(newValue.message)

    setweights(data, newValue.message)

    writechat("chat502", newValue)

})

windowManager.sharedData.watch("chat740", function(prop, action, newValue, oldValue){
    update(newValue.name, 1, 2);
    console.log(newValue)
    if(emotes.includes(newValue.message)){
        drawemotes("text740", newValue.message)
        
    }
    updatescrollchat(newValue.message)

    setweights(datac, newValue.message)

    writechat("chat740", newValue)

})

windowManager.sharedData.watch("chat53", function(prop, action, newValue, oldValue){
    update(newValue.name, 1, 3);
    console.log(newValue)
    if(emotes.includes(newValue.message)){
        drawemotes("text53", newValue.message)
        
    }
    updatescrollchat(newValue.message)

    setweights(datad, newValue.message)

    writechat("chat53", newValue)

})




