import { Fragment, useEffect, useState } from "react"
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"
import agent from "../../app/api/agent"
import LoadingComponent from "../../app/layout/LoadingComponent"
const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    agent.Catelog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <LoadingComponent />
  return (
    <Fragment>
      <ProductList products={products} />
    </Fragment>
  )
}

export default Catalog
