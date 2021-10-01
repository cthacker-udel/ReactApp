import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListGroup, Col} from 'react-bootstrap';

export const ScoreBoard = (props: {userWins: number, computerWins: number, userChips: number, computerChips: number, userLosses: number, computerLosses: number}): JSX.Element => {

    return(
        <>
        <ListGroup horizontal style={{textAlign: "center"}}>
            <Col><ListGroup.Item><h5 style={{textAlign: "center"}}>User Wins : {props.userWins}</h5></ListGroup.Item></Col>
            <Col><ListGroup.Item><h5 style={{textAlign: "center"}}>Computer Wins : {props.computerWins}</h5></ListGroup.Item></Col>
            <Col><ListGroup.Item><h5 style={{textAlign: "center"}}>User Chips : {props.userChips}</h5></ListGroup.Item></Col>
            <Col><ListGroup.Item><h5 style={{textAlign: "center"}}>Computer Chips : {props.computerChips}</h5></ListGroup.Item></Col>
            <Col><ListGroup.Item><h5 style={{textAlign: "center"}}>User Losses : {props.userLosses}</h5></ListGroup.Item></Col>
            <Col><ListGroup.Item><h5 style={{textAlign: "center"}}>Computer Losses : {props.computerLosses}</h5></ListGroup.Item></Col>
        </ListGroup>
        </>
    );

}