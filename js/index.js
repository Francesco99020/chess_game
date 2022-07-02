/*
Work on adding logic for all other pieces

bug: clicking on bishop doesnt always proc displayValidMoves()
*/
//Array of all tiles
var currentMoveSet;
var currenttile;
const allTiles = 
['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8']
 //turns valid tiles orange that can be moved to
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
//returns players move, either sends tile to makeMove() or resetValidMoves()
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
//takes players move from getPlayerMove() and moves piece on board, then calls resetValidMoves()
function makeMove(playerMove){
    //make piece move to selected location
    piece = document.getElementById(currenttile).innerHTML;
    document.getElementById(playerMove).innerHTML = piece;
    document.getElementById(currenttile).innerHTML = '';
    resetVaildMoves();
}
 //removes "getPlayerMove(id)"" and adds "checkTileAndGetMoveSet(id)" on all tiles
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
//checks if a tile is empty or not [True if empty]
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
//checks if a piece can attack another peice
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
//checks what piece is on a tile and returns an array of the moves the piece can make
function checkTileAndGetMoveSet(id){
    try{
    var tile = document.getElementById(id).getAttribute('id');
    var pieceId = document.getElementById(id).children;
    currenttile = tile;
    console.log('clicked tile contains piece ' + pieceId[0].id);
    displayValidMoves(getRuleSet(pieceId[0].id, tile));
    }catch(err){
        console.log('tile is empty')
    }
}
//Gets moveset of an individual piece
function getRuleSet(pieceId, tile){
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