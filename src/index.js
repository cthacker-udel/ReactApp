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


    const printOut = (event) => {

        console.log(event.target.name); // acquire button name that is pressed
        
    }

    const generateSpace = (theName) => {

        return(

            <Button name={theName} variant="outline-primary" onClick={printOut} id={theName}>{theName}</Button>

        );

    }

    console.log(`props = ${props['theOptions']}`);

    const [spaces,setSpaces] = useState(props['theOptions']);
    const [computerChoices,setComputerChoices] = useState('');

    console.log(`spaces = ${spaces}`);

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
    const [turn,setTurn] = useState(true); // user goes first if true

    // get computer guesses

    // default to 5 guesses <--- may add difficulty functionality later on (reset board, regenerate guesses) also perhaps add customizable functionality such as 
    // the user determining the board size rather than default 5x5, also maybe add implementation so instead of picking 5 random points separately, they are conjoined
    // together to form a "ship"

    let compGuess = [options[0][Math.random() * (4)]
                        ,options[1][Math.random() * 4]
                        ,options[2][Math.random() * 4]
                        ,options[3][Math.random() * 4]
                        ,options[4][Math.random() * 4]];

    const[computerGuess,setComputerGuess] = useState(compGuess);

    const [misses,setMisses] = useState(0);
    const [hits,setHits] = useState(0);
    const [sank,setSank] = useState(0);


    return(
        <>
            <Row>

                <Col>

                <Board theOptions={options} theCompGuesses={computerGuess}/>

                </Col>

            </Row>
            <Row style={{textAlign: "center"}}>
                <Col>

                    <Badge bg="primary" id="missesBadge">Misses : 0</Badge>

                </Col>
                <Col>

                    <Badge bg="primary" id="hitsbage">Hits : 0</Badge>

                </Col>
                <Col>

                    <Badge bg="primary" id="shipsank">Sank : 0</Badge>

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