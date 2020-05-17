import ranks from '../utils/ranks'
import suits from '../utils/suits'
import fYShuffle from '../utils/shuffle'
import Card from './card'

const Deck = () => {
  const deck = []

  const get = () => deck

  const generate = (pick = null) => {
    for (const suit of suits) {
      if (!pick || pick.suits.includes(suit)) {
        for (const rank of ranks) {
          const card = Card(suit, rank)
          deck.push(card)
        }
      }
    }
    return deck
  }

  const shuffle = () => {
    return fYShuffle(deck)
  }

  const buy = (number) => {
    return deck.splice(-number)
  }

  const putBack = (cards) => {
    deck.unshift(...cards)
    return deck
  }

  const cut = (index) => {
    const l = deck.length
    index = index || Math.floor(Math.random() * l)
    index = index % l || Math.floor(l / 2)
    const cutted = buy(index)
    putBack(...cutted)
    return cutted
  }

  return {
    deck,
    get,
    generate,
    shuffle,
    cut,
    buy,
    putBack
  }
}

export default Deck
