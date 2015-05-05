var player = '1'; 
var piece;
var movesStack = new Array();
var ticTacToe = {
	start: function() {
    	$('#board').on('click', 'td', ticTacToe.playMove);
    	$('#undo').click(ticTacToe.undo);
      $('#newgame').click(ticTacToe.reset);
    	$('#message').text("Player " + player);
  	},
  	playMove: function() {
    	var space = $(this);
    	if(space.text() === '') {
    		if (player === '1') {
    			piece = 'X';
    		}else{
    			piece = 'O';
    		}
    		space.addClass('color');
			space.html( piece );
			movesStack.push(space.attr('id'));
			if (ticTacToe.checkWin()) {
      			return false;
    		}
    		if (player === '1'){
  				player = '2';
  			}else{
  				player = '1';
  			}
    		$('#message').text("Player " + player);
    	} else {
      		$('#message').text("There's a piece already there, Player " + player +"." );
    	}
  	},
  	checkWin: function() {
    	var row,column;
    	//check rows
    	for (row = 1; row <= 3; row++) {
      		if ($('#space' + (row * 3)).text() !== '') {
      			if ($('#space' + row * 3).text() === $('#space' + (row * 3 -1)).text()) {
      				if ($('#space' + row * 3).text() === $('#space' + (row * 3 - 2)).text()) {
      					$('#space' + (row * 3)).toggleClass('color win');
      					$('#space' + (row * 3 - 1)).toggleClass('color win');
      					$('#space' + (row * 3 - 2)).toggleClass('color win');
    					$('#message').text("Yay you win, Player " + player + ".");
    					ticTacToe.gameOver();
      					return true;
      				}
        		}
      		}
    	}
    	//check columns
    	for (column = 1; column <= 3; column++) {
    		if ($('#space' + column).text() !== '') {
    			if ($('#space'+ column).text() === $('#space'+ (column+3)).text()){
    				if ($('#space'+ column).text()=== $('#space'+ (column+6)).text()){
    					$('#space' + column).toggleClass('color win');
    					$('#space'+ (column+3)).toggleClass('color win');
    					$('#space'+ (column+6)).toggleClass('color win');
    					$('#message').text("Yay you win, Player " + player + ".");
    					ticTacToe.gameOver();
    					return true;
    				}
    			}
    		}
    	}
    	//check diagonals
    	if ($('#space1').text() !== '') {
    		if ($('#space1').text() === $('#space5').text()) {
    			if ($('#space1').text() === $('#space9').text()) {
    				$('#space1').toggleClass('color win');
    				$('#space5').toggleClass('color win');
    				$('#space9').toggleClass('color win');
    				$('#message').text("Yay you win, Player " + player + ".");
    				ticTacToe.gameOver();
    				return true;
    			}
    		}
    	}
    	if ($('#space3').text() !== '') {
    		if ($('#space3').text() === $('#space5').text()) {
    			if ($('#space3').text() === $('#space7').text()) {
    				$('#space3').toggleClass('color win');
    				$('#space5').toggleClass('color win');
    				$('#space7').toggleClass('color win');
    				$('#message').text("Yay you win, Player " + player + ".");
    				ticTacToe.gameOver();
    				return true;
    			}
    		}
    	}
    	//check draw
    	for (var i = 1; i <= 9; i++) {
      		if ($('#space' + i).text() === '') {
        		break;
      		}
      		if (i === 9) {
        		$('#message').text("Draw.  You both lose.");
    			ticTacToe.gameOver();
        		return true;
      		}
    	}
  	},
  	gameOver: function() {
    	$('#board').off('click', 'td', ticTacToe.playMove);
    	$('#undo').unbind('click');
  	},
  	undo: function() {
  		if(movesStack.length == 0){
  			$('#message').text("It's an empty board.  Stop pressing undo, Player " + player + ".");
  		}else if(movesStack.length > 0) {
      		var lastMove = movesStack.pop();
      		$('#' + lastMove).text('');
	  		if (player === '1'){
	  			player = '2';
	  		}else{
	  			player = '1';
	  		}
	    	$('#message').text("Player " + player);
      	}
  	},
    reset: function() {
      for (var i =1; i <= 9; i++) {
        $('#space' + i).text('').removeClass('win'); 
      }
      movesStack = new Array();
      player = '1';
      $('#board').on('click', 'td', ticTacToe.playMove);
      $('#undo').click(ticTacToe.undo);
      $('#message').text("Player " + player);
    }
};
$(ticTacToe.start);