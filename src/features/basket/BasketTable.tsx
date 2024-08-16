import { Remove, Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { currencyFormat } from "../../app/utils/utils";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

const BasketTable = ({ items, isBasket = true }: Props) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.basket);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display={"flex"} alignItems={"center"}>
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{ marginRight: "20px", height: "50px" }}
                  />
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}</TableCell>
              <TableCell align="right">
                {isBasket && (
                  <LoadingButton
                    color="error"
                    loading={status.includes("pending" + item.productId)}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                        })
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                )}

                {item.quantity}
                {isBasket && (
                  <LoadingButton
                    color="success"
                    loading={status.includes("pending" + item.productId)}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                        })
                      )
                    }
                  >
                    <Add />
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align="right">
                {currencyFormat(item.quantity * item.price)}
              </TableCell>
              <TableCell align="right">
                {isBasket && (
                  <LoadingButton
                    aria-label="delete"
                    size="small"
                    color="error"
                    loading={status.includes("pending" + item.productId)}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                        })
                      )
                    }
                  >
                    <DeleteIcon fontSize="medium" />
                  </LoadingButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketTable;
