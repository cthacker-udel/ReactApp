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
    }

    render(){
        
        return(
            <Form>

                <Form.Group className="leftText" controlId="rightoperand">

                    <Form.Label>Left Number</Form.Label>
                    <Form.Control type="number" placeholder="0"></Form.Control>
                    <Form.Text>This is the left operand such as ? + 10 = ?</Form.Text>

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

                <Form.Group className="rightText" controlId="rightoperand">

                    <Form.Label>Right Number</Form.Label>
                    <Form.Control type="number" placeholder="0"></Form.Control>
                    <Form.Text>This is the right operand such as 10 + ? = ?</Form.Text>

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
            <Button variant="outline-dark">Multiply</Button>
            <br></br>
            <Button variant="outline-dark">Add</Button>
            <br></br>
            <Button variant="outline-dark">Subtract</Button>
            <br></br>
            <Button variant="outline-dark">Divide</Button>
            <br></br>
            <Button variant="outline-dark">Power</Button>
            </>

        );

    }

}


class MainPage extends React.Component{

    render(){

        return(
            
            <Container>
                <Row>
                    <Col>
                        <LeftText />
                    </Col>
                    <Col>
                        <RightText />
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <EquateButton />

                    </Col>
                </Row>
                <Row>

                    <Col>

                        <OperandType />

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