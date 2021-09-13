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

    }

    playerCardsInit = () => {

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

        this.tableCardsInit();
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

                <PokerCard cardName={e} key={e} />

            );

        })

        const thePlayerCards = this.state.playerHand.map((e,i) => {

            return(

                <PokerCard cardName={"backofcard"} key={e} />

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
                        <Col><h3 style={{textAlign: "center"}}>Losses : 0</h3></Col>
                    </Row>
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
                        <Col>
                            <Button variant="primary" onClick={this.startGame}>Start Game</Button>
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