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
//====================================================================================
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
//====================================================================================
function roll() {
    //Variables
    var wager = document.querySelector(".inputRoulette.wager").value;
    var buttons = document.getElementsByClassName("rouletteButton");
    var randRoll = Math.floor(Math.random() * 37); //37
    var coolDown = true;
    var win;
    var profit = 0;
    //NO SELECTION
    if (choiceRoulette == null) {
        alert("Select a square please")
        return;
    }
    if (wager == "") {
        alert("Place a wager please")
        return
    }
    //Alternate colours
    var alternateColour = setInterval(function () {
        //Alternate White and Gold
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
        }
        //Alternate Green and Gold
        else {
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
        //Cooldown
        coolDown = false;
    }, 150);
    //Cooldown
    if (coolDown == true) {
        document.getElementById("rollButton").onclick = null;
        //document.getElementById("rollButton").
    }
    //------------------RESULTS-----------------------
    // User picked between 0, 00, 1 and 36
    if (randRoll == choiceRoulette && choiceRoulette <= 37) { //WIN
        win = true;
        profit = wager * 35;
    }
    else if (randRoll != choiceRoulette && choiceRoulette <= 37) { //LOSE
        win = false;
    }
    // User picked 2 to 1 top row
    else if (choiceRoulette == 38 && randRoll % 3 == 0 && randRoll != 0) { //WIN
        win = true;
        profit = wager * 3;
    }
    else if (choiceRoulette == 38 && randRoll % 3 != 0 || randRoll == 0) { //LOSE
        win = false;
    }
    // User picked 2 to 1 middle row
    else if (choiceRoulette == 39 && randRoll % 3 == 2) { //WIN
        win = true;
        profit = wager * 3;
    }
    else if (choiceRoulette == 39 && randRoll % 3 != 2) { //LOSE
        win = false;
    }
    // User picked 2 to 1 bottom row
    else if (choiceRoulette == 40 && randRoll % 3 == 1) { //WIN
        win = true;
        profit = wager * 3;
    }
    else if (choiceRoulette == 40 && randRoll % 3 != 1) { //LOSE
        win = false;
    }
    // User picked 1st 12
    else if (choiceRoulette == 41 && randRoll <= 12 && randRoll >= 1) { //WIN
        win = true;
        profit = wager * 3;
    }
    else if (choiceRoulette == 41 && randRoll > 12 || randRoll == 0) { //LOSE
        win = false;
    }
    // User picked 2nd 12
    else if (choiceRoulette == 42 && randRoll <= 24 && randRoll >= 13) { //WIN
        win = true;
        profit = wager * 3;
    }
    else if (choiceRoulette == 42 && randRoll > 24 || randRoll < 13) { //LOSE
        win = false;
    }
    // User picked 3rd 12
    else if (choiceRoulette == 43 && randRoll <= 36 && randRoll >= 25) { //WIN
        win = true;
        profit = wager * 3;
    }
    else if (choiceRoulette == 43 && randRoll < 25 || randRoll == 37) { //LOSE
        win = false;
    }
    //User picked 1-18
    else if (choiceRoulette == 44 && randRoll <= 18 && randRoll >= 1) { //WIN
        win = true;
        profit = wager * 2;
    }
    else if (choiceRoulette == 44 && randRoll > 19 || randRoll == 0) { //LOSE
        win = false;;
    }
    //User picked 19-36
    else if (choiceRoulette == 49 && randRoll >= 19 && randRoll <= 36) { //WIN
        win = true;
        profit = wager * 2;
    }
    else if (choiceRoulette == 49 && randRoll < 19 || randRoll == 37) { //LOSE
        win = false;
    }
    //User picked EVEN
    else if (choiceRoulette == 45 && randRoll % 2 == 0 && randRoll != 0) { //WIN
        win = true;
        profit = wager * 2;
    }
    else if (choiceRoulette == 45 && randRoll % 2 != 0 || randRoll == 0) { //LOSE
        win = false;
    }
    //User picked ODD
    else if (choiceRoulette == 48 && randRoll % 2 == 1 && randRoll != 37) { //WIN
        win = true;
        profit = wager * 2;
    }
    else if (choiceRoulette == 48 && randRoll % 2 == 1 || randRoll == 37) { //LOSE
        win = false;
    }
    //User picked RED
    else if (choiceRoulette == 46 && randRoll == 1 || randRoll == 3 || randRoll == 5 || randRoll == 7 || randRoll == 9 || randRoll == 12 || randRoll == 14 || randRoll == 16 || randRoll == 18 || randRoll == 19 || randRoll == 21 || randRoll == 23 || randRoll == 25 || randRoll == 27 || randRoll == 30 || randRoll == 32 || randRoll == 34 || randRoll == 36) { //WIN
        win = true;
        profit = wager * 2;
    }
    else if (choiceRoulette == 46 && randRoll != 1 && randRoll != 3 && randRoll != 5 && randRoll != 7 && randRoll != 9 && randRoll != 12 && randRoll != 14 && randRoll != 16 && randRoll != 18 && randRoll != 19 && randRoll != 21 && randRoll != 23 && randRoll != 25 && randRoll != 27 && randRoll != 30 && randRoll != 32 && randRoll != 34 && randRoll != 36) { //LOSE
        win = false;
    }
    //User picked BLACK
    else if (choiceRoulette == 47 && randRoll == 2 || randRoll == 4 || randRoll == 6 || randRoll == 8 || randRoll == 10 || randRoll == 11 || randRoll == 13 || randRoll == 15 || randRoll == 17 || randRoll == 20 || randRoll == 22 || randRoll == 24 || randRoll == 26 || randRoll == 28 || randRoll == 29 || randRoll == 31 || randRoll == 33 || randRoll == 35) { //WIN
        win = true;
        profit = wager * 2;
    }
    else if (choiceRoulette == 47 && randRoll != 2 && randRoll != 4 && randRoll != 6 && randRoll != 8 && randRoll != 10 && randRoll != 11 && randRoll != 13 && randRoll != 15 && randRoll != 17 && randRoll != 20 && randRoll != 22 && randRoll != 24 && randRoll != 26 && randRoll != 28 && randRoll != 29 && randRoll != 31 && randRoll != 33 && randRoll != 35) { //LOSE
        win = false;
    }
    //PROFIT
    if (win == true) {
        document.querySelector(".inputRoulette.profit").value = "+" + Math.floor(profit);
        document.querySelector(".inputRoulette.profit").style.color = "rgba(0, 255, 0)";
    } else if (win == false) {
        document.querySelector(".inputRoulette.profit").value = "-" + wager;
        document.querySelector(".inputRoulette.profit").style.color = "red";
    }
    //Stop flashing colour after 4 seconds
    setTimeout(function () {
        clearInterval(alternateColour);
        document.getElementById("rollButton").onclick = roll;
        document.querySelector(".inputRoulette.wager").value = "";
    }, 4000);
}