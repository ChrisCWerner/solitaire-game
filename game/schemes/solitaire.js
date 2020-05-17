import createSolitaire from '../utils/solitaire'
import Deck from './deck'

const validateDeck = (deck) => {
  const compare = Deck()
  for (const key of Object.keys(compare)) {
    if (deck[key].toString() !== compare[key].toString()) return false
  }
  return true
}

const Solitaire = (options = {}) => {
  const deck = options.deck
  if (deck && !validateDeck(deck)) throw new Error('Invalid deck!')

  let game = options.game || null

  const currentGame = () => game

  const newGame = () => {
    game = createSolitaire(deck || Deck())
    // eslint-disable-next-line no-console
    console.log(game)
    return currentGame()
  }

  return {
    newGame,
    currentGame
  }
}

export default Solitaire
