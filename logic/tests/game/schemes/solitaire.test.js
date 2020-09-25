import Solitaire from "../../../game/schemes/solitaire.js";

// TODO test game methods
describe("solitaire game", () => {
  it("should create a new game", () => {
    const solitaire = Solitaire();
    const game = solitaire.newGame();
    expect(game.deck.length).toBe(24);
    expect(game.openCards.length).toBe(0);
    expect(game.target).toMatchObject({
      hearts: [],
      clubs: [],
      diamonds: [],
      spades: [],
    });
    expect(game.columns.length).toBe(7);
    game.columns.forEach((column, index) => {
      expect(column.length).toBe(index + 1);
    });
  });

  it("should create new instance of old game", () => {
    const solitaire = Solitaire();
    const oldGame = solitaire.newGame();
    const newGame = Solitaire({ game: oldGame }).currentGame().currentGame();
    expect(newGame).toMatchObject(oldGame);
    expect(newGame).not.toBe(oldGame);
  });

  
});
