import React from 'react';
import ReactDOM, { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';



class Dealer extends React.Component{




}


class MainPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {

            cards: ['ah','kh','qh','jh','10h','9h','8h','7h','6h','5h','4h','3h','2h','ad','kd','qd','jd','10d','9d','8d','7d','6d','5d','4d','3d','2d',
            'as','ks','qs','js','10s','9s','8s','7s','6s','5s','4s','3s','2s','ac','kc','qc','jc','10c','9c','8c','7c','6c','5c','4c','3c','2c'
            ],

            playerHand: [], 
            computerHand: [],
            tableCards: [],
            playerTurn: true,

        }

    }

    determineTurn = () => {

        Math.floor(Math.random() * (2) + 0) === 1? this.state.playerTurn = true: this.state.playerTurn = false;

    }

    /* from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array [first answer] */
    shuffle = (arr) => {

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





}


ReactDOM.render(

    <React.StrictMode>

        <MainPage />

    </React.StrictMode>,document.getElementById('root')

);