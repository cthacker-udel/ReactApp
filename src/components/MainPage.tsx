import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge, Button, Container, Row, Col} from 'react-bootstrap';
import {PokerCard} from './PokerCard';
import {ControlPanel} from './ControlPanel';
import {shuffle,cardCombos} from '../utilities/PokerMethods';


export function MainPage(): JSX.Element{

    const [deck,setDeck] = useState<string[]>(shuffle(['acehearts','kinghearts','queenhearts','jackhearts','tenhearts','ninehearts','eighthearts','sevenhearts','sixhearts','fivehearts','fourhearts','threehearts',
                                'twohearts','acediamonds','kingdiamonds','queendiamonds','jackdiamonds','tendiamonds','ninediamonds','eightdiamonds','sevendiamonds','sixdiamonds','fivediamonds',
                                'fourdiamonds','threediamonds','twodiamonds','acespades','kingspades','queenspades','jackspades','tenspades','ninespades','eightspades','sevenspades',
                                'sixspades','fivespades','fourspades','threespades','twospades','aceclubs','kingclubs','queenclubs','jackclubs','tenclubs','nineclubs','eightclubs',
                                'sevenclubs','sixclubs','fiveclubs','fourclubs','threeclubs','twoclubs'
                                ]));

    const [playerHand,setPlayerHand] = useState<string[]>([]); // Player hand as a string array
    const [computerHand,setComputerHand] = useState<string[]>([]); // computer hand as a string array
    const [tableCards,setTableCards] = useState<string[]>([]); // cards on table as a string array

    const [turn,setTurn] = useState<boolean>(true); // player turn as a boolean
    const [turnText,setTurnText] = useState<string>("User"); // turn text to display who's turn it is

    const [chips,setChips] = useState<number>(0); // chip amount as number

    const [gameStarted,setGameStarted] = useState<boolean>(false); // boolean if game has started
    const [tableCardsFull,setTableCardsFull] = useState<boolean>(false);

    // do I need these state values or can I just map playerHand to JSX when I call dealCards
    const [thePlayerCards,setThePlayerCards] = useState<JSX.Element[]>([]); // player cards as JSX Elements
    const [theTableCards,setTheTableCards] = useState<JSX.Element[]>([]); // Table Cards as JSX Elements
    const [theComputerCards,setTheComputerCards] = useState<JSX.Element[]>([]); // Computer Cards as JSX Elements

    const [mainButtonText,setMainButtonText] = useState<string>("Start Game"); // main button text as string

    useEffect(() => {

        setMainButtonText("Deal Table Cards");

    },[playerHand,computerHand]);


    const drawCards = (deck: string[], setDeck: React.Dispatch<React.SetStateAction<string[]>>, hand: string[], setHand: React.Dispatch<React.SetStateAction<string[]>>, amount: number, setJSXHand: React.Dispatch<React.SetStateAction<JSX.Element[]>>) => {

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

        let newHand: JSX.Element[] = hand.map(e => {

            return(

                <PokerCard cardName={e} key={e}/>

            );

        });

        setJSXHand([...newHand]);

    }

    const startGame = (): void => {

        if(!gameStarted){
            drawCards(deck,setDeck,playerHand,setPlayerHand,2,setThePlayerCards);
            drawCards(deck,setDeck,tableCards,setTableCards,3,setTheTableCards);
            drawCards(deck,setDeck,computerHand,setComputerHand,2,setTheComputerCards);
            setGameStarted(true);
        }
        else{
            if(tableCards.length === 5){
                alert('Cannot deal more table cards, max amount is 5');
            }
            else{
                drawCards(deck,setDeck,tableCards,setTableCards,1,setTheTableCards);
            }
        }
    
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
                    <Badge bg="primary">Current Turn :  {turnText}</Badge>
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
                    <br />
                    <ControlPanel />
                    <br />
                    <br />
                    <Row>

                        <Col>
                            <Button variant="primary" onClick={startGame} style={{margin: "auto", display: "block", textAlign: "center"}} id="mainButton" >{mainButtonText}</Button>
                        </Col>

                    </Row>
                </Container>
            </>


    );


}