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
    const [team,setTeam] = useState("");

    const clickFunc = (event) => {

        console.log(event.target.name);
        console.log(hasClicked);

        if(!hasClicked){
            setHasClicked(!hasClicked);
            if(!props.theTurn){
                // players turn
                setTheVariant('success');
                setTeam("1");
            }
            else{
                // computers turn
                setTheVariant('danger');
                setTeam("2");
            }
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

    const [choices,setChoices] = useState([['A1','B1','C1','D1','E1','F1'],['A2','B2','C2','D2','E2','F2'],['A3','B3','C3','D3','E3','F3'],['A4','B4','C4','D4','E4','F4'],['A5','B5','C5','D5','E5','F5']]);
    const [turn,setTurn] = useState(false); // false <-- user turn, true <--- player turn
    const [theBoard,setBoard] = useState([['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']]);


    const verifyWinner = (board) => {

        // diagonal check
        let playerList = [];
        for(let i = 0; i < theBoard.length; i++){

            for(let j = 0; j < theBoard.length; j++){

                // picks coordinates, then check from the coords
                /*
                            --- diagonals ---

                    1) topleft ---> bottom right
                    2) topright --> bottom left

                            --- compass directions ---

                    1) up
                    2) down
                    3) right
                    4) left

                */

                // [2][2] --> [3][1] --> [4][0]
                for(let k = i, l = j; k < theBoard.length && l < theBoard.length; k++, l++){

                    if(theBoard[k][l] !== ''){
                        playerList.push(theBoard[k][l]);
                    }
                    if(new Set(playerList).size > 1){
                        break;
                    }

                }
                if(new Set(playerList).size === 1 && playerList.length >= 4){
                    alert(`Player ${playerList[0]} wins!`);
                    return;
                }
                playerList = [];

                for(let x = i, y = j; x < theBoard.length && y >= 0; x++, y--){

                    if(theBoard[x][y] !== ''){
                        playerList.push(theBoard[x][y]);
                    }
                    if(new Set(playerList).size > 1){
                        break;
                    }

                }
                if(new Set(playerList).size === 1 && playerList.length >= 4){
                    alert(`Player ${playerList[0]} wins!`);
                    return;
                }
                playerList = [];

                // up --> [1][1] --> [0][1]


                for(let x = i; x >= 0; x--){

                    if(theBoard[x][j] !== ''){
                        playerList.push(theBoard[x][j]);
                    }
                    if(new Set(playerList).size > 1){
                        break;
                    }

                }
                if(new Set(playerList).size === 1 && playerList.length >= 4){
                    alert(`Player ${playerList[0]} wins!`);
                    return;
                }
                playerList = [];


                // right --> [1][1] --> [1][2]

                for(let y = j; y < theBoard.length; y++){

                    if(theBoard[i][y] !== ''){
                        playerList.push(theBoard[i][y]);
                    }
                    if(new Set(playerList).size > 1){
                        break;
                    }

                }
                if(new Set(playerList).size === 1 && playerList.length >= 4){
                    alert(`Player ${playerList[0]} wins!`);
                    return;
                }
                playerList = [];

                // down --> [1][1] --> [2][1]

                for(let x = i; x < theBoard.length; x++){

                    if(theBoard[x][j] !== ''){
                        playerList.push(theBoard[x][j]);
                    }
                    if(new Set(theBoard).size > 1){
                        break;
                    }

                }
                if(new Set(playerList).size === 1 && playerList.length >= 4){
                    alert(`Player ${playerList[0]} wins!`);
                    return;
                }
                playerList = [];


                // left --> [1][1] ---> [1][0]


                for(let y = j; y >= 0; y--){

                    if(theBoard[i][y] !== ''){
                        playerList.push(theBoard[i][y]);
                    }
                    if(new Set(theBoard).size > 1){
                        break;
                    }

                }
                if(new Set(playerList).size === 1 && playerList.length >= 4){
                    alert(`Player ${playerList[0]} wins!`);
                    return;
                }


                alert(`No winners detected`);
                return;

            }

        }


    }


    const generateButton = (value) => {

        return(

            <BoardButton theName={value} theTurn={turn} setTheTurn={setTurn}>{value}</BoardButton>

        );

    }

    return(
        <>
            <Row>
                <Col style={{textAlign: "center"}}>
                    <h2><Badge pill bg="secondary">Connect-4</Badge></h2>
                </Col>
            </Row>
            <Row>
                <Col>
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
                                <th>
                                    E
                                </th>
                                <th>
                                    F
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
                                <td>{generateButton(choices[0][4])}</td>
                                <td>{generateButton(choices[0][5])}</td>
                            </tr>
                            <tr style={{height: "200px"}}>
                                <td style={{width: "10px"}}><Badge pill bg="primary">Column 2</Badge></td>
                                <td>{generateButton(choices[1][0])}</td>
                                <td>{generateButton(choices[1][1])}</td>
                                <td>{generateButton(choices[1][2])}</td>
                                <td>{generateButton(choices[1][3])}</td>
                                <td>{generateButton(choices[1][4])}</td>
                                <td>{generateButton(choices[1][5])}</td>
                            </tr>
                            <tr style={{height: "200px"}}>
                            <td style={{width: "10px"}}><Badge pill bg="primary">Column 3</Badge></td>
                                <td>{generateButton(choices[2][0])}</td>
                                <td>{generateButton(choices[2][1])}</td>
                                <td>{generateButton(choices[2][2])}</td>
                                <td>{generateButton(choices[2][3])}</td>
                                <td>{generateButton(choices[2][4])}</td>
                                <td>{generateButton(choices[2][5])}</td>
                            </tr>
                            <tr style={{height: "200px"}}>
                            <td style={{width: "10px"}}><Badge pill bg="primary">Column 4</Badge></td>
                                <td>{generateButton(choices[3][0])}</td>
                                <td>{generateButton(choices[3][1])}</td>
                                <td>{generateButton(choices[3][2])}</td>
                                <td>{generateButton(choices[3][3])}</td>
                                <td>{generateButton(choices[3][4])}</td>
                                <td>{generateButton(choices[3][5])}</td>
                            </tr>
                            <tr style={{height: "200px"}}>
                            <td style={{width: "10px"}}><Badge pill bg="primary">Column 5</Badge></td>
                                <td>{generateButton(choices[4][0])}</td>
                                <td>{generateButton(choices[4][1])}</td>
                                <td>{generateButton(choices[4][2])}</td>
                                <td>{generateButton(choices[4][3])}</td>
                                <td>{generateButton(choices[4][4])}</td>
                                <td>{generateButton(choices[4][5])}</td>
                            </tr>


                        </tbody>


                    </Table>
                </Col>
            </Row>
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