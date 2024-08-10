import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { Add, Remove } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import BasketSummary from "./BasketSummary"
import { currencyFormat } from "../../app/utils/utils"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice"

const BasketPage = () => {
  const dispatch = useAppDispatch()
  const { basket, status } = useAppSelector((state) => state.basket)

  if (!basket?.basketItems.length)
    return (
      <Typography variant="h2" color={"secondary"}>
        Basket is Empty
      </Typography>
    )
  return (
    <>
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
            {basket.basketItems.map((item) => (
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
                <TableCell align="right">
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align="right">
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
                  {item.quantity}
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
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.quantity * item.price)}
                </TableCell>
                <TableCell align="right">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  )
}

export default BasketPage
