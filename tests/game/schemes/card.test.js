import Card from "../../../game/schemes/card.js";

test("card is Ace of Hearts", () => {
  let card = Card("hearts", "A");
  expect(card).not.toBeNull();
  expect(card.suit).toBe("hearts");
  expect(card.rank).toBe("A");
  expect(Object.keys(card).length).toBe(2);
});
