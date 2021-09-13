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

            <Image src={'./cards/' + this.props.cardName + '.PNG'} rounded />

        );

    }

}

class Dealer extends React.Component{




}


class MainPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {

            cards: ['acehearts','kinghearts','queenhearts','jackhearts','tenhearts','ninehearts','eighthearts','sevenhearts','sixhearts','fivehearts','fourhearts','threehearts',
            'twohearts','acediamonds','kingdiamonds','queendiamonds','jackdiamonds','tendiamonds','ninediamonds','eightdiamonds','sevendiamonds','sixdiamonds','fivediamonds',
            'fourdiamonds','threediamonds','twodiamonds','acespads','kingspades','queenspades','jackspades','tenspades','ninespades','eightspades','sevenspades',
            'sixspades','fivespades','fourspades','threespades','twospades','aceclubs','kingclubs','queenclubs','jackclubs','tenclubs','nineclubs','eightclubs',
            'sevenclubs','sixclubs','fiveclubs','fourclubs','threeclubs','twoclubs'
            ],

            playerHand: [], 
            computerHand: [],
            tableCards: [],
            playerTurn: true,
            chips: 0,

        }

    }

    determineTurn = () => {

        Math.floor(Math.random() * (2) + 0) === 1? this.state.playerTurn = true: this.state.playerTurn = false;

    }

    /* from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array [first answer] */
    shuffle = (array) => {

        var currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }


    render(){

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