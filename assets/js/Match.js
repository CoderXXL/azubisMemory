function start(cards) {
    /* create cards */

    for (let id = 0; id < (game.getNumberCouples() * 2); id++) {
            let card = cards[id];

            card.id = "card" + id;
            game.saveCard(card, id);
    }

    /* add click event */
    const matchfield = document.getElementById("matchfield");

    matchfield.addEventListener("click", function (event) {
        addClickEvent(event.target);
    });

    /* random card colors */
    cardColors();

    /* start game time */
    game.startTimer();

    /* game info */
    game.changePlayer();
    document.getElementById("pointsPlayerOne").innerHTML = msg.playerPoints(game.getPlayerOne())
    document.getElementById("pointsPlayerTwo").innerHTML = msg.playerPoints(game.getPlayerTwo())

    /* start game */
    game.setStatus(1);
}

/* 

additonal start funktions 

*/

function addClickEvent(card) {
    if (!card.classList.contains("card")) return;

    id = card.id.substring(4, card.id.length);

    gameCard = game.getCard(id);

    if (game.getStatus() == 1) {
        moveOne(gameCard);
    } else if (game.getStatus() == 2) {
        moveTwo(gameCard);
    }
}

function cardColors() {
    let max = 30;
    let count = 0;

    let cardOne;
    let cardTwo;

    let colors = new Array2D(30, 1);

    colors.items[0][0] = "#00FFFF"; //cyan
    colors.items[0][1] = false;

    colors.items[1][0] = "#00BFFF"; //DeepSkyBlue
    colors.items[1][1] = false;

    colors.items[2][0] = "#7FFFD4"; //Aquamarine
    colors.items[2][1] = false;

    colors.items[3][0] = "#0000FF"; //Blue
    colors.items[3][1] = false;
    
    colors.items[4][0] = "#006400"; //DarkGreen
    colors.items[4][1] = false;

    colors.items[5][0] = "#8FBC8F"; //DarkSeaGreen
    colors.items[5][1] = false;

    colors.items[6][0] = "#90EE90"; //LightGreen
    colors.items[6][1] = false;

    colors.items[7][0] = "#00FF00"; //Lime
    colors.items[7][1] = false;

    colors.items[8][0] = "#FF8C00"; //DarkOrange
    colors.items[8][1] = false;

    colors.items[9][0] = "#8A2BE2"; //BlueViolet
    colors.items[9][1] = false;

    colors.items[10][0] = "#8B008B"; //DarkMagenta
    colors.items[10][1] = false;

    colors.items[11][0] = "#EE82EE"; //Violet
    colors.items[11][1] = false;

    colors.items[12][0] = "#A9A9A9"; //DarkGray
    colors.items[12][1] = false;

    colors.items[13][0] = "#2F4F4F"; //DarkSlateGray
    colors.items[13][1] = false;

    colors.items[14][0] = "#696969"; //DimGray
    colors.items[14][1] = false;

    colors.items[15][0] = "#778899"; //LightSlateGray
    colors.items[15][1] = false;

    colors.items[16][0] = "#FF4500"; //OrangeRed
    colors.items[16][1] = false;

    colors.items[17][0] = "#FF0000"; //Red
    colors.items[17][1] = false;

    colors.items[18][0] = "#CD5C5C"; //IndianRed
    colors.items[18][1] = false;

    colors.items[19][0] = "#DC143C"; //Crimson
    colors.items[19][1] = false;

    colors.items[20][0] = "#A52A2A"; //Brown
    colors.items[20][1] = false;

    colors.items[21][0] = "#8B4513"; //SaddleBrown
    colors.items[21][1] = false;

    colors.items[22][0] = "#F4A460"; //SandyBrown
    colors.items[22][1] = false;

    colors.items[23][0] = "#FFFF00"; //Yellow
    colors.items[23][1] = false;

    colors.items[24][0] = "#FFFFE0"; //LightYellow
    colors.items[24][1] = false;

    colors.items[25][0] = "#B8860B"; //DarkGoldenRod
    colors.items[25][1] = false;

    colors.items[26][0] = "#FF1493"; //DeepPink
    colors.items[26][1] = false;

    colors.items[27][0] = "#FFD700"; //Gold
    colors.items[27][1] = false;

    colors.items[28][0] = "#FF69B4"; //HotPink
    colors.items[28][1] = false;

    colors.items[29][0] = "#4682B4"; //SteelBlue
    colors.items[29][1] = false;

    while (count < game.getNumberCouples()) {
        let idOne = Math.floor(Math.random() * (game.getNumberCouples() * 2));
        let idTwo = Math.floor(Math.random() * (game.getNumberCouples() * 2));

        cardOne = game.getCard(idOne);
        cardTwo = game.getCard(idTwo);

        if (idOne != idTwo) {
            if (cardOne.getColor() == "black" && cardTwo.getColor() == "black") {
                generateColor();
                count++;
            }
        }
    }

    function generateColor() {
        let randomColor = Math.floor(Math.random() * max);

        if (colors.items[randomColor][1]) {
            return generateColor();
        } else {
            colors.items[randomColor][1] = true;
            cardOne.setColor(colors.items[randomColor][0]);
            cardTwo.setColor(colors.items[randomColor][0]);
        }
    }
}

