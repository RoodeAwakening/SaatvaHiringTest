function AddToCart(cartItems){
 // increment state by 1 and return it
 return (cartItems + 1);
}

try {
  module.exports = AddToCart;
} catch {
  module.exports = null;
}