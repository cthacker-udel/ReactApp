import React, {useState} from 'react';
import ReactDOM, { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Board(props){


    const setSpaces = (name) => {

        return(

            <Button theName={name} variant="outline-primary">name</Button>

        );

    }

    return(

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
                        A1
                    </td>
                    <td>
                        B1
                    </td>
                    <td>
                        C1
                    </td>
                    <td>
                        D1
                    </td>
                    <td>
                        E1
                    </td>
                </tr>
                <tr style={{height: "200px"}}>
                    <td>
                        A2
                    </td>
                    <td>
                        B2
                    </td>
                    <td>
                        C2
                    </td>
                    <td>    
                        D2
                    </td>
                    <td>
                        E2
                    </td>
                </tr>
                <tr style={{height: "200px"}}>
                    <td>
                        A3
                    </td>
                    <td>
                        B3
                    </td>
                    <td>
                        C3
                    </td>
                    <td>
                        D3
                    </td>
                    <td>
                        E3
                    </td>
                </tr>
                <tr style={{height: "200px"}}>
                    <td>
                        A4
                    </td>
                    <td>
                        B4
                    </td>
                    <td>
                        C4
                    </td>
                    <td>
                        D4
                    </td>
                    <td>
                        E4
                    </td>
                </tr>
                <tr style={{height: "200px"}}>
                    <td>
                        A5
                    </td>
                    <td>
                        B5
                    </td>
                    <td>
                        C5
                    </td>
                    <td>
                        D5
                    </td>
                    <td>
                        E5
                    </td>
                </tr>
            </tbody>

        </Table>

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


    const [options,setOptions] = useState([['A1','B1','C1','D1','E1'],['A2','B2','C2','D2','E2'],['A3','B3','C3','D3','E3'],['A4','B4','C4','D4','E4'],['A5','B5','C5','D5','E5']]);
    const [turn,setTurn] = useState(true); // user goes first if true

    return(
        <>
            <Row>

                <Col>

                <Board theOptions={options}/>

                </Col>

            </Row>
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