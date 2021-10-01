import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge, Button, Container, Row, Col, Card} from 'react-bootstrap';
import {PokerCard} from './PokerCard';
import {ControlPanel} from './ControlPanel';
import {shuffle,cardCombos,computerDecide,computerDecideRaised} from '../utilities/PokerMethods';
import {ScoreBoard} from './ScoreBoard';
import {RaiseForm} from './RaiseForm';
import {ChipInitializer} from './ChipInitializer';
import {RaiseSend} from './RaiseSend';


export function MainPage(): JSX.Element{

    const fullDeck: string[] = ['acehearts','kinghearts','queenhearts','jackhearts','tenhearts','ninehearts','eighthearts','sevenhearts','sixhearts','fivehearts','fourhearts','threehearts',
    'twohearts','acediamonds','kingdiamonds','queendiamonds','jackdiamonds','tendiamonds','ninediamonds','eightdiamonds','sevendiamonds','sixdiamonds','fivediamonds',
    'fourdiamonds','threediamonds','twodiamonds','acespades','kingspades','queenspades','jackspades','tenspades','ninespades','eightspades','sevenspades',
    'sixspades','fivespades','fourspades','threespades','twospades','aceclubs','kingclubs','queenclubs','jackclubs','tenclubs','nineclubs','eightclubs',
    'sevenclubs','sixclubs','fiveclubs','fourclubs','threeclubs','twoclubs'
    ];

    const [deck,setDeck] = useState<string[]>(shuffle(fullDeck));

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

    // track state of game
    const [raise,setRaise] = useState<boolean>(false);
    const [userRaise,setUserRaise] = useState<boolean>(false);
    const [raiseAmt,setRaiseAmt] = useState<number>(0);

    const [call,setCall] = useState<boolean>(false);

    const [strengthText,setStrengthText] = useState<string>("");

    const [modalAppear,setModalAppear] = useState<boolean>(false);

    /*
    #################
    END GAME FUNCTION
    #################
    */

    const endGame = (user: number) => {

        let tmpCmpLosses: number = computerLosses;
        let tmpUserLosses: number = userLosses;
        let tmpCmpWins: number = computerWins;
        let tmpUserWins: number = userWins;

        if(user === 2){
            // computer lost
            setComputerLosses(++tmpCmpLosses);
            setUserWins(++tmpUserWins);
            let tmpUserChips = userChips;
            tmpUserChips += totalChips;
            setUserChips(tmpUserChips);
            alert('Computer lost');
        }
        else if(user === 1){
            setUserLosses(++tmpUserLosses);
            setComputerWins(++tmpCmpWins);
            let tmpComputerChips = computerChips;
            tmpComputerChips += totalChips;
            setComputerChips(tmpComputerChips);
            alert('User lost');
        }
        else{
            let halfOfChips = Math.round(totalChips / 2);
            let tmpComputerChips = computerChips;
            tmpComputerChips += halfOfChips;
            setComputerChips(tmpComputerChips);
            let tmpUserChips = userChips;
            tmpUserChips += halfOfChips;
            setUserChips(tmpUserChips);
            alert('Tie!');
        }
        setDeck(shuffle(fullDeck));
        setGameStarted(false);
        setTurn(true);
        setRaise(false);
        setCall(false);
        setStrengthText("");
        setPlayerHand([]);
        setComputerHand([]);
        setTableCards([]);
        setThePlayerCards([]);
        setTheComputerCards([]);
        setTheTableCards([]);
        setTotalChips(0);
        setMoveSelected(false);
        setUserRaise(false);

    }

    /*
           #########################
            <<<<< USE EFFECTS >>>>>
           #########################

    */

    useEffect(() => {

        // check if turn is players or computers

        if(moveSelected){
            // user selected move
            let compDecision: number = computerDecide(playerHand,computerHand,tableCards);
            if(compDecision === 3){
                // fold
                // end game
                endGame(2);
            }
            else if(compDecision === 2){
                alert('Computer raises');
                //setRaise(true);
                setMoveSelected(false);
                let raiseAmount: number = Math.ceil(Math.ceil(Math.random()+(computerChips / 10)) * (totalChips % 10));

                setRaiseAmt(raiseAmount);
                // implement raise functionality
                // raise.. then reset moveSelected, maybe have option to fold in reset modal
                // return answer as int, 0 is fold, 1 is call, 2 is re-raise with new amt
                // maybe record answer in state or return in function
                setRaise(true); // makes modal appear
            }
            else{
                if(tableCards.length === 5){
                    // conduct endgame function
                    let compRank = cardCombos([...computerHand,...tableCards]);
                    let userRank = cardCombos([...playerHand,...tableCards]);
                    if(userRank > compRank){
                        endGame(2);
                    }
                    else if(userRank < compRank){
                        endGame(1);
                    }
                    else{
                        endGame(0);
                    }
                }
                else{
                    alert('Computer calls');
                    setMoveSelected(false);
                    drawCards(false,deck,setDeck,tableCards,setTableCards,1,setTheTableCards);
                }
            }

        }

    },[moveSelected]);


    useEffect(() => {

        setMainButtonText("Deal Table Cards");

    },[playerHand,computerHand]);


    useEffect(() => {

        if(gameStarted){

            let handRank: number = cardCombos([...playerHand,...tableCards]);

            let handStrength: string = "";

            switch(handRank){

                case 1:
                    handStrength = "Royal Flush";
                    break;
                case 2:
                    handStrength = "Straight Flush";
                    break;
                case 3:
                    handStrength = "Four of a Kind";
                    break
                case 4:
                    handStrength = "Full House";
                    break;
                case 5:
                    handStrength = "Flush";
                    break;
                case 6:
                    handStrength = "Straight";
                    break;
                case 7:
                    handStrength = "Three of a Kind";
                    break;
                case 8:
                    handStrength = "Two Pairs";
                    break;
                case 9:
                    handStrength = "Pair";
                    break;
                default:
                    handStrength = "High Card";
                    break;

            }
            console.log(`hand strength = ${handStrength}`);
            setStrengthText(handStrength);
        }


    },[tableCards]);

    /*

            <<<<< USE EFFECTS >>>>>

    */

    const callClick = (): void => {

        if(!moveSelected){
            // user presses call
            setCall(true);
            setMoveSelected(true);
            alert('User selects call');
        }
        else{
            alert(`Already selected : ${call? "call": "raise"}`);
        }

    }

    const foldClick = (): void => {

        if(!moveSelected){
            // user presses fold
            endGame(1);
        }

    } 

    const raiseClick = (): void => {

        if(gameStarted){
            setUserRaise(true);
        }

    }

    /*

    Raise functions

    */

    const userRaiseFunc = (amt: number): void => {

        if(amt > computerChips){
            endGame(2);
        }
        else{

            let cmpDecisionR = computerDecideRaised(playerHand,computerHand,tableCards);
            if(cmpDecisionR === 1){
                // called
                // deduct chips and forward turn
                let tmpComputerChips = computerChips;
                tmpComputerChips -= amt;
                let tmpTotalChips = totalChips;
                tmpTotalChips += amt;
                setComputerChips(tmpComputerChips);
                let tmpUserChips = userChips;
                tmpUserChips -= amt;
                setTotalChips(totalChips);
                setUserChips(tmpUserChips);
                if(tableCards.length === 5){
                    let compRank = cardCombos([...computerHand,...tableCards]);
                    let userRank = cardCombos([...playerHand,...tableCards]);
                    if(userRank > compRank){
                        endGame(2);
                    }
                    else if(userRank < compRank){
                        endGame(1);
                    }
                    else{
                        endGame(0);
                    }
                }
                else{
                    setMoveSelected(false);
                    drawCards(false,deck,setDeck,tableCards,setTableCards,1,setTheTableCards);
                }
            }
            else{
                endGame(2);
            }

        }
        setUserRaise(false);

    }

    const raiseFunc = (decision: number, amt: number): void => {

        if(decision === 0){
            // user folded
            endGame(1);
        }
        else if(decision === 1){
            // called amount
            // deduct chips from user
            console.log(`raising from comp`);
            let tmpUserChips = userChips;
            tmpUserChips -= amt;
            setUserChips(tmpUserChips);
            let tmpTotalChips = totalChips;
            tmpTotalChips += amt;
            setTotalChips(tmpTotalChips);
            setRaiseAmt(0);
            if(tableCards.length === 5){
                // conduct endgame function
                let compRank = cardCombos([...computerHand,...tableCards]);
                let userRank = cardCombos([...playerHand,...tableCards]);
                if(userRank > compRank){
                    endGame(2);
                }
                else if(userRank < compRank){
                    endGame(1);
                }
                else{
                    endGame(0);
                }
            }
        }
        setRaise(false);

    }

    /*

            <<<<<<<< ESSENTIAL FUNCTIONS >>>>>>>>


    */


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
            setModalAppear(true);
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

    // if you raise computer must call or fold

    return(
        
        <>
                <Container fluid>
                    <Row>
                        <Col><h1 style={{textAlign: "center"}}>Poker Game</h1></Col>
                    </Row>
                    <Row>
                        <ScoreBoard userWins={userWins} computerWins={computerWins} userChips={userChips} computerChips={computerChips} userLosses={userLosses} computerLosses={computerLosses} />
                    </Row>
                    <Row>
                        <Card>
                        <Col><Card.Body><h5 style={{textAlign: "center"}}>Total Chips : {totalChips}</h5></Card.Body></Col>
                        </Card>
                    </Row>

                    <br />
                    <Badge bg={"primary"} style={{textAlign: "center", display: "block"}}>Current Hand Strength :  {strengthText}</Badge>
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
                    <ControlPanel theTurn={turn} callFunc={callClick} foldFunc={foldClick} raiseFunc={raiseClick} />
                    <br />
                    <br />
                    <Row>

                        <Col>
                            <Button variant={turn? "primary": "secondary"} onClick={startGame} style={{margin: "auto", display: "block", textAlign: "center"}} id="mainButton" >{mainButtonText}</Button>
                        </Col>

                    </Row>
                    <Row>
                        <Col><RaiseForm appear={raise} playerChips={userChips} raiseAmt={raiseAmt} raiseFunc={raiseFunc}/></Col>
                    </Row>
                    <Row>
                        <Col><ChipInitializer appear={modalAppear} submitChips={(amt: number) => {

                            let tmpUserChips = userChips;
                            tmpUserChips -= amt;

                            if(amt > computerChips){
                                amt += computerChips;
                                setComputerChips(0);
                            }
                            else{
                                let tmpComputerChips: number = computerChips;
                                tmpComputerChips -= amt;
                                amt += amt;
                                setComputerChips(tmpComputerChips);
                            }
                            setTotalChips(amt);


                            setUserChips(tmpUserChips);
                            setModalAppear(false);

                        }} playerChips={userChips}/></Col>
                    </Row>
                    <Row>

                        <Col>
                        
                            <RaiseSend appear={userRaise} playerChips={userChips} raiseFunc={userRaiseFunc}/>

                        </Col>

                    </Row>
                </Container>
            </>


    );

}