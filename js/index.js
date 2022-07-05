/*
1. Make a function that decideds who's turn it is
    a. should disable other player from making moves when not their turn
    b. The state of the board should be displayed by the announcer (ex: "white turn", "black turn", "white victory")

2. Add a piece collection tray for "killed" pieces respectivly for their color
    a. white tray will display on the right side of board and left will display black

3. Add "promotion" a pawns ability to change to any other piece once it reaches the opposite side of the board
    a. can turn into any piece accept for a pawn or king

4. Add "En passant" Basically if a pawn moves two squares on its starting move and is adjacent to another pawn
the opposing pawn can make a diagonal move behind the pawn and capture it.

5. Add "check" and "checkmate"
*/
//Global variables
var currentMoveSet;
var currenttile;
var currentPieceSelected;

//For Castling
var numOfWhiteKingMoves = 0;
var numOfBlackKingMoves = 0;
var numOfWhiteRook1Moves = 0;
var numOfWhiteRook2Moves = 0;
var numOfBlackRook1Moves = 0;
var numOfBlackRook2Moves = 0;

//For En passant
var whitePawn1Moves = 0;
var whitePawn2Moves = 0;
var whitePawn3Moves = 0;
var whitePawn4Moves = 0;
var whitePawn5Moves = 0;
var whitePawn6Moves = 0;
var whitePawn7Moves = 0;
var whitePawn8Moves = 0;

var blackPawn1Moves = 0;
var blackPawn2Moves = 0;
var blackPawn3Moves = 0;
var blackPawn4Moves = 0;
var blackPawn5Moves = 0;
var blackPawn6Moves = 0;
var blackPawn7Moves = 0;
var blackPawn8Moves = 0;

//Array of all tiles
const allTiles = 
['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8']

 //Array of all pieces
 const allPieces = 
 ['white-pawn-1', 'white-pawn-2', 'white-pawn-3', 'white-pawn-4', 'white-pawn-5', 'white-pawn-6', 'white-pawn-7', 'white-pawn-8', 'white-rook-1', 'white-rook-2', 'white-horse-1', 'white-horse-2', 'white-bishop-1', 'white-bishop-2', 'white-queen', 'white-king', 
 'black-pawn-1', 'black-pawn-2', 'black-pawn-3', 'black-pawn-4', 'black-pawn-5', 'black-pawn-6', 'black-pawn-7', 'black-pawn-8', 'black-rook-1', 'black-rook-2', 'black-horse-1', 'black-horse-2', 'black-bishop-1', 'black-bishop-2', 'black-queen', 'black-king']
 
 //Turns valid tiles orange that can be moved to