/*

card click

*/

function moveOne(card) {
    if (card.isLocked()) return;

    card.getElement().classList.replace("back", "front");

    setTimeout(function() {
        card.getElement().style.background = card.getColor();
    }, 300);

    game.setCardOne(card);
    game.setStatus(2);
}

function moveTwo(card) {
    if (card.isLocked()) return;
    if (card.getID() == game.getCardOne().getID()) return;

    card.getElement().classList.replace("back", "front");

    setTimeout(function() {
        card.getElement().style.background = card.getColor();
    }, 300);

    game.setCardTwo(card);
    game.setStatus(3);

    checkCards(game.getCardOne(), game.getCardTwo());
}

function checkCards(cardOne, cardTwo) {

    if (cardOne.getColor() == cardTwo.getColor()) {

        if (game.getActivePlayer() == game.getPlayerOne()) {
            game.getPlayerOne().addAttempt(true);
            document.getElementById("pointsPlayerOne").innerHTML = msg.playerPoints(game.getPlayerOne());
        } else {
            game.getPlayerTwo().addAttempt(true);
            document.getElementById("pointsPlayerTwo").innerHTML = msg.playerPoints(game.getPlayerTwo());
        }

        console.log(msg.playerGetPoint(game.getActivePlayer().getName()));

        game.getCard(cardOne.getID()).lock();
        game.getCard(cardTwo.getID()).lock();

        if ((game.getPlayerOne().getPoints() + game.getPlayerTwo().getPoints()) == game.getNumberCouples()) {
            stop();

        } else {
            game.setStatus(1);
        }

    } else {
        if (game.getActivePlayer() == game.getPlayerOne()) {
            game.getPlayerOne().addAttempt(false);
        } else {
            game.getPlayerTwo().addAttempt(false);
        }

        console.log(msg.wrongCouple(game.getActivePlayer().getName()));

        setTimeout(function() {
            cardOne.getElement().classList.replace("front", "back");
            cardTwo.getElement().classList.replace("front", "back");

            setTimeout(function() {
                cardOne.getElement().style.background = null;
                cardTwo.getElement().style.background = null;
            }, 300);

            game.changePlayer();
            game.setStatus(1);
        }, 2000);
    }
}

/* 

game end 

*/

function stop() {
    game.setStatus(4);

    if (game.getPlayerOne().getPoints() > game.getPlayerTwo().getPoints()) {
        /* Spieler 1 gewinnt */
        saveHighscore(game.getPlayerOne().getName(), game.getPlayerOne().getPoints(), game.getNumberCouples(), game.getTimer());
        console.log(msg.gameWin(game.getActivePlayer().getName()));

    } else if (game.getPlayerOne().getPoints() < game.getPlayerTwo().getPoints()) {
        /* Spieler 2 gewinnt */
        saveHighscore(game.getPlayerTwo().getName(), game.getPlayerTwo().getPoints(), game.getNumberCouples(), game.getTimer());
        console.log(msg.gameWin(game.getActivePlayer().getName()));

    } else {
        /* Unentschieden */
        console.log(msg.gameDraw);

    }

    game.endTimer();

    console.log(msg.gameWinInfo(game.getPlayerOne()));
    console.log(msg.gameWinInfo(game.getPlayerTwo()));
    //printHighscore();

    setTimeout(function() {
        memoryController();
    }, 2000);
}

