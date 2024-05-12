//Global Variables
var prevBubble;
var prevSpeech;

function talk() {
    //Variables
    var conathon = document.querySelector(".conathon");
    var textBubble = document.querySelector(".textBubble");
    var speech = document.querySelector(".speech");
    var speechArr = [["Quiting is losing.", "Why the long face?", "Win any yet?", "Having a good day?"],
    ["Risking it is always better than regretting it.", "Here's a little pocket change my friend.", "It's a slow process quitting won't speed it up.", "Most people quit before they win...",  "I heard the shop has some new goods!", "The roulette table is due for a win!"],
    ["I built this casino to help people like you. I have seen many people win and many give up.", "I doubled my son's college savings at the roulette table and now he can go to college twice!!!"]];
    var randBubble = Math.floor(Math.random() * 3);
    var randSpeech;
    var randSpeechMax;
    var coolDown = true;
    //Alternate talking and not talking
    var alternateMouth = setInterval(function () {
        conathon.src = conathon.src.includes("conathon.png") ? "images/conathonTalking.png" : "images/conathon.png";
    }, 100);
    //Stop talking after 1,2,3 seconds and reset cooldown
    setTimeout(function () {
        clearInterval(alternateMouth);
        conathon.src = "images/conathon.png";
        coolDown = false;
        conathon.addEventListener("mouseover", function () {
            this.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
            this.style.cursor = "pointer";
        });
        conathon.addEventListener("mouseout", function () {
            this.style.backgroundColor = "transparent";
            this.style.cursor = "default";
        });
        document.getElementById("talkID").onclick = talk;
    }, 1000*(randBubble+1));
    //Cooldown
    if (coolDown == true) {
        conathon.addEventListener("mouseover", function () {
            this.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
            this.style.cursor = "default";
        });
        document.getElementById("talkID").onclick = null;
    }
    //Random size of bubble
    switch (randBubble) {
        case 0: textBubble.src = "images/textBubbleSmall.png";
        randSpeechMax = 4;
            break;
        case 1: textBubble.src = "images/textBubbleMedium.png";
        randSpeechMax = 6;
            break;
        case 2: textBubble.src = "images/textBubbleLarge.png";
        randSpeechMax = 2;
            break;
    }
    randSpeech = Math.floor(Math.random() * randSpeechMax);
    //Change the bubble size to be different than previous
    while (randBubble == prevBubble && randSpeech == prevSpeech){
        randSpeech = Math.floor(Math.random() * randSpeechMax);
    }
    //Set random text content
    speech.textContent = speechArr[randBubble][randSpeech];
    //Set previous variable of speech bubble
    prevBubble = randBubble;
    prevSpeech = randSpeech;
}