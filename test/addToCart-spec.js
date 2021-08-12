const assert = require("assert");
const AddToCart = require("../src/Components/MattressPage/AddToCart.js");
const expect = require("chai").expect;

describe("Add to cart", () => {
  it("should start at 0", () => {
    expect(AddToCart(0)).to.equal(1);
  });

  it("should increment the carts value", () => {
    expect(AddToCart(1)).to.equal(2);
  });

  it("should add 5 to the cart if ran 5 times", () => {
    expect(AddToCart(5)).to.equal(6);
  });
});
