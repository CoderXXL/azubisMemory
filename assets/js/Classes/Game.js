class Game {
    #activePlayer = new Player("playerNone");
    #player = new Array(2);

    #numberCouples;

    #cards = new Array(0);
    #cardOne;
    #cardTwo;

    /* 
        Status 0: Spielbeginn
        Status 1: Spieler wählt Karte 1
        Status 2: Spieler wählt Karte 2
        Status 3: Kartenvergleich + Spielerwechsel
        Status 4: Spielende
    */

    #status = 0;

    constructor(playerOne, playerTwo, numberCouples) {
        this.#player[0] = playerOne;
        this.#player[1] = playerTwo;
        this.#numberCouples = numberCouples;
    }

    getNumberCouples() {
        return this.#numberCouples;
    }

    getStatus() {
        return this.#status;
    }

    setStatus(status) {
        this.#status = status;
    }

    getCardOne() {
        return this.#cardOne;
    }

    setCardOne(card) {
        this.#cardOne = card;
    }

    getCardTwo() {
        return this.#cardTwo;
    }

    setCardTwo(card) {
        this.#cardTwo = card;
    }

    getCard(id) {
        for(let i = 0; i < this.#cards.length; i++) {
            if(this.#cards[i].getID() == id) return this.#cards[i];
        }
        return null;
    }

    saveCard(card, id) {
        this.#cards[this.#cards.length] = new Card(card, id);
    }

    getActivePlayer(){
        return this.#activePlayer;
    }

    getPlayerOne(){
        return this.#player[0];
    }

    getPlayerTwo(){
        return this.#player[1];
    }

    changePlayer() {
        if (this.#activePlayer == this.#player[0]) {
            this.#activePlayer = this.#player[1]
        } else {
            this.#activePlayer = this.#player[0]
        }

        document.getElementById("activePlayer").innerHTML = "Akiver Spieler: " + game.getActivePlayer().getName();
    }
}