function saveHighscore(name, score, couples, timer) {

    let time;
    if (timer[2] == 0) {
        time =  timer[1] + "m" + timer[0] + "s";
    } else {
        time =  timer[2] + "h" + timer[1] + "m" + timer[0] + "s";
    }

    let newScore = {"name":name,"score":score,"couples":couples,"time":time};
    let cookie = new Cookie("highscore");
    let highscore;
    let obj;

    if (hasCookie("highscore")) {
        let cookies = getCookies();
    
        for (let i = 0; i < cookies.items.length; i++) {
            if (cookies.items[i][0] == "highscore") {
                highscore = cookies.items[i][1];
                i = cookies.items.length;
            }
        }

    } else {
        highscore = '{"highscore":[]}';
    }

    obj = JSON.parse(highscore);
    obj.highscore.push(newScore);

    obj = sort(obj);

    if (obj.highscore.length > 4) {
        obj.highscore.pop();
    }

    /* set cookie */
    cookie.setValue(JSON.stringify(obj));
    cookie.setMaxAge("31536000");

    /* sort highscore array */
    function sort(obj) {
        let save;
        let hOne, hTwo;
        let mOne, mTwo;
        let sOne, sTwo;

        for (let i = 0; i < obj.highscore.length - 1; i++) {

            if (obj.highscore[i].couples < obj.highscore[i+1].couples) {
                save = obj.highscore[i];
                obj.highscore[i] = obj.highscore[i+1];
                obj.highscore[i+1] = save;
                i = -1;

            } else if (obj.highscore[i].couples == obj.highscore[i+1].couples) {

                if (obj.highscore[i].score < obj.highscore[i+1].score) {
                    
                    i = -1;

                } else if (obj.highscore[i].score == obj.highscore[i+1].score) {
                    hOne = obj.highscore[i].time.substring(0, obj.highscore[i].time.indexOf("h"));
                    hTwo = obj.highscore[i + 1].time.substring(0, obj.highscore[i + 1].time.indexOf("h"));

                    console.log("hOne: " + hOne + " | hTwo: " + hTwo)
                    if (hOne > hTwo) {
                        save = obj.highscore[i];
                        obj.highscore[i] = obj.highscore[i+1];
                        obj.highscore[i+1] = save;

                    } else if (hOne == hTwo) {
                        mOne = obj.highscore[i].time.substring(obj.highscore[i].time.indexOf("h") + 1, obj.highscore[i].time.indexOf("m"));
                        mTwo = obj.highscore[i + 1].time.substring(obj.highscore[i].time.indexOf("h") + 1, obj.highscore[i + 1].time.indexOf("m"));

                        console.log("mOne: " + mOne + " | mTwo: " + mTwo)
                        if (mOne > mTwo) {
                            save = obj.highscore[i];
                            obj.highscore[i] = obj.highscore[i+1];
                            obj.highscore[i+1] = save;
    
                        } else if (mOne == mTwo) {
                            sOne = obj.highscore[i].time.substring(obj.highscore[i].time.indexOf("m") + 1, obj.highscore[i].time.indexOf("s"));
                            sTwo = obj.highscore[i + 1].time.substring(obj.highscore[i].time.indexOf("m") + 1, obj.highscore[i + 1].time.indexOf("s"));

                            console.log("sOne: " + sOne + " | sTwo: " + sTwo)
                            if (sOne > sTwo) {
                                save = obj.highscore[i];
                                obj.highscore[i] = obj.highscore[i+1];
                                obj.highscore[i+1] = save;
    
                            }
                        }
                    }
                }
            }
        }
        return obj;
    }
}

function printHighscore() {
    let cookie = new Cookie("highscore");
    let highscore;
    let obj;

    if (hasCookie("highscore")) {
        let cookies = getCookies();
    
        for (let i = 0; i < cookies.items.length; i++) {
            if (cookies.items[i][0] == "highscore") {
                highscore = cookies.items[i][1];
                i = cookies.items.length;
            }
        }

        print();
    
    } else {
        highscore = "Es gibt noch keinen Highscore!";
    }

    function print() {
        obj = JSON.parse(highscore);
    
        highscore = "Highscore\n======================\n\n";

        for (let i = 0; i < obj.highscore.length; i++) {
            highscore += "Platz "+ (i + 1) + ":\n\n" +
                         "Name: " + obj.highscore[i].name + "\n" +
                         "Anzahl Kartenpaare: " + obj.highscore[i].couples + "\n" + 
                         "Punkte: " + obj.highscore[i].score + "\n" +
                         "Zeit: " + obj.highscore[i].time + "\n\n\n";

        }
    }

    highscore = highscore.replaceAll("\n", "<br>");

    let htmlElement = document.getElementById("highscore");
    htmlElement.innerHTML = highscore;
}