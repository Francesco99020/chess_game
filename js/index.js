/*
make a function that takes the moveset array as a parameter
The function should highlight the tiles the piece can move to.

if highlighted tile is pressed then the piece will move to that tile (most likley another function)
else piece doesn't move and highlighted tiles should go away

add anaimation for piece moving
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
    console.log('clicked tile contains piece ' + pieceId[0].id)
    getRuleSet(pieceId[0].id, tile);
    }catch(err){
        console.log('tile is empty')
    }
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
            if(isEmpty('f1') && canAttack(pieceId, 'f1')){
                moveSet.push('f1');
                if(isEmpty('e1') && canAttack(pieceId, 'e1')){
                    moveSet.push('e1');                                                
                }
            }
            if(!isEmpty('f2') && canAttack(pieceId, 'f2')){
                moveSet.push('f2');
            }
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            if(isEmpty('c1') && canAttack(pieceId, 'c1')){
                moveSet.push('c1');
                if(isEmpty('d1') && canAttack(pieceId, 'd1')){
                    moveSet.push('d1');                                                
                }
            }
            if(!isEmpty('c2') && canAttack(pieceId, 'c2')){
                moveSet.push('c2');
            }
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
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
            console.log(moveSet);
            return moveSet;
        }else{
        //MoveSet for all other moves
        
        }
    }else{
        //tile is empty
    }
}