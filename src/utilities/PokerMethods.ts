
/*

POKER METHODS

*/

export const royalFlush = (cards: string[]): boolean => {

    let suits = ['hearts','clubs','spades','diamonds'];
    let ranks = ['ace','king','queen','jack','ten'];

    let foundMatch = false;
    for(let i = 0; i < suits.length; i++){
        foundMatch = true;
        for(let j = 0; j < ranks.length; j++){

            if(cards.includes(`${ranks[j]}${suits[i]}`)){
                continue;
            }
            else{
                foundMatch = false;
                break;
            }

        }
        if(foundMatch){
            return true;
        }
    }
    return false;

}

export const sameSuit = (cards: string[]): boolean => {

    let iSuits = ['hearts','clubs','spades','diamonds'];

    interface suits {

        [index: string]: number
        'hearts': number
        'clubs': number
        'spades': number
        'diamonds': number

    }


    let theSuits: suits = {'hearts': 0, 'clubs': 0, 'spades': 0, 'diamonds': 0};

    for(let i = 0; i < cards.length; i++){

        for(let j of iSuits){
            if(cards[i].includes(j)){
                theSuits[j] += 1;
            }
        }

    }
    return Object.keys(theSuits).map(e => theSuits[e]).some(e => e >= 5);

}

export const consecutive = (cards: string[]): boolean => {

    interface ranks{

        [index: string]: number
        'ace': number
        'king': number
        'queen': number
        'jack': number
        'ten': number
        'nine': number
        'eight': number
        'seven': number
        'six': number
        'five': number
        'four': number
        'three': number
        'two': number

    }


    let theRanks: ranks = {'ace': 14, 'king': 13, 'queen': 12, 'jack': 11, 'ten': 10, 'nine': 9, 'eight': 8, 'seven': 7, 'six': 6, 'five': 5, 'four': 4, 'three': 3, 'two': 2};

    let theNumRanks: number[] = [];
    for(let i = 0; i < cards.length; i++){
        let theCard = cards[i];
        for(let j of Object.keys(theRanks)){
            if(theCard.includes(j)){
                theNumRanks.push(theRanks[j]);
                break;
            }
        }
    }

    theNumRanks.sort((a,b) => a-b);
    theNumRanks = [...new Set(theNumRanks)];
    let cnt = 0;
    for(let i = 0; i < theNumRanks.length-1; i++){

        let iRank = theNumRanks[i];
        let jRank = theNumRanks[i+1];
        if(Math.abs(iRank - jRank) === 1){
            cnt++;
        }
        else if(cnt === 4){
            return true;
        }
        else if(Math.abs(iRank - jRank) !== 1){
            cnt = 0;
        }

    }
    return false;

}

export const getCardRank = (card: string): number => {

    interface theRanks{

        [index: string]: number
        'ace': number
        'king': number
        'queen': number
        'jack': number
        'ten': number
        'nine': number
        'eight': number
        'seven': number
        'six': number
        'five': number
        'four': number
        'three': number
        'two': number

    }


    let ranks: theRanks = {'ace': 14, 'king': 13, 'queen': 12, 'jack': 11, 'ten': 10, 'nine': 9, 'eight': 8, 'seven': 7, 'six': 6, 'five': 5, 'four': 4, 'three': 3, 'two': 2};

    for(let i of Object.keys(ranks)){
        if(card.includes(i)){
            return ranks[i];
        }
    }
    return -1;

}

export const straightFlush = (cards: string[]): boolean => {

    if(!sameSuit(cards)){
        return false;
    }
    if(!consecutive(cards)){
        return false;
    }
    cards.sort((a,b) => getCardRank(a) - getCardRank(b));
    return true;



}

export const rankCount = (card: string,cards: string[]): number => {

    if(cards === undefined || card === undefined){
        return 0;
    }

    cards = cards.map(e => e.replace('hearts','').replace('spades','').replace('diamonds','').replace('clubs',''));

    card = card.replace('hearts','').replace('spades','').replace('diamonds','').replace('clubs','');

    return cards.filter(e => e === card).length;


}

export const fourOfAKind = (cards: string[]): boolean => {

    for(let eachcard of cards){

        let cnt = rankCount(eachcard,cards);
        if(cnt === 4){
            return true;
        }

    }
    return false;

}

export const fullHouse = (cards: string[]): boolean => {

    let found2kind = false;
    let found3kind = false;

    for(let eachcard of cards){

        let cnt = rankCount(eachcard,cards);
        if(cnt === 2){
            found2kind = true;
        }
        else if(cnt === 3){
            found3kind = true;
        }

    }
    return found2kind && found3kind;

}

export const flush = (cards: string[]): boolean => {

    return sameSuit(cards);

}

export const straight = (cards: string[]): boolean => {

    return consecutive(cards);

}

export const threeOfAKind = (cards: string[]): boolean => {

    for(let eachcard of cards){

        let res = rankCount(eachcard,cards);
        if(res === 3){
            return true;
        }

    }
    return false;

}

