import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductAsync, productSelectors } from "./catelogSlice";

const ProductDetails = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, Number(id))
  );
  const { status: productStatus } = useAppSelector((state) => state.catelog);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.basketItems.find(
    (item) => item.productId === product?.id
  );
  const handleInputChange = (event: any) => {
    if (parseInt(event.target.value) > 0) {
      setQuantity(parseInt(event.target.value));
    }
  };
  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
    if (!product) dispatch(fetchProductAsync(Number(id)));
  }, [id, item, product, dispatch]);

  if (productStatus.includes("pending")) return <LoadingComponent />;
  if (!product) return <h3>product not found</h3>;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" color={"secondary"}>
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="quantity in cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="outlined"
              fullWidth
            >
              {item ? "Update quantity" : "Add to cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
