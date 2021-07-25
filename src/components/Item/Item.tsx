import Button from "@material-ui/core/Button";
import { CartItemType } from "../../App";
import "./Item.css";

interface Props {
  item: CartItemType;
  handleAddToCart: (addedItem: CartItemType) => void;
}

const Item = ({ item, handleAddToCart }: Props) => {
  return (
    <div className="item-container">
      <div className="item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>{item.price}</h3>
      </div>
      <div className="item-btn">
        <Button className="btn" onClick={() => handleAddToCart(item)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default Item;