export const twoPairs = (cards: string[]): boolean => {

    let cnt = 0;
    let rankSet = new Set<string>();
    for(let eachcard of cards){

        let rank = eachcard.replace('hearts','').replace('spades','').replace('diamonds','').replace('clubs','');
        rankSet.add(rank);

    }
    for(let eachrank of [...rankSet]){

        let res = rankCount(eachrank,cards);
        if(res === 2){
            cnt++;
        }

    }
    return cnt === 2;

}

export const onePair = (cards: string[]): boolean => {

    for(let eachcard of cards){

        let rank = eachcard.replace('hearts','').replace('spades','').replace('diamonds','').replace('clubs','');
        if(rankCount(rank,cards) === 2){
            return true;
        }

    }
    return false;

}



export const cardCombos = (cards: string[]): number => {

    /*

        1 - royal flush
        2 - straight flush
        3 - four of a kind
        4 - full house
        5 - flush
        6 - straight
        7 - three of a kind
        8 - two pairs

    */

    let res = 0;

    if(royalFlush(cards)){
        res = 1;
    }
    else if(straightFlush(cards)){
        res = 2;
    }
    else if(fourOfAKind(cards)){
        res = 3;
    }
    else if(fullHouse(cards)){
        res = 4;
    }
    else if(flush(cards)){
        res = 5;
    }
    else if(straight(cards)){
        res = 6;
    }
    else if(threeOfAKind(cards)){
        res = 7;
    }
    else if(twoPairs(cards)){
        res = 8;
    }
    else if(onePair(cards)){
        res = 9;
    }
    return res;

}

const getHighCard = (hand: string[]): number => {

    return hand.map(e => getCardRank(e)).sort((a,b) => a-b)[hand.length-1];

}


/*

    POKER METHODS

*/

/* from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array [first answer] */
export const shuffle = (array: string[]): string[] => {

    for(let i = 0; i < 10; i++){
        var currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }
    return array;
}

export const isPrime = (num: number): boolean => {
    if(num < 2){
        return true;
    }
    else if(num < 0){
        return false;
    }
    else if(num === 2 || num === 3 || num === 5){
        return true;
    }
    else{
        for(let i = 2; i <= Math.ceil(Math.sqrt(num)); i++){
            if(num % i === 0){
                return false;
            }
        }
        return true;
    }
}

export const computerDecide = (userCards: string[], computerCards: string[], tableCards: string[]): number => {

    /*

    1) Call
    2) Raise
    3) Fold

    */

    let computerHandRank = cardCombos([...computerCards,...tableCards]);
    let playerHandRank = cardCombos([...userCards,...tableCards]);
    let randomNumber: number = Math.floor((Math.random()*100)) % Math.floor(Math.random() * 10000);

    if(computerHandRank === 0){

        // check if high card is better than theirs if not, fold
        if(playerHandRank !== 0){
            // fold
            return 2;
        }
        else{
            let compHighCard: number = getHighCard([...computerCards,...tableCards]);
            let playerHighCard: number = getHighCard([...userCards,...tableCards]);
            if(compHighCard > playerHighCard){
                // call
                return 1;
            }
            else if(isPrime(randomNumber)){
                // fold
                return 3;
            }
            else{
                return 1;
            }
        }

    }
    else{

        if(computerHandRank > playerHandRank){
            // determine whether to call or raise
            if(randomNumber % 2 === 0){
                // call
                return 1;
            }
            else{
                // raise
                return 2;
            }
        }
        else if(computerHandRank === playerHandRank){

            if(randomNumber % 2 === 0){
                // call
                return 1;
            }
            else if(randomNumber % 2 !== 0){
                // raise
                return 2;
            }
            else if(isPrime(randomNumber)){
                // fold
                return 3;
            }
            else{
                return 1;
            }

        }

    }

    return -1;

}

export const computerDecideRaised = (userCards: string[], computerCards: string[], tableCards: string[]): number => {

    /*

    1) Call
    2) Raise
    3) Fold

    */

    let computerHandRank = cardCombos([...computerCards,...tableCards]);
    let playerHandRank = cardCombos([...userCards,...tableCards]);
    let randomNumber: number = Math.floor((Math.random()*100)) % Math.floor(Math.random() * 10000);

    if(computerHandRank === 0){

        // check if high card is better than theirs if not, fold
        if(playerHandRank !== 0){
            // fold
            return 2;
        }
        else{
            let compHighCard: number = getHighCard([...computerCards,...tableCards]);
            let playerHighCard: number = getHighCard([...userCards,...tableCards]);
            if(compHighCard > playerHighCard){
                // call
                return 1;
            }
            else if(isPrime(randomNumber)){
                // fold
                return 3;
            }
            else{
                return 1;
            }
        }

    }
    else{

        if(computerHandRank > playerHandRank){
            // determine whether to call or raise
            if(randomNumber % 2 === 0){
                // call
                return 1;
            }
            else{
                // fold
                return 3;
            }
        }
        else if(computerHandRank === playerHandRank){

            if(randomNumber % 2 === 0){
                // call
                return 1;
            }
            else if(randomNumber % 2 !== 0){
                // call
                return 1;
            }
            else if(isPrime(randomNumber)){
                // fold
                return 3;
            }
            else{
                return 1;
            }

        }

    }

    return -1;

}
