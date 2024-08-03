import { Fragment, useEffect, useState } from "react"
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    fetch("https://localhost:7190/api/Products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data), console.log(data)
      })
  }, [])
  return (
    <Fragment>
      <ProductList products={products} />
    </Fragment>
  )
}

export default Catalog
