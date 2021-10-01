import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React from 'react';

export const ControlPanel = (props: {theTurn: boolean, foldFunc: () => void, callFunc: () => void, raiseFunc: () => void}): JSX.Element => {

    return(
    <>
        <Row>
            <Col>
                <Button variant={props.theTurn? "primary": "secondary"} style={{margin: "auto", display: "block", textAlign: "center"}} onClick={props.foldFunc}>Fold</Button>
            </Col>
            <Col>
                <Button variant={props.theTurn? "primary": "secondary"} style={{margin: "auto", display: "block", textAlign: "center"}} onClick={props.raiseFunc}>Raise</Button>
            </Col>
            <Col>
                <Button variant={props.theTurn? "primary": "secondary"} style={{margin: "auto", display: "block", textAlign: "center"}} onClick={props.callFunc}>Call</Button>
            </Col>
        </Row>
    </>
    );

}