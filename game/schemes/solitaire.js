import Deck from "./deck.js";

const validateDeck = (deck) => {
  const compare = Deck();
  for (const key of Object.keys(compare)) {
    if (deck[key].toString() !== compare[key].toString()) return false;
  }
  return true;
};

const fillColumn = (number, deck) => {
  const column = [];
  for (let i = 0; i < number; i++) {
    column.push(deck.pop());
  }
  return column;
};

const fillAllColumns = (deck) => {
  const columns = [];
  for (let i = 0; i < 7; i++) {
    columns.push(fillColumn(i + 1, deck));
  }
  return columns;
};

const Solitaire = ({
  __deck = Deck(),
  __openCards = Deck(),
  __game = null,
} = {}) => {
  // validate options
  if (!validateDeck(__deck)) throw new Error("Invalid deck!");

  const openCards = __openCards;
  const deck = __deck;
  let game = __game;

  const currentGame = () => game;

  const newGame = () => {
    deck.generate();
    deck.shuffle();
    openCards.empty();

    const openDeck = ({ challenge = 1 } = {}) => {
      let cards = openCards.empty();
      deck.putBack(cards);
      cards = deck.buy(challenge);
      openCards.putBack(cards);
      return openCards.get();
    };

    game = {
      deck: deck.get(),
      openCards: openCards.get(),
      target: {
        hearts: [],
        clubs: [],
        diamonds: [],
        spades: [],
      },
      columns: fillAllColumns(deck.get()),
      openDeck,
    };
    // eslint-disable-next-line no-console
    // console.log(game)
    return currentGame();
  };

  return {
    newGame,
    currentGame,
  };
};

export default Solitaire;
