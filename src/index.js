import React from 'react';
import ReactDOM, { render } from 'react-dom';


class MainPage extends React.Component{

    render(){

        return(
            <div>

                    <div className="shoppingcartDiv">
                        <ShoppingCart />
                    </div>
            </div>



        );

    }

}

class ShoppingCart extends React.Component{

    render(){

        return(

            <div className="shooping-list">

                <h1>This is a shoppingList</h1>
                <ul>

                    <li>Eggs</li>

                </ul>
                <CartButton />


            </div>


        );

    }


}

class CartButton extends React.Component{

    constructor(props){

        super(props);

        this.state = {

            value: "",

        }

    }

    render(){

        return(
            
                <button className="shoppingCartButton" height="200px" width="200px" onClick={() => {
                    
                        this.state.value = this.state.value + 'e';
                        console.log(this);
                        this.setState(this.state);
                    
                    }
                    
                }>
                    {this.state.value}
                </button>


        );


    }


}


ReactDOM.render(
    <React.StrictMode>
        <MainPage />
    </React.StrictMode>,
    document.getElementById('root')
);