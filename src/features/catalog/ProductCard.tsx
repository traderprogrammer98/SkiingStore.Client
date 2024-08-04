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
interface Props {
  product: Product
}
const ProductCard = ({ product }: Props) => {
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
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button>Add To Cart</Button>
        <Button component={NavLink} to={`/catelog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
