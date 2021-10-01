import { useState } from 'react';
import {Modal,Button,Form} from 'react-bootstrap';

export const RaiseSend = (props: {appear: boolean, playerChips: number, raiseFunc: (amt: number) => void}): JSX.Element => {

    const [chipAmount,setChipAmount] = useState<string>("0");

    return(

        <>

            <Modal show={props.appear} onHide={() => {console.log(`calling onHide`)}}>
                <Modal.Header>
                    Raise Demand
                </Modal.Header>
                <Modal.Body>
                    Input amount to raise
                </Modal.Body>
                <Modal.Footer>

                    <Form>

                        <Form.Group className="raiseText" controlId="raiseAmt">
                            <Form.Label>Number of Chips to Raise [Current Amount : ${props.playerChips}</Form.Label>
                            <Form.Control type="text" value={chipAmount} placeholder={"0"} name={"raiseForm"}  onChange={(e) => {


                                    let htmlInputElement = e.target as HTMLInputElement;

                                    let value: number = parseInt(htmlInputElement.value);
                                
                                    if(isNaN(value)){
                                        let tmpChipAmount = chipAmount;
                                        tmpChipAmount = tmpChipAmount.substring(0,tmpChipAmount.length-1);
                                        setChipAmount(tmpChipAmount);
                                    }
                                    else{
                                        if(value > props.playerChips){
                                            console.log(`chip amount = ${props.playerChips} and value = ${value}`);
                                            alert('Not allowed to go above current chip amount');
                                            let amt: number = parseInt(chipAmount) -1;
                                            setChipAmount(String(amt));
                                        }                                  
                                        else if(value < 0){
                                            alert('Not allowed to raise negative chips');
                                            setChipAmount("0");
                                        }
                                        else{
                                            setChipAmount(String(value));
                                        }
                                    }
                                }}>
                            </Form.Control>
                            <Form.Text>Raise amount goes above ^^</Form.Text>
                        </Form.Group>

                    </Form>
                    <Button variant="primary" onClick={() => {props.raiseFunc(parseInt(chipAmount))}}>Raise Amount</Button>
                </Modal.Footer>
            </Modal>


        </>


    );

}