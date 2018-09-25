class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.symbol = "X";
  }

  bindEvents() {
    $('.board').on('click', 'li', e => {
      // debugger;
      let $square = $(e.target);
      if (this.game.board.isEmptyPos($square.data('pos'))){
        this.makeMove($square);
      } else {
        alert('!!!');
      }
    });
  }

  makeMove($square) {
    $square.removeClass('unclicked');
    $square.addClass('clicked');
    $square.html(this.symbol);

    let pos = $square.data('pos'); // [0,0]
    this.game.playMove(pos);


    if (this.game.isOver()) {
      $('.board').off('click', 'li');
      if (this.game.winner() === null) {
        this.tieGame();
      } else {
        this.winningDisplay();
      }

      // add reset button!
      this.$el.append('<button onclick="myFunction()">Restart Game</button>');
    }

    if (this.symbol === 'X') {
      this.symbol = 'O';
    } else {
      this.symbol = 'X';
    }
  }

  tieGame() {
    this.$el.append($(`<h2>It's a draw!!</h2>`));
    $('li').each( (idx, square) => {
      $(square).addClass('LosingSquare');
      $(square).removeClass('unclicked');
    });
  }

  winningDisplay() {
    this.$el.append($(`<h2>${this.symbol} is the winner!!</h2>`));
    $('li').each( (idx, square) => {
      // debugger;

      if ($(square).html() === this.symbol){
        $(square).addClass('WinningSquare');
      } else {
        $(square).addClass('LosingSquare');
      }

      $(square).removeClass('unclicked');

    });

  }

  setupBoard() {
    const $board = $('<div class="board"></div>');
    this.$el.append($board);
    for (let i = 0; i < 9; i++) {
      let x = Math.floor(i/3);
      let y = i%3;
      let $square = $('<li class="square unclicked"></li>');
      $square.data('pos', [x,y]);
      $board.append($square);
    }
  }
}

module.exports = View;
