import { Button, Grid, Typography } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Link } from "react-router-dom";
import BasketTable from "./BasketTable";

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket?.basketItems.length)
    return (
      <Typography variant="h2" color={"secondary"}>
        Basket is Empty
      </Typography>
    );
  return (
    <>
      <Grid container>
        <BasketTable items={basket.basketItems} isBasket={true} />
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Button
            color="primary"
            component={Link}
            to={"/checkout"}
            variant="outlined"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
