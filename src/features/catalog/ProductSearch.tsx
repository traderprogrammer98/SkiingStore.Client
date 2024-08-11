import { debounce, TextField } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { setProductParams } from "./catelogSlice"
import { useState } from "react"

const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.catelog)
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState(productParams.search)
  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ search: event.target.value }))
  }, 1000)
  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={search || ""}
      onChange={(event: any) => {
        setSearch(event.target.value)
        debouncedSearch(event)
      }}
    />
  )
}

export default ProductSearch
