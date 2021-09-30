import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge, Button, Container, Row, Col} from 'react-bootstrap';
import {PokerCard} from './PokerCard';
import {ControlPanel} from './ControlPanel';
import {shuffle,cardCombos,computerDecide} from '../utilities/PokerMethods';
import {RaiseForm} from './RaiseForm';


export function MainPage(): JSX.Element{

    const [deck,setDeck] = useState<string[]>(shuffle(['acehearts','kinghearts','queenhearts','jackhearts','tenhearts','ninehearts','eighthearts','sevenhearts','sixhearts','fivehearts','fourhearts','threehearts',
                                'twohearts','acediamonds','kingdiamonds','queendiamonds','jackdiamonds','tendiamonds','ninediamonds','eightdiamonds','sevendiamonds','sixdiamonds','fivediamonds',
                                'fourdiamonds','threediamonds','twodiamonds','acespades','kingspades','queenspades','jackspades','tenspades','ninespades','eightspades','sevenspades',
                                'sixspades','fivespades','fourspades','threespades','twospades','aceclubs','kingclubs','queenclubs','jackclubs','tenclubs','nineclubs','eightclubs',
                                'sevenclubs','sixclubs','fiveclubs','fourclubs','threeclubs','twoclubs'
                                ]));

    // if move has been selected
    const [moveSelected,setMoveSelected] = useState<boolean>(false);

    /*

    String arrays containing cards as string values

    */
    const [playerHand,setPlayerHand] = useState<string[]>([]); // Player hand as a string array
    const [computerHand,setComputerHand] = useState<string[]>([]); // computer hand as a string array
    const [tableCards,setTableCards] = useState<string[]>([]); // cards on table as a string array


    /*

    Boolean value containing whose turn it is

    */

    const [turn,setTurn] = useState<boolean>(true); // player turn as a boolean

    /*

    Number value containing total number of player chips, computer chips, and chips currently in play

    */

    const [computerChips,setComputerChips] = useState<number>(1000);
    const [userChips,setUserChips] = useState<number>(1000);
    const [totalChips,setTotalChips] = useState<number>(0);


    /*

    Number value containing total number of computer wins, and user wins

    */

    const [computerWins,setComputerWins] = useState<number>(0);
    const [userWins,setUserWins] = useState<number>(0);

    /*

    Number value containing total number of computer and user losses

    */

    const [computerLosses,setComputerLosses] = useState<number>(0);
    const [userLosses,setUserLosses] = useState<number>(0);


    // If game has started
    const [gameStarted,setGameStarted] = useState<boolean>(false); // boolean if game has started

    // JSX Arrays that contain HTML Elements cards from string arrays
    const [thePlayerCards,setThePlayerCards] = useState<JSX.Element[]>([]); // player cards as JSX Elements
    const [theTableCards,setTheTableCards] = useState<JSX.Element[]>([]); // Table Cards as JSX Elements
    const [theComputerCards,setTheComputerCards] = useState<JSX.Element[]>([]); // Computer Cards as JSX Elements

    // text of the main button 
    const [mainButtonText,setMainButtonText] = useState<string>("Start Game"); // main button text as string

    useEffect(() => {

        // check if turn is players or computers
        if(!turn){

            alert('Your turn? Call/Fold/Raise?');

        }
        else{

            // computer logic

        }

    },[turn]);

    useEffect(() => {

        setMainButtonText("Deal Table Cards");

    },[playerHand,computerHand]);

    const 


    // put in PokerMethods.tsx
    const drawCards = (isComputer: boolean, deck: string[], setDeck: React.Dispatch<React.SetStateAction<string[]>>, hand: string[], setHand: React.Dispatch<React.SetStateAction<string[]>>, amount: number, setJSXHand: React.Dispatch<React.SetStateAction<JSX.Element[]>>) => {

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

                <PokerCard cardName={isComputer? "backofcard": e} key={e}/>

            );

        });

        setJSXHand([...newHand]);

    }

    const startGame = (): void => {

        if(!gameStarted){
            // first turn
            drawCards(false,deck,setDeck,playerHand,setPlayerHand,2,setThePlayerCards);
            drawCards(false,deck,setDeck,tableCards,setTableCards,3,setTheTableCards);
            drawCards(true,deck,setDeck,computerHand,setComputerHand,2,setTheComputerCards);
            setGameStarted(true);
            alert('Your turn? Call/Fold/Raise?');
        }
        else{
            if(tableCards.length === 5){
                alert('Cannot deal more table cards, max amount is 5');
            }
            else if(!moveSelected){
                alert('Select a move before advancing turn');
            }
            else{
                drawCards(false,deck,setDeck,tableCards,setTableCards,1,setTheTableCards);
                setTurn(!turn);
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
                        <Col><h5 style={{textAlign: "center"}}>User Wins : {userWins}</h5></Col>
                        <Col><h5 style={{textAlign: "center"}}>Computer Wins : {computerWins}</h5></Col>
                        <Col><h5 style={{textAlign: "center"}}>User Chips : {userChips}</h5></Col>
                        <Col><h5 style={{textAlign: "center"}}>Computer Chips : {computerChips}</h5></Col>
                        <Col><h5 style={{textAlign: "center"}}>User Losses : {userLosses}</h5></Col>
                        <Col><h5 style={{textAlign: "center"}}>Computer Losses : {computerLosses}</h5></Col>
                    </Row>
                    <Row>
                        <Col><h5 style={{textAlign: "center"}}>Total Chips : {totalChips}</h5></Col>
                    </Row>

                    <br />
                        <Badge bg={turn? "primary": "secondary"} style={{textAlign: "center", display: "block"}}>Current Turn :  {turn? "User": "Computer"}</Badge>
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
                    <ControlPanel theTurn={turn} />
                    <br />
                    <br />
                    <Row>

                        <Col>
                            <Button variant={turn? "primary": "secondary"} onClick={startGame} style={{margin: "auto", display: "block", textAlign: "center"}} id="mainButton" >{mainButtonText}</Button>
                        </Col>

                    </Row>
                </Container>
            </>


    );


}