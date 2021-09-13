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

class Dealer extends React.Component{




}


class MainPage extends React.Component{

    /* from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array [first answer] */
    shuffle = (array) => {

        for(let i = 0; i < 10; i++){
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

        }

    }

    determineTurn = () => {

        Math.floor(Math.random() * (2) + 0) === 1? this.setState({playerTurn: true}): this.setState({playerTurn: false});

    }

    tableCardsInit = () => {

        if(this.state.cards.length === 0){
            return;
        }
        let theCards = this.state.tableCards;
        let count = 0;
        while(count < 3 && this.state.cards.length > 0){
            const aStr = this.state.cards.pop();
            theCards.push(aStr);
            count++;
        }
        this.setState({tableCards: theCards});
        console.log(this.state);
        console.log(`theCards = ${theCards}`);

    }


    render(){

        const theTableCards = this.state.tableCards.map((e,i) => {

            return(

                <PokerCard cardName={e} key={i} />

            );

        })

        console.log(`thetablecards = ${theTableCards}`);

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
                    <Row>
                        <Col>

                            <Button variant="primary" onClick={this.tableCardsInit}>Draw Card</Button>

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