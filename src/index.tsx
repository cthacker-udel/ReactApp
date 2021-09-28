import React, {useState} from 'react';
import ReactDOM, { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

                                                                    
function LeftText(props: {val: number, name: string, onChange: React.FormEventHandler<HTMLElement>}): JSX.Element{

    return(


        <Form>

                <Form.Group className="leftText" controlId="rightoperand" onChange={props.onChange}>

                    <Form.Label>Left Number</Form.Label>
                    <Form.Control type="number" placeholder={String(props.val)} name={props.name}></Form.Control>
                    <Form.Text>Left operand such as {props.val} + 10 = {Number(props.val) + 10}</Form.Text>

                </Form.Group>

        </Form>


    );

}

function RightText(props: {val: number, name: string, onChange: React.FormEventHandler<HTMLElement>}): JSX.Element{
    // TODO: DECONSTRUCT PROPS TYPE
    return(
        <Form>

            <Form.Group className="rightText" controlId="rightoperand" onChange={props.onChange}>

                <Form.Label>Right Number</Form.Label>
                <Form.Control type="number" placeholder={String(props.val)} name={props.name}></Form.Control>
                <Form.Text>Right operand such as 10 + {props.val} = {Number(props.val) + 10}</Form.Text>

            </Form.Group>

        </Form>
        );

}

function OperandType(props: {clickFunc: React.FormEventHandler<HTMLElement>}): JSX.Element{
    // TODO: DECONSTRUCT PROPS TYPE
    return(
    
        <ButtonGroup vertical style={{textAlign: "center",display: "block",margin: "auto"}}>

            <Button variant="outline-dark" onClick={props.clickFunc} name="mult">Multiply</Button>
            <Button variant="outline-dark" onClick={props.clickFunc} name="add" >Add</Button>
            <Button variant="outline-dark" onClick={props.clickFunc} name="sub" >Subtract</Button>
            <Button variant="outline-dark" onClick={props.clickFunc} name="divide" >Divide</Button>
            <Button variant="outline-dark" onClick={props.clickFunc} name="pow" >Power</Button>
            <Button variant="outline-dark" onClick={props.clickFunc} name="bit&">Bitwise AND</Button>
            <Button variant="outline-dark" onClick={props.clickFunc} name="bit|">Bitwise OR</Button>
            <Button variant="outline-dark" onClick={props.clickFunc} name="bit^">Bitwise XOR</Button>
            

        </ButtonGroup>


    );


}

function ClearButton(props: {clickFunc: React.FormEventHandler<HTMLElement>}): JSX.Element{
    // TODO: DECONSTRUCT PROPS TYPE

    return(

        <>
            <Button variant="outline-danger" onClick={props.clickFunc}>Clear History</Button>
        </>

    );


}

function HistoryItem(props: {historyResult: string}): JSX.Element{
    // TODO: DECONSTRUCT PROPS TYPE
    return(
        
        <ListGroup.Item>{props.historyResult}</ListGroup.Item>

    );

}


function CalculationResult(props: {val: number}): JSX.Element{
    // TODO: DECONSTRUCT PROPS TYPE
    return(

        <Form>

            
            <Form.Group className="calcResult" controlId="basicCalcResultDisplay">
                <Form.Label>Calculation Result</Form.Label>
                <Form.Control type="text" placeholder={String(props.val)} readOnly></Form.Control>
                <Form.Text className="calculationText">
                    This displays the result of the calculation
                </Form.Text>
            </Form.Group>


        </Form>


    );

}

function MainPage(): JSX.Element{
    // TODO: DEFINE PROPS
    const [result,setResult] = useState<number>(0);
    const [leftNum,setLeftNum] = useState<number>(0);
    const [rightNum,setRightNum] = useState<number>(0);
    const [history,setHistory]: [string[],(s:string[]) => void] = useState<string[]>([]);


    const clearHistory = () => {

        setHistory([]);

    }

    const handleChange = (change: React.ChangeEvent<HTMLElement>): void => {

        let changedElement = change.target as HTMLInputElement;

        console.log(`change = ${changedElement.value} and event = ${changedElement.name}`);

        const theName = changedElement.name;
        const theVal = parseInt(changedElement.value);

        console.log(`thename = ${theName}`);

        if(theName === "leftNum"){
            setLeftNum(theVal);
        }
        else{
            setRightNum(theVal);
        }

    }

    const handleClick = (event: React.ChangeEvent<HTMLElement>): void => {

        console.log(event);
        console.log(`leftVal = ${leftNum} and rightVal = ${rightNum} and result = ${result}`);

        let changedElement = event.target as HTMLInputElement;


        console.log(`name = ${changedElement.name}`);
        
        if(changedElement.name === "bit^"){

            const res = leftNum ^ rightNum;
            setResult(res);
            setHistory(history.concat(`${leftNum} ^ ${rightNum} = ${res}`));

        }
        else if(changedElement.name === "bit&"){

            const res = leftNum & rightNum;
            setResult(res);
            setHistory(history.concat(`${leftNum} & ${rightNum} = ${res}`));

        }
        else if(changedElement.name === "bit|"){

            const res = leftNum | rightNum;
            setResult(res);
            setHistory(history.concat(`${leftNum} | ${rightNum} = ${res}`));

        }
        else if(changedElement.name === "mult"){
            // multiply
            const res = +leftNum * +rightNum;
            setResult(res);
            setHistory(history.concat(`${leftNum} * ${rightNum} = ${res}`));
        }
        else if(changedElement.name === "add"){
            // addition
            const res = +leftNum + +rightNum;
            setResult(res);
            setHistory(history.concat(`${leftNum} + ${rightNum} = ${res}`));
        }
        else if(changedElement.name === "divide"){
            // divide
            if(rightNum === 0){
                const res = "NaN";
                setResult(parseInt(res));
                setHistory(history.concat(`${leftNum} / ${rightNum} = ${res}`));
            }
            else{
                const res = +leftNum / +rightNum;
                setResult(res);
                setHistory(history.concat(`${leftNum} / ${rightNum} = ${res}`));
            }
        }
        else if(changedElement.name === "sub"){
            // subtraction
            const res = +leftNum - +rightNum;
            setResult(res);
            setHistory(history.concat(`${leftNum} - ${rightNum} = ${res}`));
        }
        else if(changedElement.name === "pow"){
            // power
            const res = Number(leftNum) ** +rightNum;
            setResult(res);
            setHistory(history.concat(`${leftNum} ^ ${rightNum} = ${res}`));
        }

    }

    return(

        <Container>
                <Row>
                    <Col>
                        <LeftText onChange={handleChange} name="leftNum" val={leftNum}/>
                    </Col>
                    <Col>
                        <RightText onChange={handleChange} name="rightNum" val={rightNum}/>
                    </Col>
                    <Col xs={4}>

                        <CalculationResult val={result}/>

                    </Col>
                </Row>
                <br></br>
                <Row style={{textAlign: "center",margin: "auto",display: "block"}}>

                    <Col>

                        <OperandType clickFunc={handleClick}/>

                    </Col>

                </Row>
                <br />
                <Row style={{textAlign: "center",margin: "auto",display: "block"}}>
                    <Col>

                        <ClearButton clickFunc={clearHistory} />

                    </Col>
                </Row>
                <br />
                <Row>

                    <Col>
                        <Badge bg="primary" style={{textAlign: "center",margin: "auto",display: "block"}}>History</Badge>
                        <ListGroup>

                            {history.map(e => {

                                return(

                                    <HistoryItem historyResult={e} key={e}/>

                                );

                            })}

                        </ListGroup>

                    </Col>

                </Row>
            </Container>


    );


}


ReactDOM.render(

    <React.StrictMode>

        <MainPage />

    </React.StrictMode>,
    document.getElementById('root')

);
