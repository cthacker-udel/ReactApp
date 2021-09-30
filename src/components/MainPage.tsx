import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {PokerCard} from './PokerCard';
import {shuffle} from '../utilities/PokerMethods';


export function MainPage(): JSX.Element{

    const [deck,setDeck] = useState<string[]>(shuffle(['acehearts','kinghearts','queenhearts','jackhearts','tenhearts','ninehearts','eighthearts','sevenhearts','sixhearts','fivehearts','fourhearts','threehearts',
                                'twohearts','acediamonds','kingdiamonds','queendiamonds','jackdiamonds','tendiamonds','ninediamonds','eightdiamonds','sevendiamonds','sixdiamonds','fivediamonds',
                                'fourdiamonds','threediamonds','twodiamonds','acespades','kingspades','queenspades','jackspades','tenspades','ninespades','eightspades','sevenspades',
                                'sixspades','fivespades','fourspades','threespades','twospades','aceclubs','kingclubs','queenclubs','jackclubs','tenclubs','nineclubs','eightclubs',
                                'sevenclubs','sixclubs','fiveclubs','fourclubs','threeclubs','twoclubs'
                                ]));

    const [playerHand,setPlayerHand] = useState<string[]>([]);
    const [computerHand,setComputerHand] = useState<string[]>([]);
    const [tableCards,setTableCards] = useState<string[]>([]);
    const [playerTurn,setPlayerTurn] = useState<boolean>(true);
    const [chips,setChips] = useState<number>(0);

    // do I need these state values or can I just map playerHand to JSX when I call dealCards
    const [thePlayerCards,setThePlayerCards] = useState<JSX.Element[]>([]);
    const [theTableCards,setTheTableCards] = useState<JSX.Element[]>([]);
    const [theComputerCards,setTheComputerCards] = useState<JSX.Element[]>([]);

    const [mainButtonText,setMainButtonText] = useState("Start Game");


    useEffect(() => {

        setMainButtonText("Deal Table Cards");

    },[playerHand,computerHand,tableCards])


    const drawCards = (deck: string[], setDeck: React.Dispatch<React.SetStateAction<string[]>>, hand: string[], setHand: React.Dispatch<React.SetStateAction<string[]>>, amount: number) => {

        let cardsDrawn: string[] = [];

        for(let i = 0; i < amount; i++){

            let theCard: string | undefined = deck.pop();
            if(theCard !== undefined){
                cardsDrawn.push(theCard);
            }

        }
        setDeck([...deck]);

        hand = hand.concat([...cardsDrawn]);
        
        setHand([...hand]);
    }

    const startGame = (): void => {

        drawCards(deck,setDeck,playerHand,setPlayerHand,2);
        drawCards(deck,setDeck,tableCards,setTableCards,3);
        drawCards(deck,setDeck,computerHand,setComputerHand,2);
    
    }

    return(
        
        <>
                <Container fluid>
                    <Row>
                        <Col><h1 style={{textAlign: "center"}}>Poker Game</h1></Col>
                    </Row>
                    <Row>
                        <Col><h3 style={{textAlign: "center"}}>Wins : 0</h3></Col>
                        <Col><h3 style={{textAlign: "center"}}>Chips : {chips}</h3></Col>
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
                            <Button variant="primary" onClick={startGame} style={{margin: "auto", display: "block", textAlign: "center"}} id="mainButton">{mainButtonText}</Button>
                        </Col>

                    </Row>
                </Container>
            </>


    );


}