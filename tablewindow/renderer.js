require('dotenv').config()

const remote = require('electron').remote
const windowManager = remote.require('electron-window-manager');
const linkPreviewGenerator = require("link-preview-generator");

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

async function getlinkpreview(link){
    let bits = link.split(":");
    if(bits.length < 1){
        return null;
    }
    if(bits[0] === "http" || bits[0] == "https"){
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
windowManager.sharedData.watch("cup887", function(prop, action, newValue, oldValue){
    var cup = document.getElementById("cup887")
    let x = newValue.refx - 25;
    let y = newValue.refy - 25;
    let time = Date.now();
    if(time > timestamp + 1000){
        timestamp = time;
    }
    setTranslate(x, y, cup);
})

var timestamp2 = 0;
windowManager.sharedData.watch("cup502", function(prop, action, newValue, oldValue){
    var cup = document.getElementById("cup502")
    let x = newValue.refx - 25;
    let y = newValue.refy - 25 - (50*1);
    let time = Date.now();
    if(time > timestamp2 + 1000){
        timestamp2 = time;
    }
    setTranslate(x, y, cup);
})

windowManager.sharedData.watch("chat887", function(prop, action, newValue, oldValue){
    console.log(newValue)
    if(emotes.includes(newValue.message)){
        let cup = document.getElementById("text887")
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
        img.src = `../twitchemotes/${newValue.message}.jpg`;
        img.style.width = "50%"
        // fade(img)
        cup.appendChild(div1);
        div1.appendChild(div2);
        div2.appendChild(img);
        var timer = setTimeout(function(){
            div1.remove();
        }, time)
        
    }

})

var palette = ["#F5C1C1", "#FFFAB0", "#CBF2B8", "#DFC5E8", "#BAEEE5"]

windowManager.sharedData.watch("chat502", function(prop, action, newValue, oldValue){
    console.log(newValue)
    if(emotes.includes(newValue.message)){
        // let cup = document.getElementById("text502")
        // // cup.appendChild(el);
        // let img = document.createElement("img");
        // img.src = `../twitchemotes/${newValue.message}.jpg`;
        // fade(img)
        // cup.appendChild(img);
    }
    else{
        let mainbox = document.getElementById("mainbox");
        let textbox = document.createElement("div");
        textbox.className = "circletext";
        textbox.innerHTML = newValue.message;
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


})