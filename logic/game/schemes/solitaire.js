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

const Solitaire = (game = { deck = Deck(), openCards = Deck(), target = {}, columns = [] }) => {
// const Solitaire = ({ deck = Deck(), openCards = Deck(), game = null } = {}) => {
  // validate options
  if (!validateDeck(game.deck)) throw new Error("Invalid deck!");

  const _target = game.target;
  const _columns = game.columns;
  const _openCards = { ...game.openCards };
  const _deck = { ...game.deck };
  let _game = { ...game };

  const currentGame = () => _game;

  const openDeck = ({ deck = _deck, challenge = 1 } = {}) => {
    let cards = _openCards.empty();
    deck.putBack(cards);
    cards = deck.buy(challenge);
    _openCards.putBack(cards);
    return _openCards.get();
  };

  const newGame = ({ deck = _deck } = {}) => {
    // initialize game: clear open cards, clear targets, generate deck, generate columns
    _openCards.empty();
    clearTarget(_target);
    deck.generate();
    deck.shuffle();
    generateColumns(_columns, deck);

    _game = {
      deck: deck.getStatic(),
      openCards: _openCards.getStatic(),
      target: _target,
      columns: _columns,
      openDeck,
      currentGame,
      newGame,
    };
    // eslint-disable-next-line no-console
    // console.log(_game)
    return currentGame();
  };

  return {
    game: _game,
    newGame,
    currentGame,
  };
};

export default Solitaire;
