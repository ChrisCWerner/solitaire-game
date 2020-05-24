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

const clearTarget = (target) => {
  target.hearts = [];
  target.clubs = [];
  target.diamonds = [];
  target.spades = [];
};

const generateColumns = (columns, deck) => {
  columns.length = 0;
  columns.push(...fillAllColumns(deck.get()));
};

const Solitaire = ({
  __deck = Deck(),
  __openCards = Deck(),
  __game = null,
} = {}) => {
  // validate options
  if (!validateDeck(__deck)) throw new Error("Invalid deck!");

  const target = {};
  const columns = [];
  const openCards = {...__openCards};
  const deck = {...__deck};
  let game = {...__game};

  const currentGame = () => game;

  const openDeck = ({ _deck = deck, challenge = 1 } = {}) => {
    let cards = openCards.empty();
    _deck.putBack(cards);
    cards = _deck.buy(challenge);
    openCards.putBack(cards);
    return openCards.get();
  };

  const newGame = ({ _deck = deck } = {}) => {
    // initialize game: clear open cards, clear targets, generate deck, generate columns
    openCards.empty();
    clearTarget(target);
    _deck.generate();
    _deck.shuffle();
    generateColumns(columns, _deck);

    game = {
      deck: _deck.getStatic(),
      openCards: openCards.getStatic(),
      target,
      columns,
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
