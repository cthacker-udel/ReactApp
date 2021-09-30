import React, {useState, useEffect} from 'react';
import ReactDOM, { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'


function PokerCard(props: {cardName: string}): JSX.Element{

    return(

        
        <Image src={`${process.env.PUBLIC_URL}/assets/cards/${props.cardName}.PNG`} style={{height: "100px", width: "100px"}} rounded />


    );


}


function MainPage(): JSX.Element{

    /*

        POKER METHODS

    */

        const royalFlush = (cards: string[]): boolean => {

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
        
        const sameSuit = (cards: string[]): boolean => {
        
            let suits = ['hearts','clubs','spades','diamonds'];

            interface suits {

                [index: string]: number
                'hearts': number
                'clubs': number
                'spades': number
                'diamonds': number

            }

        
            let theSuits: suits = {'hearts': 0, 'clubs': 0, 'spades': 0, 'diamonds': 0};
        
            for(let i = 0; i < cards.length; i++){
        
                for(let j of suits){
                    if(cards[i].includes(j)){
                        theSuits[j] += 1;
                    }
                }
        
            }
            return Object.keys(theSuits).map(e => theSuits[e]).some(e => e >= 5);
        
        }
        
        const consecutive = (cards: string[]): boolean => {

            interface ranks{

                [index: string]: number
                'ace': number
                'king': number
                'queen': number
                'jack': number
                'ten': number
                'nine': number
                'eight': number
                'seven': number
                'six': number
                'five': number
                'four': number
                'three': number
                'two': number

            }


            let theRanks: ranks = {'ace': 14, 'king': 13, 'queen': 12, 'jack': 11, 'ten': 10, 'nine': 9, 'eight': 8, 'seven': 7, 'six': 6, 'five': 5, 'four': 4, 'three': 3, 'two': 2};
        
            let theNumRanks: number[] = [];
            for(let i = 0; i < cards.length; i++){
                let theCard = cards[i];
                for(let j of Object.keys(theRanks)){
                    if(theCard.includes(j)){
                        theNumRanks.push(theRanks[j]);
                        break;
                    }
                }
            }
        
            theNumRanks.sort((a,b) => a-b);
            theNumRanks = [...new Set(theNumRanks)];
            let cnt = 0;
            for(let i = 0; i < theNumRanks.length-1; i++){
        
                let iRank = theNumRanks[i];
                let jRank = theNumRanks[i+1];
                if(Math.abs(iRank - jRank) === 1){
                    cnt++;
                }
                else if(cnt === 4){
                    return true;
                }
                else if(Math.abs(iRank - jRank) !== 1){
                    cnt = 0;
                }
        
            }
            return false;
        
        }
        
        const getCardRank = (card: string): number => {
        
            interface theRanks{

                [index: string]: number
                'ace': number
                'king': number
                'queen': number
                'jack': number
                'ten': number
                'nine': number
                'eight': number
                'seven': number
                'six': number
                'five': number
                'four': number
                'three': number
                'two': number

            }


            let ranks: theRanks = {'ace': 14, 'king': 13, 'queen': 12, 'jack': 11, 'ten': 10, 'nine': 9, 'eight': 8, 'seven': 7, 'six': 6, 'five': 5, 'four': 4, 'three': 3, 'two': 2};
        
            for(let i of Object.keys(ranks)){
                if(card.includes(i)){
                    return ranks[i];
                }
            }
            return -1;
        
        }
        
        const straightFlush = (cards: string[]): boolean => {
        
            if(!sameSuit(cards)){
                return false;
            }
            if(!consecutive(cards)){
                return false;
            }
            cards.sort((a,b) => getCardRank(a) - getCardRank(b));
            return true;
        
        
        
        }

        const rankCount = (card: string,cards: string[]): number => {

            if(cards === undefined || card === undefined){
                return 0;
            }

            cards = cards.map(e => e.replace('hearts','').replace('spades','').replace('diamonds','').replace('clubs',''));

            card = card.replace('hearts','').replace('spades','').replace('diamonds','').replace('clubs','');

            return cards.filter(e => e === card).length;


        }

        const fourOfAKind = (cards: string[]): boolean => {

            for(let eachcard of cards){

                let cnt = rankCount(eachcard,cards);
                if(cnt === 4){
                    return true;
                }

            }
            return false;

        }

        const fullHouse = (cards: string[]): boolean => {

            let found2kind = false;
            let found3kind = false;

            for(let eachcard of cards){

                let cnt = rankCount(eachcard,cards);
                if(cnt === 2){
                    found2kind = true;
                }
                else if(cnt === 3){
                    found3kind = true;
                }

            }
            return found2kind && found3kind;

        }

        const flush = (cards: string[]): boolean => {

            return sameSuit(cards);

        }

        const straight = (cards: string[]): boolean => {

            return consecutive(cards);

        }

        const threeOfAKind = (cards: string[]): boolean => {

            for(let eachcard of cards){

                let res = rankCount(eachcard,cards);
                if(res === 3){
                    return true;
                }

            }
            return false;

        }

        const twoPairs = (cards: string[]): boolean => {

            let cnt = 0;
            let rankSet = new Set<string>();
            for(let eachcard of cards){

                let rank = eachcard.replace('hearts','').replace('spades','').replace('diamonds','').replace('clubs','');
                rankSet.add(rank);

            }
            for(let eachrank of [...rankSet]){

                let res = rankCount(eachrank,cards);
                if(res === 2){
                    cnt++;
                }

            }
            return cnt === 2;

        }

        const onePair = (cards: string[]): boolean => {

            for(let eachcard of cards){

                let rank = eachcard.replace('hearts','').replace('spades','').replace('diamonds','').replace('clubs','');
                if(rankCount(rank,cards) === 2){
                    return true;
                }

            }
            return false;

        }



        const cardCombos = (cards: string[]): number => {

            /*

                1 - royal flush
                2 - straight flush
                3 - four of a kind
                4 - full house
                5 - flush
                6 - straight
                7 - three of a kind
                8 - two pairs

            */

            let res = 0;

            if(royalFlush(cards)){
                res = 1;
            }
            else if(straightFlush(cards)){
                res = 2;
            }
            else if(fourOfAKind(cards)){
                res = 3;
            }
            else if(fullHouse(cards)){
                res = 4;
            }
            else if(flush(cards)){
                res = 5;
            }
            else if(straight(cards)){
                res = 6;
            }
            else if(threeOfAKind(cards)){
                res = 7;
            }
            else if(twoPairs(cards)){
                res = 8;
            }
            else if(onePair(cards)){
                res = 9;
            }
            return res;

        }


    /*

        POKER METHODS

    */

    /* from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array [first answer] */
    const shuffle = (array: string[]): string[] => {

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

    const [cards,setCards] = useState<string[]>(shuffle(['acehearts','kinghearts','queenhearts','jackhearts','tenhearts','ninehearts','eighthearts','sevenhearts','sixhearts','fivehearts','fourhearts','threehearts',
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
    const [gameStarted,setGameStarted] = useState<boolean>(false);
    const [mainButtonTextBool,setMainButtonTextBool] = useState<boolean>(false);
    const [thePlayerCards,setThePlayerCards] = useState<JSX.Element[]>([]);
    const [theTableCards,setTheTableCards] = useState<JSX.Element[]>([]);
    const [theComputerCards,setTheComputerCards] = useState<JSX.Element[]>([]);

    const determineTurn = (): void => {

        Math.floor(Math.random() * (2) + 0) === 1? setPlayerTurn(true): setPlayerTurn(false);

    }

    const tableCardsInit = (): void => {

        if(tableCards.length === 5){
            // max amt of cards
            return;
        }
        let amt = (playerHand.length > 0? 1: 3);

        if(cards.length === 0){
            return;
        }
        let theCards = tableCards;
        let count = 0;
        while(count < amt && cards.length > 0){
            const aStr: string | undefined = cards.pop();
            if(aStr !== undefined){
                theCards.push(aStr);
            }
            count++;
        }
        setTableCards(theCards);
        //console.log(state);
        setTheTableCards(theCards.map((e,i) => {

            return(
    
                <PokerCard cardName={e} key={e} />
    
            );
    
        }));
        console.log(`theCards = ${theCards}`);
        return;

    }

    const playerCardsInit = (): void => {

        if(playerHand.length === 2){
            // max amt of player cards
            return;
        }
        if(cards.length === 0){
            return;
        }
        let theCards = playerHand;
        for(let i = 0; i < 2; i++){
            const aStr: string | undefined = cards.pop();
            if(aStr !== undefined){
                theCards.push(aStr);
            }
        }
        setPlayerHand(theCards);
        setThePlayerCards(theCards.map((e,i) => {

            return(
    
                <PokerCard cardName={e} key={e} />
    
            );
    
        }));
        //console.log(state);

    }

    const computerCardsInit = (): void => {
        
        if(computerHand.length === 2){
            return;
        }
        if(cards.length === 0){
            return;
        }
        let theCards = computerHand;
        for(let i = 0; i < 2; i++){
            const aStr: string | undefined = cards.pop();
            if(aStr !== undefined){
                theCards.push(aStr);
            }
        }
        setComputerHand(theCards);
        setTheComputerCards(theCards.map((e,i) => {

            return(
    
                <PokerCard cardName={"backofcard"} key={e} />
    
            );
    
        }));
        //console.log(state);

    }

    const startGame = (): void => {

        /*

        Calculate card combos

        */

        console.log(`Playerhand = ${playerHand} and computerHand = ${computerHand} and tableCards = ${tableCards}`);

        playerCardsInit();
        computerCardsInit();
        tableCardsInit();
        if(tableCards.length > 0){
            let res: string[] = [...tableCards,...playerHand];
            console.log(`the hand = ${res}`);
            let comboResult: number;
            comboResult = cardCombos(res);
            console.log(`The result was : ${comboResult}`);
        }

        let element: HTMLElement | null = document.getElementById('mainButton');
        if(element !== null){
            element.innerHTML = "Deal Table Card";
        }

    
    }

    console.log(`theplayercards = ${thePlayerCards}`);

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
                            <Button variant="primary" onClick={startGame} style={{margin: "auto", display: "block", textAlign: "center"}} id="mainButton">Start Game</Button>
                        </Col>

                    </Row>
                </Container>
            </>


    );


}


ReactDOM.render(

    <React.StrictMode>

        <MainPage />

    </React.StrictMode>,document.getElementById('root')

);