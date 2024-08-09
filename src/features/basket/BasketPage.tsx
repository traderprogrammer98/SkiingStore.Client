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
import { useStoreContext } from "../../app/context/StoreContext"
import { Add, Remove } from "@mui/icons-material"
import { useState } from "react"
import agent from "../../app/api/agent"
import { LoadingButton } from "@mui/lab"
import BasketSummary from "./BasketSummary"
import { currencyFormat } from "../../app/utils/utils"

const BasketPage = () => {
  const { basket, setBasket } = useStoreContext()
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  })
  const handleAddItem = (productId: number) => {
    setStatus({
      loading: true,
      name: "add" + productId.toString(),
    })
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() =>
        setStatus({
          loading: false,
          name: "",
        })
      )
  }
  const handleRemove = (productId: number, quantity = 1, name = "removeQ") => {
    setStatus({
      loading: true,
      name: name + productId.toString(),
    })
    agent.Basket.removeItem(productId, quantity)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() =>
        setStatus({
          loading: false,
          name: "",
        })
      )
  }
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
                    loading={
                      status.loading &&
                      status.name === "removeQ" + item.productId.toString()
                    }
                    onClick={() => handleRemove(item.productId)}
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    color="success"
                    loading={
                      status.loading &&
                      status.name === "add" + item.productId.toString()
                    }
                    onClick={() => handleAddItem(item.productId)}
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
                    loading={
                      status.loading &&
                      status.name === "removeP" + item.productId.toString()
                    }
                    onClick={() =>
                      handleRemove(item.productId, item.quantity, "removeP")
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
