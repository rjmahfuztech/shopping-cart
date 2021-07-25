import { CartItemType } from "../../App";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

interface Props {
  cartItems: CartItemType[];
  addToCart: (addedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}
const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
  const totalAmount = (items: CartItemType[]) => {
    return items.reduce(
      (ack: number, item) => ack + item.amount * item.price,
      0
    );
  };
  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in the cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${totalAmount(cartItems).toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
