import Deck from "../../../game/schemes/deck.js";
// import suits from "../../../game/utils/suits";
// import ranks from "../../../game/utils/ranks";

describe("new deck", () => {
  it("is an empty deck", () => {
    const deck = Deck();
    expect(deck.get()).toStrictEqual([]);
  });

  it("is a new deck", () => {
    const deck = Deck();
    deck.generate();
    expect(deck.get().length).toBe(52);
    deck.get().forEach((card) => {
      expect(card).toMatchObject({
        suit: expect.any(String),
        rank: expect.any(String),
      });
    });
  });

  // test each method inside Deck()
});
