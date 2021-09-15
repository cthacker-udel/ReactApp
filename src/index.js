import React, {useState} from 'react';
import ReactDOM, { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { isTrivialHref } from '@restart/ui/esm/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function LeftText(props){

    return(


        <Form>

                <Form.Group className="leftText" controlId="rightoperand" onChange={props.onChange}>

                    <Form.Label>Left Number</Form.Label>
                    <Form.Control type="number" placeholder={props.val} name={props.name}></Form.Control>
                    <Form.Text>Left operand such as {props.val} + 10 = {Number(props.val) + 10}</Form.Text>

                </Form.Group>

        </Form>


    );

}

function RightText(props){

    return(
        <Form>

            <Form.Group className="rightText" controlId="rightoperand" onChange={props.onChange}>

                <Form.Label>Right Number</Form.Label>
                <Form.Control type="number" placeholder={props.val} name={props.name}></Form.Control>
                <Form.Text>Right operand such as 10 + {props.val} = {Number(props.val) + 10}</Form.Text>

            </Form.Group>

        </Form>
        );

}

function EquateButton(props){


    return(

        <Button variant="success" stlye={{display: "block",margin: "auto",textAlign: "center"}}>Calculate</Button>

    );


}

function OperandType(props){

    return(
    
        <ButtonGroup vertical>

            <Button variant="outline-dark" onClick={props.clickFunc} name="mult">Multiply</Button>
            <br></br>
            <Button variant="outline-dark" onClick={props.clickFunc} name="add">Add</Button>
            <br></br>
            <Button variant="outline-dark" onClick={props.clickFunc} name="sub">Subtract</Button>
            <br></br>
            <Button variant="outline-dark" onClick={props.clickFunc} name="divide">Divide</Button>
            <br></br>
            <Button variant="outline-dark" onClick={props.clickFunc} name="pow">Power</Button>
            

        </ButtonGroup>


    );


}


function CalculationResult(props){

    return(

        <Form>

            
            <Form.Group className="calcResult" controlId="basicCalcResultDisplay">

                <Form.Label>Calculation Result</Form.Label>
                <Form.Control type="text" placeholder={props.val}></Form.Control>
                <Form.Text className="calculationText">
                    This displays the result of the calculation
                </Form.Text>

            </Form.Group>


        </Form>


    );

}

function MainPage(props){

    const [result,setResult] = useState(0);
    const [leftNum,setLeftNum] = useState(0);
    const [rightNum,setRightNum] = useState(0);
    const [history,setHistory] = useState([]);

    const handleChange = (change,event) => {

        console.log(`change = ${change.target.value} and event = ${change.target.name}`);

        const theName = change.target.name;
        const theVal = change.target.value;

        console.log(`thename = ${theName}`);

        if(theName === "leftNum"){
            setLeftNum(theVal);
        }
        else{
            setRightNum(theVal);
        }

    }

    const handleClick = (event) => {

        console.log(event);
        console.log(`leftVal = ${leftNum} and rightVal = ${rightNum} and result = ${result}`);

        console.log(`name = ${event.target.name}`);

        if(event.target.name === "mult"){
            // multiply
            const res = +leftNum * +rightNum;
            setResult(res);
        }
        else if(event.target.name === "add"){
            // addition
            const res = +leftNum + +rightNum;
            setResult(res);
        }
        else if(event.target.name === "divide"){
            // divide
            if(rightNum === 0){
                const res = "NaN";
                setResult(res);
            }
            else{
                const res = +leftNum / +rightNum;
                setResult(res);
            }
        }
        else if(event.target.name === "sub"){
            // subtraction
            const res = +leftNum - +rightNum;
            setResult(res);
        }
        else if(event.target.name === "pow"){
            // power
            const res = Number(leftNum) ** +rightNum;
            setResult(res);
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
                <Row>
                    <Col>

                        <EquateButton clickFunc={handleClick} />

                    </Col>
                </Row>
                <Row>

                    <Col>

                        <OperandType clickFunc={handleClick}/>

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
