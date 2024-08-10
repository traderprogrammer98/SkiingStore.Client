import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  Avatar,
} from "@mui/material"
import { Product } from "../../app/models/product"
import { NavLink } from "react-router-dom"
import { LoadingButton } from "@mui/lab"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { addBasketItemAsync } from "../basket/basketSlice"
import { currencyFormat } from "../../app/utils/utils"
interface Props {
  product: Product
}
const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch()
  const { status, basket } = useAppSelector((state) => state.basket)

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: {
            fontWeight: "bold",
            color: "secondary.main",
          },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.pictureUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="secondary">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={status.includes("pending" + product.id)}
          onClick={() =>
            dispatch(addBasketItemAsync({ productId: product.id, quantity: 1 }))
          }
          size="small"
        >
          Add to Cart
        </LoadingButton>
        <Button component={NavLink} to={`/catelog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
