import React from 'react';
import ReactDOM, { render } from 'react-dom';


class MainPage extends React.Component{

    render(){

        return(
            <div>

                    <div>
                        <ShoppingCart />
                    </div>
            </div>



        );

    }

}

class ShoppingCartText extends React.Component{

    constructor(props){

        super(props);

        this.state = {

            value: '',

        }

    }

    render(){
        
        console.log(`textbox = ${this}`);
        return(

            <input type="text" height="500px" width="500px" onChange={this.props.handleChange}/>

        );

    }

}

class ShoppingCartItem extends React.Component{

    constructor(props){

        super(props);

    }

}

class ShoppingCartButton extends React.Component{

    constructor(props){

        super(props);

    }

    render(){
        return(

        <button height="200px" width="200px" onClick={this.props.handleClick}>

            {this.props.value}

        </button>

        );
    }

}

class ShoppingCart extends React.Component{

    constructor(props){
        super(props);

        this.state = {

            items: [],
            textValue: '',

        };

    }

    handleChange = (event) => {

        console.log(event.target.value); // textbox value
        this.setState({textValue: event.target.value});
        console.log(this);

    }

    handleClick = (event) => {

        console.log(event);
        console.log(`textval11 = ${this.state.textValue}`);
        if(this.state.textValue === ''){
            // nothing is entered
            return;
        }
        else{
            this.setState({items: this.state.items.concat(this.state.textValue)});
            this.setState({textValue: ''});
        }

    }

    render(){

        const listItems = this.state.items.map(e => {
            
                return(

                    <li key={e}>{e}</li>

                );
            }
            
        );

        return(

            <div className="ShoppingCartList">
                <h1>Shopping Cart List</h1>
                <ol>

                    {listItems}

                </ol>
                <ShoppingCartText handleChange={this.handleChange}/>
                <br />
                <ShoppingCartButton value={'Add an item'} handleClick={this.handleClick}/>

            </div>


        );

    }


}



ReactDOM.render(
    <React.StrictMode>
        <MainPage />
    </React.StrictMode>,
    document.getElementById('root')
);