function displayValidMoves(moveSet){
    currentMoveSet = moveSet;
    //turns all possible move locations orange
    for(i = 0; i < moveSet.length; i++){
        document.getElementById(moveSet[i]).classList.add('possibleMove');    
    }
    //removes "checkTileAndGetMoveSet(id)" and adds "getPlayerMove(id)" on all tiles
    for(i = 0; i < allTiles.length; i++){
        document.getElementById(allTiles[i]).removeAttribute("onclick");
        document.getElementById(allTiles[i]).setAttribute("onclick", "getPlayerMove(id)");
    }
}
//Returns players move, either sends tile to makeMove() or resetValidMoves()
function getPlayerMove(id){
    let playerMove = document.getElementById(id).id;
    let validMove = false;
    for(i = 0; i < currentMoveSet.length; i++){
        if(playerMove == currentMoveSet[i]){
            makeMove(playerMove);
            validMove = true;
        }
    }
    if(!validMove){
        resetVaildMoves();
    }
}
//Takes players move from getPlayerMove() and moves piece on board, then calls resetValidMoves()
function makeMove(playerMove){
    //make piece move to selected location
    piece = document.getElementById(currenttile).innerHTML;
    document.getElementById(playerMove).innerHTML = piece;
    document.getElementById(currenttile).innerHTML = '';
    //if castling
    if(numOfWhiteKingMoves == 0 && numOfWhiteRook1Moves == 0 && currentPieceSelected == 'white-king' && playerMove == 'h3'){
        let whiterook1 = document.getElementById('h1').innerHTML;
        document.getElementById('h4').innerHTML = whiterook1;
        document.getElementById('h1').innerHTML = '';
    }else if(numOfWhiteKingMoves == 0 && numOfWhiteRook2Moves == 0 && currentPieceSelected == 'white-king' && playerMove == 'h7'){
        let whiterook2 = document.getElementById('h8').innerHTML;
        document.getElementById('h6').innerHTML = whiterook2;
        document.getElementById('h8').innerHTML = '';
    }else if(numOfBlackKingMoves == 0 && numOfBlackRook1Moves == 0 && currentPieceSelected == 'black-king' && playerMove == 'a3'){
        let blackrook1 = document.getElementById('a1').innerHTML;
        document.getElementById('a4').innerHTML = blackrook1;
        document.getElementById('a1').innerHTML = '';
    }else if(numOfBlackKingMoves == 0 && numOfBlackRook2Moves == 0 && currentPieceSelected == 'black-king' && playerMove == 'a7'){
        let blackrook2 = document.getElementById('a8').innerHTML;
        document.getElementById('a6').innerHTML = blackrook2;
        document.getElementById('a8').innerHTML = '';
    }
    //increment move count
    piece = document.getElementById(playerMove).children;
    if(piece[0].id == 'white-rook-1'){
        numOfWhiteRook1Moves++;
    }
    if(piece[0].id == 'white-rook-2'){
        numOfWhiteRook2Moves++;
    }
    if(piece[0].id == 'white-king'){
        numOfWhiteKingMoves++;
    }
    if(piece[0].id == 'black-rook-1'){
        numOfBlackRook1Moves++;
    }
    if(piece[0].id == 'black-rook-2'){
        numOfBlackRook2Moves++;
    }
    if(piece[0].id == 'black-king'){
        numOfBlackKingMoves++;
    }
    if(piece[0].id == 'white-pawn-1'){
        whitePawn1Moves++;
    }
    if(piece[0].id == 'white-pawn-2'){
        whitePawn2Moves++;
    }
    if(piece[0].id == 'white-pawn-3'){
        whitePawn3Moves++;
    }
    if(piece[0].id == 'white-pawn-4'){
        whitePawn4Moves++;
    }
    if(piece[0].id == 'white-pawn-5'){
        whitePawn5Moves++;
    }
    if(piece[0].id == 'white-pawn-6'){
        whitePawn6Moves++;
    }
    if(piece[0].id == 'white-pawn-7'){
        whitePawn7Moves++;
    }
    if(piece[0].id == 'white-pawn-8'){
        whitePawn8Moves++;
    }
    if(piece[0].id == 'black-pawn-1'){
        blackPawn1Moves++;
    }
    if(piece[0].id == 'black-pawn-2'){
        blackPawn2Moves++;
    }
    if(piece[0].id == 'black-pawn-3'){
        blackPawn3Moves++;
    }
    if(piece[0].id == 'black-pawn-4'){
        blackPawn4Moves++;
    }
    if(piece[0].id == 'black-pawn-5'){
        blackPawn5Moves++;
    }
    if(piece[0].id == 'black-pawn-6'){
        blackPawn6Moves++;
    }
    if(piece[0].id == 'black-pawn-7'){
        blackPawn7Moves++;
    }
    if(piece[0].id == 'black-pawn-8'){
        blackPawn8Moves++;
    }
    resetVaildMoves();
}
 //Removes "getPlayerMove(id)"" and adds "checkTileAndGetMoveSet(id)" on all tiles
