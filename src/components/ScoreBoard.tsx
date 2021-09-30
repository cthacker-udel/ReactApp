import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge, Button, Container, Row, Col} from 'react-bootstrap';
import {PokerCard} from './PokerCard';
import {ControlPanel} from './ControlPanel';
import {shuffle,cardCombos,computerDecide} from '../utilities/PokerMethods';


export const ScoreBoard = (props: {userWins: number, computerWins: number, userChips: number, computerChips: number, userLosses: number, computerLosses: number}): JSX.Element => {

    return(
        <>
            <Col><h5 style={{textAlign: "center"}}>User Wins : {props.userWins}</h5></Col>
            <Col><h5 style={{textAlign: "center"}}>Computer Wins : {props.computerWins}</h5></Col>
            <Col><h5 style={{textAlign: "center"}}>User Chips : {props.userChips}</h5></Col>
            <Col><h5 style={{textAlign: "center"}}>Computer Chips : {props.computerChips}</h5></Col>
            <Col><h5 style={{textAlign: "center"}}>User Losses : {props.userLosses}</h5></Col>
            <Col><h5 style={{textAlign: "center"}}>Computer Losses : {props.computerLosses}</h5></Col>
        </>
    );

}