import { Typography, Grid } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Grid container>
        {basket && <BasketTable items={basket.basketItems} isBasket={false} />}
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
}
