import { List, Avatar } from "antd"
import { Product } from "../../app/models/product"
interface Props {
  product: Product
}
const ProductCard = ({ product }: Props) => {
  return (
    <List.Item key={product.id}>
      <List.Item.Meta
        avatar={<Avatar src={product.pictureUrl} />}
        description={`${product.name} - ${product.price}`}
      />
    </List.Item>
  )
}

export default ProductCard
