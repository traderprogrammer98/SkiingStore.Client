import { Fragment, useEffect, useState } from "react"
import Catalog from "../../features/catalog/Catalog"
import { Product } from "../models/product"
import SiteLayout from "./SiteHeader"

function App() {
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
      <SiteLayout />
      <Catalog products={products} addProducts={() => {}} />
    </Fragment>
  )
}

export default App
