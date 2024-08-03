import { Fragment } from "react"
import { Button } from "antd"
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"
interface Props {
  products: Product[]
  addProducts: () => void
}
const Catalog = ({ products, addProducts }: Props) => {
  return (
    <Fragment>
      <ProductList products={products} />
      <Button type="primary" onClick={addProducts}>
        Add Product
      </Button>
    </Fragment>
  )
}

export default Catalog
