import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductSkeleton";
interface Props {
  products: Product[];
}
const ProductList = ({ products }: Props) => {
  const { productsLoaded } = useAppSelector((state) => state.catelog);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={3} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} key={product.id} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
