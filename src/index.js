import React from 'react';
import ReactDOM, { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'

class PokerCard extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(

            <Image src={'./cards/' + this.props.cardName + '.PNG'} style={{height: "100px", width: "100px"}} rounded />

        );

    }

}

/*

How do I initialize a state Variable? Such as if I wanted to default have 3 cards on the table when a game starts

*/


class MainPage extends React.Component{


    /*

        POKER METHODS

    */

        royalFlush = (cards) => {

            let suits = ['hearts','clubs','spades','diamonds'];
            let ranks = ['ace','king','queen','jack','ten'];
        
            let foundMatch = false;
            for(let i = 0; i < suits.length; i++){
                foundMatch = true;
                for(let j = 0; j < ranks.length; j++){
        
                    if(cards.includes(`${ranks[j]}${suits[i]}`)){
                        continue;
                    }
                    else{
                        foundMatch = false;
                        break;
                    }
        
                }
                if(foundMatch){
                    return true;
                }
            }
            return false;
        
        }
        
        sameSuit = (cards) => {
        
            let suits = ['hearts','clubs','spades','diamonds'];
        
            let theSuits = {'hearts': 0, 'clubs': 0, 'spades': 0, 'diamonds': 0};
        
            for(let i = 0; i < cards.length; i++){
        
                for(let j of suits){
                    if(cards[i].includes(j)){
                        theSuits[j] += 1;
                    }
                }
        
            }
            return Object.keys(theSuits).map(e => theSuits[e]).some(e => e >= 5);
        
        }
        
        consecutive = (cards) => {
        
            let ranks = {'ace': 14, 'king': 13, 'queen': 12, 'jack': 11, 'ten': 10, 'nine': 9, 'eight': 8, 'seven': 7, 'six': 6, 'five': 5, 'four': 4, 'three': 3, 'two': 2};
        
            let theNumRanks = [];
            for(let i = 0; i < cards.length; i++){
                let theCard = cards[i];
                for(let j of Object.keys(ranks)){
                    if(theCard.includes(j)){
                        theNumRanks.push(ranks[j]);
                    }
                }
            }
        
            theNumRanks.sort((a,b) => a-b);
            for(let i = 0; i < theNumRanks.length-1; i++){
        
                let iRank = theNumRanks[i];
                let jRank = theNumRanks[i+1];
                if(Math.abs(iRank - jRank) !== 1){
                    return false;
                }
        
            }
            return true;
        
        }
        
        getCardRank = (card) => {
        
            let ranks = {'ace': 14, 'king': 13, 'queen': 12, 'jack': 11, 'ten': 10, 'nine': 9, 'eight': 8, 'seven': 7, 'six': 6, 'five': 5, 'four': 4, 'three': 3, 'two': 2};
        
            for(let i of Object.keys(ranks)){
                if(card.includes(i)){
                    return ranks[i];
                }
            }
        
        }
        
        straightFlush = (cards) => {
        
            if(!this.sameSuit(cards)){
                return false;
            }
            if(!this.consecutive(cards)){
                return false;
            }
            cards.sort((a,b) => this.getCardRank(a) - this.getCardRank(b));
        
        
        
        }


    /*

        POKER METHODS

    */

    /* from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array [first answer] */
    shuffle = (array) => {

        for(let i = 0; i < 10; i++){
            var currentIndex = array.length,  randomIndex;

            // While there remain elements to shuffle...
            while (currentIndex !== 0) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
        }
        return array;
    }

    constructor(props){
        super(props);

        this.state = {

            cards: this.shuffle(['acehearts','kinghearts','queenhearts','jackhearts','tenhearts','ninehearts','eighthearts','sevenhearts','sixhearts','fivehearts','fourhearts','threehearts',
            'twohearts','acediamonds','kingdiamonds','queendiamonds','jackdiamonds','tendiamonds','ninediamonds','eightdiamonds','sevendiamonds','sixdiamonds','fivediamonds',
            'fourdiamonds','threediamonds','twodiamonds','acespades','kingspades','queenspades','jackspades','tenspades','ninespades','eightspades','sevenspades',
            'sixspades','fivespades','fourspades','threespades','twospades','aceclubs','kingclubs','queenclubs','jackclubs','tenclubs','nineclubs','eightclubs',
            'sevenclubs','sixclubs','fiveclubs','fourclubs','threeclubs','twoclubs'
            ]),

            playerHand: [], 
            computerHand: [],
            tableCards: [],
            playerTurn: true,
            chips: 0,
            gameStarted: false,

        }
    }

