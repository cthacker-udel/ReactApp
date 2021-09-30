import Image from 'react-bootstrap/Image';

export function PokerCard(props: {cardName: string}): JSX.Element{

    return(

        
        <Image src={`${process.env.PUBLIC_URL}/assets/cards/${props.cardName}.PNG`} style={{height: "100px", width: "100px"}} rounded />


    );


}