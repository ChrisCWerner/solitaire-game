const createSolitaire = (Deck) => {
  const deck = Deck.get()
  Deck.generate()
  Deck.shuffle()

  const fillColumn = (number) => {
    const column = []
    for (let i = 0; i < number; i++) {
      column.push(deck.pop())
    }
    return column
  }

  const fillAllColumns = () => {
    const columns = []
    for (let i = 0; i < 7; i++) {
      columns.push(fillColumn(i + 1))
    }
    return columns
  }

  return {
    target: {
      hearts: [],
      clubs: [],
      diamonds: [],
      spades: []
    },
    columns: fillAllColumns(),
    Deck
  }
}

export default createSolitaire