    determineTurn = () => {

        Math.floor(Math.random() * (2) + 0) === 1? this.setState({playerTurn: true}): this.setState({playerTurn: false});

    }

    tableCardsInit = () => {

        if(this.state.tableCards.length === 5){
            // max amt of cards
            return;
        }
        let amt = (this.state.playerHand.length > 0? 1: 3);

        if(this.state.cards.length === 0){
            return;
        }
        let theCards = this.state.tableCards;
        let count = 0;
        while(count < amt && this.state.cards.length > 0){
            const aStr = this.state.cards.pop();
            theCards.push(aStr);
            count++;
        }
        this.setState({tableCards: theCards});
        console.log(this.state);
        console.log(`theCards = ${theCards}`);
        return;

    }

    playerCardsInit = () => {

        if(this.state.playerHand.length === 2){
            // max amt of player cards
            return;
        }
        if(this.state.cards.length === 0){
            return;
        }
        let theCards = this.state.playerHand;
        for(let i = 0; i < 2; i++){
            const aStr = this.state.cards.pop();
            theCards.push(aStr);
        }
        this.setState({playerHand: theCards});
        console.log(this.state);

    }

    computerCardsInit = () => {
        
        if(this.state.computerHand.length === 2){
            return;
        }
        if(this.state.cards.length === 0){
            return;
        }
        let theCards = this.state.computerHand;
        for(let i = 0; i < 2; i++){
            const aStr = this.state.cards.pop();
            theCards.push(aStr);
        }
        this.setState({computerHand: theCards});
        console.log(this.state);

    }

    startGame = () => {

        let tableRes = this.tableCardsInit();
        this.playerCardsInit();
        this.computerCardsInit();

    }


    render(){

        
        const theTableCards = this.state.tableCards.map((e,i) => {

            return(

                <PokerCard cardName={e} key={e} />

            );

        })

        const theComputerCards = this.state.computerHand.map((e,i) => {

            return(

                <PokerCard cardName={"backofcard"} key={e} />

            );

        })

        const thePlayerCards = this.state.playerHand.map((e,i) => {

            return(

                <PokerCard cardName={e} key={e} />

            );

        })
        

        return(
            <>
                <Container fluid>
                    <Row>
                        <Col><h1 style={{textAlign: "center"}}>Poker Game</h1></Col>
                    </Row>
                    <Row>
                        <Col><h3 style={{textAlign: "center"}}>Wins : 0</h3></Col>
                        <Col><h3 style={{textAlign: "center"}}>Chips : {this.state.chips}</h3></Col>
                        <Col><h3 style={{textAlign: "center"}}>Losses : 0</h3></Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col>

                            <h4 style={{textAlign: "center"}}>Table Cards</h4>

                        </Col>
                    </Row>
                    <Row>

                        <Col style={{border: "2px dashed black"}}>{theTableCards}</Col>

                    </Row>
                    <br />
                    <Row>

                        <Col>
                        
                        <h4 style={{textAlign: "center"}}>Computer Cards</h4>
                        
                        </Col>

                    </Row>
                    <Row>

                        <Col style={{border: "2px dashed black"}}>{theComputerCards}</Col>

                    </Row>
                    <Row>
                        <Col style={{textAlign: "center"}}><h4>Player Cards</h4></Col>
                    </Row>
                    <Row>
                        <Col style={{border: "2px dashed black"}}>{thePlayerCards}</Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" style={{margin: "auto", display: "block", textAlign: "center"}}>Fold</Button>
                        </Col>
                        <Col>
                            <Button variant="primary" style={{margin: "auto", display: "block", textAlign: "center"}}>Raise</Button>
                        </Col>
                        <Col>
                            <Button variant="primary" style={{margin: "auto", display: "block", textAlign: "center"}}>Call</Button>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>

                        <Col>
                            <Button variant="primary" onClick={this.startGame} style={{margin: "auto", display: "block", textAlign: "center"}}>Start Game</Button>
                        </Col>

                    </Row>
                </Container>
            </>
        );

    }


}


ReactDOM.render(

    <React.StrictMode>

        <MainPage />

    </React.StrictMode>,document.getElementById('root')

);