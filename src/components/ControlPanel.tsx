import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export const ControlPanel = (props: {theTurn: boolean}): JSX.Element => {

    return(
    <>
        <Row>
            <Col>
                <Button variant={props.theTurn? "primary": "secondary"} style={{margin: "auto", display: "block", textAlign: "center"}}>Fold</Button>
            </Col>
            <Col>
                <Button variant={props.theTurn? "primary": "secondary"} style={{margin: "auto", display: "block", textAlign: "center"}}>Raise</Button>
            </Col>
            <Col>
                <Button variant={props.theTurn? "primary": "secondary"} style={{margin: "auto", display: "block", textAlign: "center"}}>Call</Button>
            </Col>
        </Row>
    </>
    );

}