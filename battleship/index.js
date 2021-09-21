import React, {useState} from 'react';
import ReactDOM, { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge'

function Board(props){

    const [theGuesses,setTheGuesses] = useState(props.theCompGuesses);

    const [theColor,setColor] = useState('outline-primary');

    const printOut = (event) => {

        //console.log(event.target.name); // acquire button name that is pressed
        console.log(`guessesArr = ${props.guessesArr}`);
        let guess = event.target.name;
        console.log(`guesses2 = ${theGuesses}`);
        console.log(`the hits arr = ${props.theHitsArr}`);
        if(props.theHitsArr.length === theGuesses.length-1 && !props.theHitsArr.includes(event.target.name) && theGuesses.includes(event.target.name)){
            setColor("outline-primary");
            let currWins = props.numWins+1;
            props.updateWins(currWins);
            props.guessesArr.push(event.target.name);
            for(let eachname of props.guessesArr){

                document.getElementById(eachname).className = "btn btn-outline-primary";
                document.getElementById(eachname).innerHTML = eachname;

            }
            props.setGuessesArr([]);
            props.winProcedure(setTheGuesses);
            return;
        }
        else if(props.theHitsArr.includes(guess)){
            // has already been hit
            return;
        }
        else if(theGuesses.includes(guess)){
            // valid hit
            console.log(`hit!`);
            document.getElementById(guess).innerHTML = "HIT";
            document.getElementById(guess).className = "btn btn-success";
            props.updateHits(props.numHits+1);
            props.updateHitArr(props.theHitsArr.concat(guess));
            console.log(`the hits arr = ${props.theHitsArr}`);
        }
        else{
            console.log(`miss!`);
            document.getElementById(guess).innerHTML = "MISS";
            document.getElementById(guess).className = "btn btn-danger";
            props.updateMisses(props.numMisses+1);
        }
        props.guessesArr.push(event.target.name);
        
    }

    const generateSpace = (theName) => {


        return(

            <Button name={theName} variant={theColor} onClick={printOut} id={theName}>{theName}</Button>

        );

    }

    const [spaces,setSpaces] = useState(props['theOptions']);
    const [computerChoices,setComputerChoices] = useState('');

    return(

        <>

        <Table striped bordered hover size="sm" id="battleshiptable">

            <thead>
                <tr style={{textAlign: "center"}}>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>E</th>
                </tr>
            </thead>
            <tbody style={{textAlign: "center"}}>
                <tr style={{height: "200px"}}>
                    <td>
                        {generateSpace(spaces[0][0])}
                    </td>
                    <td>
                        {generateSpace(spaces[0][1])}
                    </td>
                    <td>
                        {generateSpace(spaces[0][2])}
                    </td>
                    <td>
                        {generateSpace(spaces[0][3])}
                    </td>
                    <td>
                        {generateSpace(spaces[0][4])}
                    </td>
                </tr>
                <tr style={{height: "200px"}}>
                    <td>
                        {generateSpace(spaces[1][0])}
                    </td>
                    <td>
                        {generateSpace(spaces[1][1])}
                    </td>
                    <td>
                        {generateSpace(spaces[1][2])}
                    </td>
                    <td>    
                        {generateSpace(spaces[1][3])}
                    </td>
                    <td>
                        {generateSpace(spaces[1][4])}
                    </td>
                </tr>
                <tr style={{height: "200px"}}>
                    <td>
                        {generateSpace(spaces[2][0])}
                    </td>
                    <td>
                        {generateSpace(spaces[2][1])}
                    </td>
                    <td>
                        {generateSpace(spaces[2][2])}
                    </td>
                    <td>
                        {generateSpace(spaces[2][3])}
                    </td>
                    <td>
                        {generateSpace(spaces[2][4])}
                    </td>
                </tr>
                <tr style={{height: "200px"}}>
                    <td>
                        {generateSpace(spaces[3][0])}
                    </td>
                    <td>
                        {generateSpace(spaces[3][1])}
                    </td>
                    <td>
                        {generateSpace(spaces[3][2])}
                    </td>
                    <td>
                        {generateSpace(spaces[3][3])}
                    </td>
                    <td>
                        {generateSpace(spaces[3][4])}
                    </td>
                </tr>
                <tr style={{height: "200px"}}>
                    <td>
                        {generateSpace(spaces[4][0])}
                    </td>
                    <td>
                        {generateSpace(spaces[4][1])}
                    </td>
                    <td>
                        {generateSpace(spaces[4][2])}
                    </td>
                    <td>
                        {generateSpace(spaces[4][3])}
                    </td>
                    <td>
                        {generateSpace(spaces[4][4])}
                    </td>
                </tr>
            </tbody>

        </Table>

        </>

    );

}

function NavigationButton(){

    const [show,setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return(

        <>
            <Button variant="primary" onClick={handleShow} style={{margin: "auto", display: "block", textAlign: "center"}}>
                Main Menu
            </Button>

            <Offcanvas show={show} onHide={handleClose} scroll={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Main Menu</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>

                    <a href="index.html">Back to Main Page</a>
                    <br />
                    <a href="poker.jsx">To Poker</a>
                    <br />
                    <a href="calculator.jsx">Calculator</a>
                    <br />
                    <a href="bootstrapreview.html">Bootstrap Review</a>
                    <br />
                    <a href="fullreviews.html">Full reviews - Week 1</a>

                </Offcanvas.Body>

            </Offcanvas>
        </>

    );

}

function MainPage(){

    const theChoices = [['A1','B1','C1','D1','E1'],['A2','B2','C2','D2','E2'],['A3','B3','C3','D3','E3'],['A4','B4','C4','D4','E4'],['A5','B5','C5','D5','E5']];

    const [options,setOptions] = useState(theChoices);

    const getCompGuesses = () => {

        let randNums = [];
        let x = 0;
        let y = 0;
        let fndPair = false;
        do{
            x = Math.floor(Math.random() *(5));
            y = Math.floor(Math.random() *(5));
            for(let i = 0; i < randNums.length; i++){
                let eachpair = randNums[i];
                if(eachpair[0] === x && eachpair[1] === y){
                    fndPair = true;
                    break;
                }
                else{
                    fndPair = false;
                }
            }
            if(fndPair){
                continue;
            }
            else{
                randNums.push([x,y]);
            }
        }while(randNums.length !== 5);
    
        let theGuesses = [];
        for(let eachpair of randNums){
            theGuesses.push(options[eachpair[0]][eachpair[1]]);
        }
        return theGuesses;
    
    }

    // get computer guesses

    // default to 5 guesses <--- may add difficulty functionality later on (reset board, regenerate guesses) also perhaps add customizable functionality such as 
    // the user determining the board size rather than default 5x5, also maybe add implementation so instead of picking 5 random points separately, they are conjoined
    // together to form a "ship"

    // really odd behavior when using random numbers, they would change from here to being passed to the board, unsure why, and then when I called set hits in the board func,
    // it would edit the random numbers as well

    const postWin = (setBoardGuesses) => {

        let guesses = getCompGuesses();
        setComputerGuess(guesses);
        setHitsArr([]);
        setBoardGuesses(guesses);

    }

    const compGuess = getCompGuesses();

    const[computerGuess,setComputerGuess] = useState(compGuess);

    const [misses,setMisses] = useState(0);
    const [hits,setHits] = useState(0);
    const [wins,setWins] = useState(0);

    console.log(`wins = ${wins}`);

    const [hitsArr,setHitsArr] = useState([]);

    const [guesses,setGuesses] = useState([]);

    //console.log(`compguess = ${compGuess}`);

    console.log(`hits = ${hits}`);

    return(
        <>
            <Row style={{textAlign: "center"}}>
                <Col>

                    <h3><Badge bg="primary" id="missesBadge">Misses : {misses}</Badge></h3>

                </Col>
                <Col>

                    <h3><Badge bg="primary" id="hitsbadge">Hits : {hits}</Badge></h3>

                </Col>
                <Col>

                    <h3><Badge bg="primary" id="sankBadge">Wins : {wins}</Badge></h3>

                </Col>
            </Row>
            <Row>

                <Col>

                <Board theOptions={options} theCompGuesses={computerGuess} updateHits={setHits} updateWins={setWins} updateMisses={setMisses} numHits={hits} numMisses={misses} numWins={wins} updateHitArr={setHitsArr} theHitsArr={hitsArr} winProcedure={postWin} guessesArr={guesses} setGuessesArr={setGuesses}/>

                </Col>

            </Row>
            <br />
            <br />
            <Row>
                <Col>

                    <NavigationButton/>

                </Col>
            </Row>
        </>
    );

}

ReactDOM.render(

    <React.StrictMode>

        <MainPage />

    </React.StrictMode>, document.getElementById('root')

);