function resetVaildMoves(){
    for(i = 0; i < allTiles.length; i++){
        document.getElementById(allTiles[i]).classList.remove('possibleMove');
    }
    for(i =0; i < allTiles.length; i++){
        document.getElementById(allTiles[i]).removeAttribute("onclick");
        document.getElementById(allTiles[i]).setAttribute("onclick", "checkTileAndGetMoveSet(id)");
    }
    currentMoveSet = '';
    currenttile = '';
}
//Checks if a tile is empty or not [True if empty]
 function isEmpty(tile){
    try{
        var check = document.getElementById(tile).children;
        if(check[0].id == ''){
            console.log('tile ' + check[0].id + ' is empty');
            return true;
        }else{
            console.log('tile ' + check[0].id + ' is not empty');
            return false;
        }
    }catch(err){
        return true;
    }
}
//Checks if tile is currently under attack
function isUnderAttack(pieceId, tile){
    //get pieceid color
    let breakdown = pieceId.split('-');
    console.log(breakdown);
    //get array of all opposing pieces
    let checkArray = [];
    if(breakdown[0] == 'black'){
            for(i = 0; i < 16; i++){
                checkArray.push(allPieces[i]);
            }
        }else{
            for(i = 16; i < 32; i++){
                checkArray.push(allPieces[i]);
            }
        }
        console.log(checkArray);
    //check if any opposing pieces can attack the passed tile.
    let iHolder;
    for(i = 0; i < checkArray.length; i++){
        iHolder = i;
        let checkArrayTile = document.getElementById(checkArray[i]).parentNode;
        let moveset = getRuleSet(checkArray[i], checkArrayTile.id, false);
        if(moveset.length == 0){
            i = iHolder;
            continue;
        }
        for(k = 0; k < moveset.length; k++){
            if(tile == moveset[k]){
                console.log('tile is under attack');
                return true;
            }
        }
        i = iHolder;
    }
    console.log('tile is not under attack');
    return false;
}
//Checks if a piece can attack another peice [True if empty]
function canAttack(pieceId, tileId){
    try{
        let attacker = document.getElementById(pieceId).getAttribute("class");
        let opposition = document.getElementById(tileId).children[0].getAttribute('class');
    if(attacker == opposition){
        console.log("cannot attack " + tileId);
        return false;
    }else{
        console.log('can attack');
        return true;
    }
    }catch(err){
        return true;
    }

} 
//Checks what piece is on a tile and returns an array of the moves the piece can make
function checkTileAndGetMoveSet(id){
    try{
    var tile = document.getElementById(id).getAttribute('id');
    var pieceId = document.getElementById(id).children;
    currenttile = tile;
    console.log('clicked tile contains piece ' + pieceId[0].id);
    currentPieceSelected = pieceId[0].id;
    displayValidMoves(getRuleSet(pieceId[0].id, tile, true));
    }catch(err){
        console.log('tile is empty')
    }
}
//Gets moveset of an individual piece
function getRuleSet(pieceId, tile, check){
    const allVerticals = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const allVerticals1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    if(pieceId == 'white-king'){
        let moveSet = [];
        let tileArray = tile.split('');
        //check tile above
        let mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        let nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile below
        tileArray = tile.split('');
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile to left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;        
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile to right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;        
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile top-left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile top-right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile bottom-left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile bottom-right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check if castling can be preformed
        if(check){
            if(numOfWhiteKingMoves == 0 && numOfWhiteRook1Moves == 0 && isEmpty('h2') && isEmpty('h3') && isEmpty('h4') && !isUnderAttack(pieceId, 'h3')){
                moveSet.push('h3');
            }
            if(numOfWhiteKingMoves == 0 && numOfWhiteRook2Moves == 0 && isEmpty('h6') && isEmpty('h7') && !isUnderAttack(pieceId, 'h7')){
                moveSet.push('h7');
            }
        }
        return moveSet;
    }else if(pieceId == 'white-queen'){
        let moveSet = [];
        let tileArray = tile.split('');
        //less than horizontal check
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than horizontal check
        tileArray = tile.split('');        
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //less than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i >= 0; i--){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i < 8; i++){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        tileArray = tile.split('');
        let vertical = allVerticals.indexOf(tileArray[0]);
        let isDone = false;
        //greater than right diagonal check (/) ->
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            } 
        }
        //less than right diagonal check (/) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //less than left diagonal check (\) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //greater than left diagonal check (\) ->
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            } 
            if(isDone){
                break;
            } 
        }
        return moveSet;      
    }else if(pieceId == 'white-bishop-1'){
        let moveSet = [];
        let tileArray = tile.split('');
        let vertical = allVerticals.indexOf(tileArray[0]);
        let isDone = false;
        //greater than right diagonal check (/) ->
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            } 
        }
        //less than right diagonal check (/) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //less than left diagonal check (\) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //greater than left diagonal check (\) ->
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            } 
            if(isDone){
                break;
            } 
        }
        return moveSet;
    }else if(pieceId == 'white-bishop-2'){
        let moveSet = [];
        let tileArray = tile.split('');
        let vertical = allVerticals.indexOf(tileArray[0]);
        let isDone = false;
        //greater than right diagonal check (/) ->
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            } 
        }
        //less than right diagonal check (/) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //less than left diagonal check (\) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //greater than left diagonal check (\) ->
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            } 
            if(isDone){
                break;
            } 
        }
        return moveSet;        
    }else if(pieceId == 'white-horse-1'){
        let moveSet = [];
        let tileArray = tile.split('');
        console.log(tileArray);
        //check top moves
        let mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 2;
        tileArray[0] = allVerticals[mover];
        tileArray[1] = parseInt(tileArray[1]) + 1;
        let nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[1] = parseInt(tileArray[1]) - 2;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check bottom moves
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover + 2;
        tileArray[0] = allVerticals[mover];
        tileArray[1] = parseInt(tileArray[1]) + 1;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[1] = parseInt(tileArray[1]) - 2;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check left moves
        tileArray[1] = tileArray[1] - 2;
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 1;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[0] = allVerticals[mover + 2];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check right moves
        tileArray[1] = parseInt(tileArray[1]) + 2;
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 1;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        console.log('this is nexttile: ' + nextTile);
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[0] = allVerticals[mover + 2];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        console.log(moveSet);
        return moveSet;
    }else if(pieceId == 'white-horse-2'){
        let moveSet = [];
        let tileArray = tile.split('');
        console.log(tileArray);
        //check top moves
        let mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 2;
        tileArray[0] = allVerticals[mover];
        tileArray[1] = parseInt(tileArray[1]) + 1;
        let nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[1] = parseInt(tileArray[1]) - 2;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check bottom moves
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover + 2;
        tileArray[0] = allVerticals[mover];
        tileArray[1] = parseInt(tileArray[1]) + 1;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[1] = parseInt(tileArray[1]) - 2;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check left moves
        tileArray[1] = tileArray[1] - 2;
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 1;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[0] = allVerticals[mover + 2];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check right moves
        tileArray[1] = parseInt(tileArray[1]) + 2;
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 1;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        console.log('this is nexttile: ' + nextTile);
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[0] = allVerticals[mover + 2];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        console.log(moveSet);
        return moveSet;
    }else if(pieceId == 'white-rook-1'){
        let moveSet = [];
        let tileArray = tile.split('');
        //less than horizontal check
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than horizontal check
        tileArray = tile.split('');        
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //less than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i >= 0; i--){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i < 8; i++){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        return moveSet;
    }else if(pieceId == 'white-rook-2'){
        let moveSet = [];
        let tileArray = tile.split('');
        //less than horizontal check
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than horizontal check
        tileArray = tile.split('');        
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //less than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i >= 0; i--){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i < 8; i++){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        return moveSet;        
    }else if(pieceId == 'white-pawn-1'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g1'){
            if(isEmpty('f1') && canAttack(pieceId, 'f1')){
                moveSet.push('f1');
                if(isEmpty('e1') && canAttack(pieceId, 'e1')){
                    moveSet.push('e1');                                                
                }
            }
            if(!isEmpty('f2') && canAttack(pieceId, 'f2')){
                moveSet.push('f2');
            }
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;
        }
    }else if(pieceId == 'white-pawn-2'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g2'){
            if(isEmpty('f2') && canAttack(pieceId, 'f2')){
                moveSet.push('f2');
                if(isEmpty('e2') && canAttack(pieceId, 'e2')){
                    moveSet.push('e2');                                                
                }
            }
            if(!isEmpty('f3') && canAttack(pieceId, 'f3')){
                moveSet.push('f3');
            }
            if(!isEmpty('f1') && canAttack(pieceId, 'f1')){
                moveSet.push('f1');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;
        }
    }else if(pieceId == 'white-pawn-3'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g3'){
            if(isEmpty('f3') && canAttack(pieceId, 'f3')){
                moveSet.push('f3');
                if(isEmpty('e3') && canAttack(pieceId, 'e3')){
                    moveSet.push('e3');                                                
                }
            }
            if(!isEmpty('f4') && canAttack(pieceId, 'f4')){
                moveSet.push('f4');
            }
            if(!isEmpty('f2') && canAttack(pieceId, 'f2')){
                moveSet.push('f2');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;
        }
    }else if(pieceId == 'white-pawn-4'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g4'){
            if(isEmpty('f4') && canAttack(pieceId, 'f4')){
                moveSet.push('f4');
                if(isEmpty('e4') && canAttack(pieceId, 'e4')){
                    moveSet.push('e4');                                                
                }
            }
            if(!isEmpty('f5') && canAttack(pieceId, 'f5')){
                moveSet.push('f5');
            }
            if(!isEmpty('f3') && canAttack(pieceId, 'f3')){
                moveSet.push('f3');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;        
        }
    }else if(pieceId == 'white-pawn-5'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g5'){
            if(isEmpty('f5') && canAttack(pieceId, 'f5')){
                moveSet.push('f5');
                if(isEmpty('e5') && canAttack(pieceId, 'e5')){
                    moveSet.push('e5');                                                
                }
            }
            if(!isEmpty('f6') && canAttack(pieceId, 'f6')){
                moveSet.push('f6');
            }
            if(!isEmpty('f4') && canAttack(pieceId, 'f4')){
                moveSet.push('f4');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;        
        }
    }else if(pieceId == 'white-pawn-6'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g6'){
            if(isEmpty('f6') && canAttack(pieceId, 'f6')){
                moveSet.push('f6');
                if(isEmpty('e6') && canAttack(pieceId, 'e6')){
                    moveSet.push('e6');                                                
                }
            }
            if(!isEmpty('f7') && canAttack(pieceId, 'f7')){
                moveSet.push('f7');
            }
            if(!isEmpty('f5') && canAttack(pieceId, 'f5')){
                moveSet.push('f5');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;
        }
    }else if(pieceId == 'white-pawn-7'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g7'){
            if(isEmpty('f7') && canAttack(pieceId, 'f7')){
                moveSet.push('f7');
                if(isEmpty('e7') && canAttack(pieceId, 'e7')){
                    moveSet.push('e7');                                                
                }
            }
            if(!isEmpty('f8') && canAttack(pieceId, 'f8')){
                moveSet.push('f8');
            }
            if(!isEmpty('f6') && canAttack(pieceId, 'f6')){
                moveSet.push('f6');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;
        }
    }else if(pieceId == 'white-pawn-8'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g8'){
            if(isEmpty('f8') && canAttack(pieceId, 'f8')){
                moveSet.push('f8');
                if(isEmpty('e8') && canAttack(pieceId, 'e8')){
                    moveSet.push('e8');                                                
                }
            }
            if(!isEmpty('f7') && canAttack(pieceId, 'f7')){
                moveSet.push('f2');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i-1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i-1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i-1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;        
        }
    }else if(pieceId == 'black-king'){
        let moveSet = [];
        let tileArray = tile.split('');
        //check tile above
        let mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        let nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile below
        tileArray = tile.split('');
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile to left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;        
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile to right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;        
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile top-left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile top-right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover--;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile bottom-left
        tileArray = tile.split('');
        mover = tileArray[1];
        mover--;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        //check tile bottom-right
        tileArray = tile.split('');
        mover = tileArray[1];
        mover++;
        tileArray[1] = mover;
        mover = allVerticals.indexOf(tileArray[0]);
        mover++;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                }
            }
        }
        if(check){
            if(numOfBlackKingMoves == 0 && numOfBlackRook1Moves == 0 && isEmpty('a2') && isEmpty('a3') && isEmpty('a4') && !isUnderAttack(pieceId, 'a3')){
                moveSet.push('a3');
            }
            if(numOfBlackKingMoves == 0 && numOfBlackRook2Moves == 0 && isEmpty('a6') && isEmpty('a7') && !isUnderAttack(pieceId, 'a7')){
                moveSet.push('a7');
            }
        }
        return moveSet;                
    }else if(pieceId == 'black-queen'){
        let moveSet = [];
        let tileArray = tile.split('');
        //less than horizontal check
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than horizontal check
        tileArray = tile.split('');        
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //less than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i >= 0; i--){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i < 8; i++){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        tileArray = tile.split('');
        let vertical = allVerticals.indexOf(tileArray[0]);
        let isDone = false;
        //greater than right diagonal check (/) ->
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            } 
        }
        //less than right diagonal check (/) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //less than left diagonal check (\) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //greater than left diagonal check (\) ->
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            } 
            if(isDone){
                break;
            } 
        }
        return moveSet;
    }else if(pieceId == 'black-bishop-1'){
        let moveSet = [];
        let tileArray = tile.split('');
        let vertical = allVerticals.indexOf(tileArray[0]);
        let isDone = false;
        //greater than right diagonal check (/) ->
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            } 
        }
        //less than right diagonal check (/) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //less than left diagonal check (\) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //greater than left diagonal check (\) ->
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            } 
            if(isDone){
                break;
            } 
        }
        return moveSet;        
    }else if(pieceId == 'black-bishop-2'){
        let moveSet = [];
        let tileArray = tile.split('');
        let vertical = allVerticals.indexOf(tileArray[0]);
        let isDone = false;
        //greater than right diagonal check (/) ->
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            } 
        }
        //less than right diagonal check (/) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //less than left diagonal check (\) <-
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical--;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            }
            if(isDone){
                break;
            }  
        }
        //greater than left diagonal check (\) ->
        tileArray = tile.split('');
        vertical = allVerticals.indexOf(tileArray[0]);
        tileArray[0] = allVerticals[vertical];
        isDone = false;
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            tileArray[0] = allVerticals[vertical];
            vertical++;
            let nextTile = tileArray.join('');
            for(k = 0; k < allTiles.length; k++){
                if(nextTile == allTiles[k]){
                    if(nextTile != tile){
                        if(isEmpty(nextTile)){
                            moveSet.push(nextTile);               
                        }else if(canAttack(pieceId, nextTile)){
                            moveSet.push(nextTile);
                            isDone = true;
                            break;
                        }else{
                            isDone = true;
                            break;
                        }
                    }  
                }
            } 
            if(isDone){
                break;
            } 
        }
        return moveSet;        
    }else if(pieceId == 'black-horse-1'){
        let moveSet = [];
        let tileArray = tile.split('');
        console.log(tileArray);
        //check top moves
        let mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 2;
        tileArray[0] = allVerticals[mover];
        tileArray[1] = parseInt(tileArray[1]) + 1;
        let nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[1] = parseInt(tileArray[1]) - 2;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check bottom moves
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover + 2;
        tileArray[0] = allVerticals[mover];
        tileArray[1] = parseInt(tileArray[1]) + 1;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[1] = parseInt(tileArray[1]) - 2;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check left moves
        tileArray[1] = tileArray[1] - 2;
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 1;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[0] = allVerticals[mover + 2];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check right moves
        tileArray[1] = parseInt(tileArray[1]) + 2;
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 1;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        console.log('this is nexttile: ' + nextTile);
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[0] = allVerticals[mover + 2];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        console.log(moveSet);
        return moveSet;
    }else if(pieceId == 'black-horse-2'){
        let moveSet = [];
        let tileArray = tile.split('');
        console.log(tileArray);
        //check top moves
        let mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 2;
        tileArray[0] = allVerticals[mover];
        tileArray[1] = parseInt(tileArray[1]) + 1;
        let nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[1] = parseInt(tileArray[1]) - 2;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check bottom moves
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover + 2;
        tileArray[0] = allVerticals[mover];
        tileArray[1] = parseInt(tileArray[1]) + 1;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[1] = parseInt(tileArray[1]) - 2;
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check left moves
        tileArray[1] = tileArray[1] - 2;
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 1;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[0] = allVerticals[mover + 2];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray = tile.split('');
        //check right moves
        tileArray[1] = parseInt(tileArray[1]) + 2;
        mover = allVerticals.indexOf(tileArray[0]);
        mover = mover - 1;
        tileArray[0] = allVerticals[mover];
        nextTile = tileArray.join('');
        console.log('this is nexttile: ' + nextTile);
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        tileArray[0] = allVerticals[mover + 2];
        nextTile = tileArray.join('');
        for(i = 0; i < allTiles.length; i++){
            if(nextTile == allTiles[i]){
                if(nextTile != tile){
                    if(isEmpty(nextTile)){
                        moveSet.push(nextTile);               
                    }else if(canAttack(pieceId, nextTile)){
                        moveSet.push(nextTile);
                    }
                }
            }
        }
        console.log(moveSet);
        return moveSet;
    }else if(pieceId == 'black-rook-1'){
        let moveSet = [];
        let tileArray = tile.split('');
        //less than horizontal check
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than horizontal check
        tileArray = tile.split('');        
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //less than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i >= 0; i--){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i < 8; i++){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        return moveSet;        
    }else if(pieceId == 'black-rook-2'){
        let moveSet = [];
        let tileArray = tile.split('');
        //less than horizontal check
        for(i = tileArray[1]; i > 0; i--){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than horizontal check
        tileArray = tile.split('');        
        for(i = tileArray[1]; i <= 8; i++){
            tileArray[1] = i;
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //less than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i >= 0; i--){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        //greater than vertical check
        tileArray = tile.split('');
        for(i = allVerticals.indexOf(tileArray[0]); i < 8; i++){
            tileArray[0] = allVerticals[i];
            let nextTile = tileArray.join('');
            if(nextTile != tile){
                if(isEmpty(nextTile)){
                    moveSet.push(nextTile);               
                }else if(canAttack(pieceId, nextTile)){
                    moveSet.push(nextTile);
                    break;
                }else{
                    break;
                }
            }
        }
        return moveSet;        
    }else if(pieceId == 'black-pawn-1'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b1'){
            if(isEmpty('c1') && canAttack(pieceId, 'c1')){
                moveSet.push('c1');
                if(isEmpty('d1') && canAttack(pieceId, 'd1')){
                    moveSet.push('d1');                                                
                }
            }
            if(!isEmpty('c2') && canAttack(pieceId, 'c2')){
                moveSet.push('c2');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;        
        }
    }else if(pieceId == 'black-pawn-2'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b2'){
            if(isEmpty('c2') && canAttack(pieceId, 'c2')){
                moveSet.push('c2');
                if(isEmpty('d2') && canAttack(pieceId, 'd2')){
                    moveSet.push('d2');                                                
                }
            }
            if(!isEmpty('c3') && canAttack(pieceId, 'c3')){
                moveSet.push('c3');
            }
            if(!isEmpty('c1') && canAttack(pieceId, 'c1')){
                moveSet.push('c1');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;
        }
    }else if(pieceId == 'black-pawn-3'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b3'){
            if(isEmpty('c3') && canAttack(pieceId, 'c3')){
                moveSet.push('c3');
                if(isEmpty('d3') && canAttack(pieceId, 'd3')){
                    moveSet.push('d3');                                                
                }
            }
            if(!isEmpty('c4') && canAttack(pieceId, 'c4')){
                moveSet.push('c4');
            }
            if(!isEmpty('c2') && canAttack(pieceId, 'c2')){
                moveSet.push('c2');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;        
        }
    }else if(pieceId == 'black-pawn-4'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b4'){
            if(isEmpty('c4') && canAttack(pieceId, 'c4')){
                moveSet.push('c4');
                if(isEmpty('d4') && canAttack(pieceId, 'd4')){
                    moveSet.push('d4');                                                
                }
            }
            if(!isEmpty('c5') && canAttack(pieceId, 'c5')){
                moveSet.push('c5');
            }
            if(!isEmpty('c3') && canAttack(pieceId, 'c3')){
                moveSet.push('c3');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;
        }
    }else if(pieceId == 'black-pawn-5'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b5'){
            if(isEmpty('c5') && canAttack(pieceId, 'c5')){
                moveSet.push('c5');
                if(isEmpty('d5') && canAttack(pieceId, 'd5')){
                    moveSet.push('d5');                                                
                }
            }
            if(!isEmpty('c6') && canAttack(pieceId, 'c6')){
                moveSet.push('c6');
            }
            if(!isEmpty('c4') && canAttack(pieceId, 'c4')){
                moveSet.push('c4');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;
        }
    }else if(pieceId == 'black-pawn-6'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b6'){
            if(isEmpty('c6') && canAttack(pieceId, 'c6')){
                moveSet.push('c6');
                if(isEmpty('d6') && canAttack(pieceId, 'd6')){
                    moveSet.push('d6');                                                
                }
            }
            if(!isEmpty('c7') && canAttack(pieceId, 'c7')){
                moveSet.push('c7');
            }
            if(!isEmpty('c5') && canAttack(pieceId, 'c5')){
                moveSet.push('c5');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;        
        }
    }else if(pieceId == 'black-pawn-7'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b7'){
            if(isEmpty('c7') && canAttack(pieceId, 'c7')){
                moveSet.push('c7');
                if(isEmpty('d7') && canAttack(pieceId, 'd7')){
                    moveSet.push('d7');                                                
                }
            }
            if(!isEmpty('c8') && canAttack(pieceId, 'c8')){
                moveSet.push('c8');
            }
            if(!isEmpty('c6') && canAttack(pieceId, 'c6')){
                moveSet.push('c6');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;        
        }
    }else if(pieceId == 'black-pawn-8'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b8'){
            if(isEmpty('c8') && canAttack(pieceId, 'c8')){
                moveSet.push('c8');
                if(isEmpty('d8') && canAttack(pieceId, 'd8')){
                    moveSet.push('d8');                                                
                }
            }
            if(!isEmpty('c7') && canAttack(pieceId, 'c7')){
                moveSet.push('c7');
            }
            currentMoveSet = moveSet;
            return moveSet;
        }else{
        //MoveSet for all other moves
        //get next forward move
        let tileArray = tile.split('');
        for(i = 0; i < allVerticals.length; i++){
            if(tileArray[0] == allVerticals[i]){
                //gets letter for next move
                let move = allVerticals[i+1];
                //gets number for next move
                move += tileArray[1];
                if(isEmpty(move)){
                    moveSet.push(move);
                }
                //gets right diagonal move
                let diagonalMoveR = allVerticals[i+1] += parseInt(tileArray[1])+1;
                if(!isEmpty(diagonalMoveR)){
                    if(canAttack(pieceId, diagonalMoveR)){
                        moveSet.push(diagonalMoveR);
                    }
                }
                let diagonalMoveL = allVerticals1[i+1] += parseInt(tileArray[1])-1;
                if(!isEmpty(diagonalMoveL)){
                    if(canAttack(pieceId, diagonalMoveL)){
                        moveSet.push(diagonalMoveL);
                    }
                }
            }
        }
        return moveSet;        
        }
    }else{
        //tile is empty
    }
}