import { useEffect } from "react"
import ProductList from "./ProductList"
import LoadingComponent from "../../app/layout/LoadingComponent"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
} from "./catelogSlice"
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import ProductSearch from "./ProductSearch"
const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "price", label: "Price - Low to High" },
  { value: "priceDesc", label: "Price - High to Low" },
]
const Catalog = () => {
  const dispatch = useAppDispatch()
  const { status, productsLoaded, filtersLoaded, brands, types } =
    useAppSelector((state) => state.catelog)
  const products = useAppSelector(productSelectors.selectAll)
  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync())
    }
  }, [productsLoaded, dispatch])
  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchFiltersAsync())
    }
  }, [filtersLoaded, dispatch])
  if (status.includes("pending")) return <LoadingComponent />
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="name"
              name="radio-buttons-group"
            >
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={label}
                  key={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                control={<Checkbox />}
                label={brand}
                key={brand}
              />
            ))}
          </FormGroup>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <FormGroup>
            {types.map((type) => (
              <FormControlLabel
                control={<Checkbox />}
                label={type}
                key={type}
              />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography>show 6 items from 20</Typography>
          <Pagination count={10} color="secondary" />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Catalog
