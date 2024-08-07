import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Typography } from "@mui/material";

const BasketPage = () => {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);
  useEffect(() => {
    agent.Basket.get()
      .then(() => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  });
  if (loading) return <LoadingComponent messsage="Loading Basket..." />;
  if (!basket)
    return (
      <Typography variant="h2" color={"secondary"}>
        Basket is Empty
      </Typography>
    );
  return <Typography variant="h1">{basket.buyerId}</Typography>;
};

export default BasketPage;
