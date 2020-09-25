import ranks from "../utils/ranks.js";
import suits from "../utils/suits.js";
import fYShuffle from "../utils/shuffle.js";
import Card from "./card.js";

const Deck = ({ cards = [] } = {}) => {
  const deck = cards;

  const get = () => deck;

  const getStatic = () => Object.freeze([...deck]);

  const empty = () => buy(0);

  const generate = (pick = null) => {
    empty();
    for (const suit of suits) {
      if (!pick || pick.suits.includes(suit)) {
        for (const rank of ranks) {
          const card = Card(suit, rank);
          deck.push(card);
        }
      }
    }
    return deck;
  };

  const shuffle = () => {
    return fYShuffle(deck);
  };

  const buy = (number) => {
    return deck.splice(-number);
  };

  const putBack = (cards) => {
    deck.unshift(...cards);
    return deck;
  };

  const cut = (index) => {
    const l = deck.length;
    index = index || Math.floor(Math.random() * l);
    index = index % l || Math.floor(l / 2);
    const cutted = buy(index);
    putBack(cutted);
    return cutted;
  };

  return {
    deck,
    get,
    getStatic,
    empty,
    generate,
    shuffle,
    cut,
    buy,
    putBack,
  };
};

export default Deck;
