import Button from "@material-ui/core/Button";
// import { Wrapper } from "./Item.styles";
import { CartItemType } from "../../App";

interface Props {
  item: CartItemType;
  handleAddToCart: (addedItem: CartItemType) => void;
}

const Item = ({ item, handleAddToCart }: Props) => {
  return (
    // <Wrapper>
    <div>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>{item.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </div>
    // </Wrapper>
  );
};

export default Item;
