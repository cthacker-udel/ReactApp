import React from 'react';
import ReactDOM, { render } from 'react-dom';


class MainPage extends React.Component{

    render(){

        return(
        
            <html>

                <head>

                    <link rel="stylesheet" href="indexstyle.css"></link>

                </head>

                <body>

                    <div className="shoppingCartDiv">

                        <ShoppingCart />
                        <CartText />
                        <CartButton />

                    </div>

                </body>

            </html>


        );

    }

}

function handleThePress(){

    let elem = <li>document.getElementById("cartText").value</li>;
    ShoppingCart.handlePress(elem);

}

var list = [];

class ShoppingCart extends React.Component{

    addItem(i){

        return <CartItem item={i} />

    }

    handlePress(thetext){

        this.list.push(thetext);
        console.log(`The list is : ${list}`);
        

    }

    render(){

        return(

            <div className="shooping-list">

                <h1>This is a shoppingList</h1>
                <ul>

                    {this.addItem('eggs')}

                </ul>


            </div>


        );

    }


}

class CartText extends React.Component{

    render(){

        return(

            <input type="text" id="cartText" height="200px" width="200px"/>

        );

    }

}

class CartButton extends React.Component{

    render(){

        return(
            
            <form>
                <button value="Add Item" onClick={handleThePress}>
                    Add Item
                </button>
            </form>


        );


    }


}


class CartItem extends React.Component{

    render(){

        return(

            <li>
                {this.props.item}
            </li>

        );

    }

}


ReactDOM.render(
    <React.StrictMode>
        <MainPage />
    </React.StrictMode>,
    document.getElementById('root')
);