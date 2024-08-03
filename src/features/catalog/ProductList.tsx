import { Product } from "../../app/models/product"
import { List, Avatar } from "antd"
import ProductCard from "./ProductCard"
interface Props {
  products: Product[]
}
const ProductList = ({ products }: Props) => {
  return (
    <List
      dataSource={products}
      renderItem={(product) => <ProductCard product={product} />}
    />
  )
}

export default ProductList
