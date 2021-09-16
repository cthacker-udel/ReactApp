import React, {useState} from 'react';
import ReactDOM, { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge'


function BoardButton(props){

    const [hasClicked,setHasClicked] = useState(false);
    const [theVariant,setTheVariant] = useState('outline-primary');

    const clickFunc = (event) => {

        console.log(event.target.name);
        console.log(hasClicked);

        if(!hasClicked){
            setHasClicked(!hasClicked);
            if(!props.theTurn){
                // players turn
                setTheVariant('outline-success');
            }
            else{
                // computers turn
                setTheVariant('outline-danger');
            }
            const theDoc = document.getElementById(event.target.name);
            console.log(theDoc);
            console.log(`the turn = ${props.theTurn? "computers": "players"}`);
            props.setTheTurn(!props.theTurn);
        }
        else{
            alert('Button has already been clicked');
        }

    }


    return(

        <Button variant={theVariant} name={props.theName} onClick={clickFunc} id={props.theName}>{props.theName}</Button>

    );

}

function Board(){

    //[['A1','B1','C1','D1'],['A2','B2','C2','D2'],['A3','B3','C3','D3'],['A4','B4','C4','D4'],['A5','B5','C5','D5']]

    const [choices,setChoices] = useState([['A1','B1','C1','D1'],['A2','B2','C2','D2'],['A3','B3','C3','D3'],['A4','B4','C4','D4'],['A5','B5','C5','D5']]);
    const [turn,setTurn] = useState(false); // false <-- user turn, true <--- player turn


    const generateButton = (value) => {

        return(

            <BoardButton theName={value} theTurn={turn} setTheTurn={setTurn}>{value}</BoardButton>

        );

    }

    return(
        <>
            <Table striped bordered hover>

                <thead>
                    <tr style={{textAlign: "center"}}>
                        <th>
                            Column
                        </th>
                        <th>
                            A
                        </th>
                        <th>
                            B
                        </th>
                        <th>
                            C
                        </th>
                        <th>
                            D
                        </th>
                    </tr>
                </thead>
                <tbody style={{textAlign: "center"}}>

                    <tr style={{height: "200px"}}>
                        <td style={{width: "10px"}}><Badge pill bg="primary">Column 1</Badge></td>
                        <td>{generateButton(choices[0][0])}</td>
                        <td>{generateButton(choices[0][1])}</td>
                        <td>{generateButton(choices[0][2])}</td>
                        <td>{generateButton(choices[0][3])}</td>
                    </tr>
                    <tr style={{height: "200px"}}>
                        <td style={{width: "10px"}}><Badge pill bg="primary">Column 2</Badge></td>
                        <td>{generateButton(choices[1][0])}</td>
                        <td>{generateButton(choices[1][1])}</td>
                        <td>{generateButton(choices[1][2])}</td>
                        <td>{generateButton(choices[1][3])}</td>
                    </tr>
                    <tr style={{height: "200px"}}>
                    <td style={{width: "10px"}}><Badge pill bg="primary">Column 3</Badge></td>
                        <td>{generateButton(choices[2][0])}</td>
                        <td>{generateButton(choices[2][1])}</td>
                        <td>{generateButton(choices[2][2])}</td>
                        <td>{generateButton(choices[2][3])}</td>
                    </tr>
                    <tr style={{height: "200px"}}>
                    <td style={{width: "10px"}}><Badge pill bg="primary">Column 4</Badge></td>
                        <td>{generateButton(choices[3][0])}</td>
                        <td>{generateButton(choices[3][1])}</td>
                        <td>{generateButton(choices[3][2])}</td>
                        <td>{generateButton(choices[3][3])}</td>
                    </tr>
                    <tr style={{height: "200px"}}>
                    <td style={{width: "10px"}}><Badge pill bg="primary">Column 5</Badge></td>
                        <td>{generateButton(choices[4][0])}</td>
                        <td>{generateButton(choices[4][1])}</td>
                        <td>{generateButton(choices[4][2])}</td>
                        <td>{generateButton(choices[4][3])}</td>
                    </tr>


                </tbody>


            </Table>
        </>

    );


}


function MainPage(){

    return(
        <>
            <Board />
        </>

    );



}


ReactDOM.render(

    <React.StrictMode>

        <MainPage />

    </React.StrictMode>,document.getElementById('root')


);