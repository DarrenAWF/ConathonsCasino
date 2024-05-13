//Global Variables
var prevBubble;
var prevSpeech;
var choiceRoulette
var rouletteArr = [37, 24, 12, 0, 25, 13, 1, 26, 14, 2, 27, 15, 3, 28, 16, 4, 29, 17, 5, 30, 18, 6, 31, 19, 7, 32, 20, 8, 33, 21, 9, 34, 22, 10, 35, 23, 11, 36, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
function talk() {
    //Variables
    var conathon = document.querySelector(".conathon");
    var textBubble = document.querySelector(".textBubble");
    var speech = document.querySelector(".speech");
    var speechArr = [["Quiting is losing.", "Why the long face?", "Win any yet?", "Having a good day?"],
    ["Risking it is always better than regretting it.", "Here's a little pocket change my friend.", "It's a slow process quitting won't speed it up.", "Most people quit before they win...", "I heard the shop has some new goods!", "The roulette table is due for a win!", "Giving up won't help you win."],
    ["I built this casino to help people like you. I have seen many people win and many give up.", "I doubled my son's college savings at the roulette table and now he can go to college twice!!!", "Here's some extra cash from the last person who won here!"]];
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
    }, 1000 * (randBubble + 1));
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
            randSpeechMax = 7;
            break;
        case 2: textBubble.src = "images/textBubbleLarge.png";
            randSpeechMax = 3;
            break;
    }
    randSpeech = Math.floor(Math.random() * randSpeechMax);
    //Change the bubble size to be different than previous
    while (randBubble == prevBubble && randSpeech == prevSpeech) {
        randSpeech = Math.floor(Math.random() * randSpeechMax);
    }
    //Set random text content
    speech.textContent = speechArr[randBubble][randSpeech];
    //Set previous variable of speech bubble
    prevBubble = randBubble;
    prevSpeech = randSpeech;
}
function roulette(choice) {
    choiceRoulette = choice;
    //variables
    var buttons = document.getElementsByClassName("rouletteButton");
    //change clicked button to gold
    buttons[rouletteArr[choice]].style.backgroundColor = "rgba(0, 255, 0, 0.7)";
    //reset previous clicked buttons
    for (loop = 0; loop < buttons.length; loop++) {
        if (loop != choice) {
            buttons[rouletteArr[loop]].style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        }
    }
}

function roll() {
    //Variables
    var buttons = document.getElementsByClassName("rouletteButton");
    var randRoll = Math.floor(Math.random() * 37); // Corrected to generate random number between 0 and 36
    if (choiceRoulette == null) { //NO SELECTION
        return;
    }
    //Alternate between transparent white or gold and purple
    var alternateColour = setInterval(function () {
        if (randRoll != choiceRoulette) {
            if (buttons[rouletteArr[randRoll]].style.backgroundColor == "rgba(255, 255, 255, 0.2)") {
                if (choiceRoulette == randRoll) {
                    buttons[rouletteArr[randRoll]].style.backgroundColor = "rgba(255, 215, 0, 1)";
                } else {
                    buttons[rouletteArr[randRoll]].style.backgroundColor = "rgba(255, 255, 255, 1)";
                }
            } else {
                buttons[rouletteArr[randRoll]].style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            }
        } else {
            if (buttons[rouletteArr[randRoll]].style.backgroundColor == "rgba(0, 255, 0, 0.7)") {
                if (choiceRoulette == randRoll) {
                    buttons[rouletteArr[randRoll]].style.backgroundColor = "rgba(255, 215, 0, 1)";
                } else {
                    buttons[rouletteArr[randRoll]].style.backgroundColor = "rgba(255, 255, 255, 1)";
                }
            } else {
                buttons[rouletteArr[randRoll]].style.backgroundColor = "rgba(0, 255, 0, 0.7)";
            }
        }
    }, 150);
    //Stop flashing colour after 4 seconds
    setTimeout(function () {
        clearInterval(alternateColour);
        // User picked between 0, 00, 1 and 36
        if (randRoll == choiceRoulette && choiceRoulette < 37) {
            //WIN
        } else {
            //LOSE
        }
    }, 4000);
}