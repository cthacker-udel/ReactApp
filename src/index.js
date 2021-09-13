import React from 'react';
import ReactDOM, { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


class LeftText extends React.Component{

    constructor(props){
        super(props);

        this.state = {

            value: 0,

        }

    }

    render(){
        
        return(
            <Form>

                <Form.Group className="leftText" controlId="rightoperand" onChange={this.props.onChange}>

                    <Form.Label>Left Number</Form.Label>
                    <Form.Control type="number" placeholder={this.props.val} name={this.props.name}></Form.Control>
                    <Form.Text>Left operand such as {this.props.val} + 10 = {Number(this.props.val) + 10}</Form.Text>

                </Form.Group>

            </Form>
        );

    }

}


class RightText extends React.Component{

    constructor(props){
        super(props);

    }

    render(){

        return(
            <Form>

                <Form.Group className="rightText" controlId="rightoperand" onChange={this.props.onChange}>

                    <Form.Label>Right Number</Form.Label>
                    <Form.Control type="number" placeholder={this.props.val} name={this.props.name}></Form.Control>
                    <Form.Text>Right operand such as 10 + {this.props.val} = {Number(this.props.val) + 10}</Form.Text>

                </Form.Group>

            </Form>
        );

    }

}


class EquateButton extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(
            <Button variant="success" style={{display: "block",margin: "auto"}}>Calculate</Button>
        );

    }

}

class OperandType extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(
            <>
            <Button variant="outline-dark" onClick={this.props.clickFunc} name="mult">Multiply</Button>
            <br></br>
            <Button variant="outline-dark" onClick={this.props.clickFunc} name="add">Add</Button>
            <br></br>
            <Button variant="outline-dark" onClick={this.props.clickFunc} name="sub">Subtract</Button>
            <br></br>
            <Button variant="outline-dark" onClick={this.props.clickFunc} name="divide">Divide</Button>
            <br></br>
            <Button variant="outline-dark" onClick={this.props.clickFunc} name="pow">Power</Button>
            </>

        );

    }

}

class CalculationResult extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(

            <Form>

                <Form.Group className="calcResult" controlId="basicCalcResultDisplay">

                    <Form.Label>Calculation Result</Form.Label>
                    <Form.Control type="text" placeholder="?"></Form.Control>
                    <Form.Text className="calculationText">
                        This displays the result of the calculation
                    </Form.Text>

                </Form.Group>

            </Form>

        );

    }

}


class MainPage extends React.Component{


    constructor(props){

        super(props);

        this.state = {

            result: "?",
            leftNum: 0,
            rightNum: 0,

        }

    }

    handleChange = (change,event) => {

        console.log(`change = ${change.target.value} and event = ${change.target.name}`);

        const theName = change.target.name;
        const theVal = change.target.value;

        console.log(`thename = ${theName}`);

        if(theName === "leftNum"){
            this.setState({leftNum: theVal});
        }
        else{
            this.setState({rightNum: theVal});
        }

        console.log(this.state);

    }

    handleClick = (event) => {

        console.log(event);
        console.log(`leftVal = ${this.state.leftVal} and rightVal = ${this.state.rightVal} and result = ${this.state.result}`);

        console.log(`name = ${event.target.name}`);

    }

    render(){

        return(
            
            <Container>
                <Row>
                    <Col>
                        <LeftText onChange={this.handleChange} name="leftNum" val={this.state.leftNum}/>
                    </Col>
                    <Col>
                        <RightText onChange={this.handleChange} name="rightNum" val={this.state.rightNum}/>
                    </Col>
                    <Col xs={4}>

                        <CalculationResult />

                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>

                        <EquateButton clickFunc={this.handleClick} />

                    </Col>
                </Row>
                <Row>

                    <Col>

                        <OperandType clickFunc={this.handleClick}/>

                    </Col>

                </Row>
            </Container>

        );

    }

}




ReactDOM.render(

    <React.StrictMode>

        <MainPage />

    </React.StrictMode>,
    document.getElementById('root')

);