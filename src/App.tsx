// import { useState} from 'react';
// import Drawer from '@material-ui/core/Drawer';
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useQuery } from "react-query";
// import { Wrapper } from "./AppStyles";
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// import Badge from '@material-ui/core/Badge';
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

function App() {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);

  const getTotalItems = () => null;

  const handleAddToCart = (addedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Opps!! Something went wrong ..</div>;

  return (
    // <Wrapper>
    <Grid container spacing={3}>
      {data?.map((item) => (
        <Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
    </Grid>
    // </Wrapper>
  );
}

export default App;
