import Button from "@material-ui/core/Button";
import { CartItemType } from "../../App";
import "./CartItem.css";

interface Props {
  item: CartItemType;
  addToCart: (addedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}
const CartItem = ({ item, addToCart, removeFromCart }: Props) => {
  return (
    <div className="cartItems-container">
      <div className="inner-cartItems">
        <h3>{item.title}</h3>
        <div className="product-info">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <div className="cart-image">
        <img src={item.image} alt={item.title} />
      </div>
    </div>
  );
};

export default CartItem;
