// Modified from https://rosettacode.org/wiki/Deal_cards_for_FreeCell#JavaScript

class MSRand {
  constructor(seed) {
    this.seed = seed;
  }

  rand() {
    this.seed = ((this.seed * 214013 + 2531011) & 0x7FFFFFFF);
    return ((this.seed >> 16) & 0x7fff);
  }
  max_rand(mymax) {
    return this.rand() % mymax;
  }
  shuffle(deck) {
    if (deck.length) {
      var i = deck.length;
      while (--i) {
        var j = this.max_rand(i+1);
        var tmp = deck[i];
        deck[i] = deck[j];
         deck[j] = tmp;
      }
    }
    return deck;
  }
}

/*
 * Microsoft Windows Freecell / Freecell Pro boards generation.
 *
 * See:
 *
 * - http://rosettacode.org/wiki/Deal_cards_for_FreeCell
 *
 * - http://www.solitairelaboratory.com/mshuffle.txt
 *
 * Under MIT/X11 Licence.
 *
 * */
 
function deal_ms_fc_board(seed) {
    var randomizer = new MSRand(seed);
    var num_cols = 8;
 
    var _perl_range = function(start, end) {
        var ret = [];
 
        for (var i = start; i <= end; i++) {
            ret.push(i);
        }
 
        return ret;
    };
 
    var columns = _perl_range(0, num_cols-1).map(function () { return []; });
    var deck = _perl_range(0, 4*13-1);
 
    randomizer.shuffle(deck);
 
    deck = deck.reverse()
 
    for (var i = 0; i < 52; i++) {
        columns[i % num_cols].push(deck[i]);
    }
 
    var render_card = function (card, index) {
        var suitInt = (card % 4);
        var rank = Math.floor(card / 4);
        const suit = "CDHS".charAt(suitInt);
        const value = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'][rank];
        const key = suit + value;
        var cardObj = {
            key,
            suit,
            value,
            int: rank + 1,
            column: 0, // fill this in later
            row: index,
            area: 'table',
            color: suit === 'S' || suit === 'C' ? 'black' : 'red',
            selected: false
          };
 
        return cardObj;
    }
 
    var render_column = function(col, index) {
        const cardsInCol = col.map(render_card);
        cardsInCol.forEach(card => card.column = index);
        return cardsInCol;
    }
    const deckArr = columns.map(render_column);
    return deckArr.flat();;
}

function Dealer(seed) {
  const deck = deal_ms_fc_board(seed);
  // Sort so react keeps track of them better
  deck.sort((a, b) => {
    // Sort by suit first
    if (a.suit < b.suit) {
      return -1;
    } else if (a.suit > b.suit) {
      return 1;
    }
    // Then sort by value
    return a.int - b.int;
  });
  return deck;
}

export default Dealer;