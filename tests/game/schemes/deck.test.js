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
});

describe("deck methods", () => {
  it("should shuffle the deck", () => {
    const deck = Deck();
    deck.generate();
    const before = deck.get().slice();
    deck.shuffle();
    expect(deck.get()).toStrictEqual(expect.arrayContaining(before));
    expect(deck.get()).not.toStrictEqual(before);
  });

  it("should cut the deck", () => {
    const deck = Deck();
    deck.generate();
    const before = deck.get().slice();
    deck.cut();
    expect(deck.get()).toStrictEqual(expect.arrayContaining(before));
    expect(deck.get()).not.toStrictEqual(before);
  });

  it("should buy a card from top of deck", () => {
    const deck = Deck();
    deck.generate();
    const lastCard = deck.get().slice(-1);
    const card = deck.buy(1);
    expect(card).not.toStrictEqual(expect.arrayContaining(deck.get()));
    expect(card).toStrictEqual(lastCard);
  });

  it("should put card on bottom of deck", () => {
    const deck = Deck();
    deck.generate();
    const card = deck.buy(1);
    deck.putBack(card);
    expect(deck.get().slice(0, 1)).toStrictEqual(card);
  });

  it("should empty full deck", () => {
    const deck = Deck();
    deck.generate();
    expect(deck.get().length).toBeGreaterThan(0);
    deck.empty();
    expect(deck.get().length).toBe(0);
  });
});
