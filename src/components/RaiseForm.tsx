import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Button,Form, Row, Col} from 'react-bootstrap';

export const RaiseForm = (props: {appear: boolean, playerChips: number, raiseAmt: number, raiseFunc: (decision: number, amt: number) => void}): JSX.Element => {

    const [chipAmount,setChipAmount] = useState<string>("0");

    return(

        <>
            <Row>
                <Col>
                    <Modal show={props.appear} onHide={() => {console.log(`calling onHide`)}}>
                        <Modal.Header>
                            Raise Demand : Amount [{props.raiseAmt}]
                        </Modal.Header>
                        <Modal.Footer>

                            
                        </Modal.Footer>
                        <Row>
                            <Col style={{textAlign: "center"}}>
                                <Button variant="primary" onClick={() => {props.raiseFunc(0,0)}}>Fold</Button>
                            </Col>
                            <Col style={{textAlign: "center"}}>
                                <Button variant="primary" onClick={() => {props.raiseFunc(1,props.raiseAmt)}}>Call</Button>
                            </Col>
                        </Row>
                    </Modal>
                </Col>
            </Row>



        </>


    );

}