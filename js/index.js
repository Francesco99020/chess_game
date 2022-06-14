/*add a rule that doesn't allow pieces to target their own color peices
Maybe use a class called "white" and "Black"?
*/

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

//checks if a tile is empty or not
 function isEmpty(tile){
    var check = document.getElementById(tile).children;
    try{
        if(check[0].id == ''){
            console.log('tile is empty');
            return true;
        }else{
            console.log('tile is not empty');
            return false;
        }
    }catch(err){
        return true;
    }
}

//checks what piece is on a tile and returns an array of the moves the piece can make
function checkTileAndGetMoveSet(id){
    var tile = document.getElementById(id).getAttribute('id');
    var pieceId = document.getElementById(id).children;
    getRuleSet(pieceId[0].id, tile);
}
function getRuleSet(pieceId, tile){
    if(pieceId == 'white king'){
        
    }else if(pieceId == 'white-queen'){

    }else if(pieceId == 'white-bishop-1'){
        
    }else if(pieceId == 'white-bishop-2'){
        
    }else if(pieceId == 'white-horse-1'){
        
    }else if(pieceId == 'white-horse-2'){
        
    }else if(pieceId == 'white-rook-1'){
        
    }else if(pieceId == 'white-rook-2'){
        
    }else if(pieceId == 'white-pawn-1'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g1'){
            if(isEmpty('f1')){
                moveSet.push('f1');
                if(isEmpty('e1')){
                    moveSet.push('e1');                                                
                }
            }
            if(!isEmpty('f2')){
                moveSet.push('f2');
            }
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
        }

    }else if(pieceId == 'white-pawn-2'){
        if(tile == 'g2'){

        }else{

        }        
    }else if(pieceId == 'white-pawn-3'){
        if(tile == 'g3'){

        }else{

        }
    }else if(pieceId == 'white-pawn-4'){
        if(tile == 'g4'){

        }else{

        }
    }else if(pieceId == 'white-pawn-5'){
        if(tile == 'g5'){

        }else{

        }
    }else if(pieceId == 'white-pawn-6'){
        if(tile == 'g6'){

        }else{

        }
    }else if(pieceId == 'white-pawn-7'){
        if(tile == 'g7'){

        }else{

        }
    }else if(pieceId == 'white-pawn-8'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'g8'){
            if(isEmpty('f8')){
                moveSet.push('f8')
            }
            if(isEmpty('e8')){
                moveSet.push('e8');                                                
            }
            if(!isEmpty('f7')){
                moveSet.push('f7');
            }
            console.log(moveSet);
            return moveSet;
        }else{
            //Moveset for all other moves

        }
    }else if(pieceId == 'black king'){
        
    }else if(pieceId == 'black-queen'){

    }else if(pieceId == 'black-bishop-1'){
        
    }else if(pieceId == 'black-bishop-2'){
        
    }else if(pieceId == 'black-horse-1'){
        
    }else if(pieceId == 'black-horse-2'){
        
    }else if(pieceId == 'black-rook-1'){
        
    }else if(pieceId == 'black-rook-2'){
        
    }else if(pieceId == 'black-pawn-1'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b1'){
            if(isEmpty('c1')){
                moveSet.push('c1')
            }
            if(isEmpty('d1')){
                moveSet.push('d1');                                                
            }
            if(!isEmpty('c2')){
                moveSet.push('c2');
            }
            return moveSet;
        }else{
        //MoveSet for all other moves

        }

    }else if(pieceId == 'black-pawn-2'){
        if(tile == 'g2'){

        }else{

        }
    }else if(pieceId == 'black-pawn-3'){
        if(tile == 'g3'){

        }else{

        }
    }else if(pieceId == 'black-pawn-4'){
        if(tile == 'g4'){

        }else{

        }
    }else if(pieceId == 'black-pawn-5'){
        if(tile == 'g5'){

        }else{

        }
    }else if(pieceId == 'black-pawn-6'){
        if(tile == 'g6'){

        }else{

        }
    }else if(pieceId == 'black-pawn-7'){
        if(tile == 'g7'){

        }else{

        }
    }else if(pieceId == 'black-pawn-8'){
        let moveSet = [];
        //MoveSet for first move
        if(tile == 'b1'){
            if(isEmpty('c1')){
                moveSet.push('c1')
            }
            if(isEmpty('d1')){
                moveSet.push('d1');                                                
            }
            if(!isEmpty('c2')){
                moveSet.push('c2');
            }
            return moveSet;
        }else{
        //MoveSet for all other moves

        }

    }else{
        //tile is empty
    }
}