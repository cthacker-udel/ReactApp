import React from 'react';
import ReactDOM, { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'


class Board extends React.Component{

    render(){

        return(

            <Table striped bordered hover size="sm">

                <thead>
                    <tr>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                        <th>D</th>
                        <th>E</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            A1
                        </td>
                        <td>
                            B1
                        </td>
                        <td>
                            C1
                        </td>
                        <td>
                            D1
                        </td>
                        <td>
                            E1
                        </td>
                    </tr>
                    <tr>
                        <td>
                            A2
                        </td>
                        <td>
                            B2
                        </td>
                        <td>
                            C2
                        </td>
                        <td>    
                            D2
                        </td>
                        <td>
                            E2
                        </td>
                    </tr>
                    <tr>
                        <td>
                            A3
                        </td>
                        <td>
                            B3
                        </td>
                        <td>
                            C3
                        </td>
                        <td>
                            D3
                        </td>
                        <td>
                            E3
                        </td>
                    </tr>
                    <tr>
                        <td>
                            A4
                        </td>
                        <td>
                            B4
                        </td>
                        <td>
                            C4
                        </td>
                        <td>
                            D4
                        </td>
                        <td>
                            E4
                        </td>
                    </tr>
                    <tr>
                        <td>
                            A5
                        </td>
                        <td>
                            B5
                        </td>
                        <td>
                            C5
                        </td>
                        <td>
                            D5
                        </td>
                        <td>
                            E5
                        </td>
                    </tr>
                </tbody>

            </Table>

        );

    }

}


class MainPage extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(
            <>
            <Board />
            </>
        );

    }

}


ReactDOM.render(

    <React.StrictMode>

        <MainPage />

    </React.StrictMode>, document.getElementById('root')

);