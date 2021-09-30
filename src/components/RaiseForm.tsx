import {Form,Button} from 'react-bootstrap';

export const RaiseForm = (props: {appear: boolean}): JSX.Element => {

    if(props.appear){

        return(

            <Form>
                <Form.Group className="mb-3" controlId="formRaise">
                    <Form.Label>How much do you want to raise by?</Form.Label>
                    <Form.Control type="number" placeholder="0" />
                    <Form.Text>Enter amount above</Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={() => {console.log('hello')}}>Click here</Button>
            </Form>

        );
    }
    else{
        return(
        <>
        
        </>
        );
    }

}