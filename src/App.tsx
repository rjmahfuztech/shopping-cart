import Badge from "@material-ui/core/Badge";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useState } from "react";
import { useQuery } from "react-query";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Item from "./components/Item/Item";

export interface CartItemType {
  id: number;
  description: string;
  category: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0);
  };

  const handleAddToCart = (addedItem: CartItemType) => {
    setCartItems((hasItem) => {
      const isItemInCart = hasItem.find((item) => item.id === addedItem.id);

      if (isItemInCart) {
        return hasItem.map((item) =>
          item.id === addedItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }

      return [...hasItem, { ...addedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((hasItem) =>
      hasItem.reduce((ok, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ok;
          return [...ok, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ok, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Opps!! Something went wrong ..</div>;

  return (
    <div className="main-container">
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <IconButton onClick={() => setCartOpen(true)} className="icon-button">
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </IconButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
