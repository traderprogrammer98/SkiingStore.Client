import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catelogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckBoxGroup from "../../app/components/CheckBoxGroup";
import AppPagination from "../../app/components/AppPagination";
const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "price", label: "Price - Low to High" },
  { value: "priceDesc", label: "Price - High to Low" },
];
const Catalog = () => {
  const dispatch = useAppDispatch();
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catelog);
  const products = useAppSelector(productSelectors.selectAll);
  const [value, setValue] = useState("name");
  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);
  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchFiltersAsync());
    }
  }, [filtersLoaded, dispatch]);
  if (!filtersLoaded) return <LoadingComponent />;
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <RadioButtonGroup
            options={sortOptions}
            selectedValue={value}
            onChange={(e) => {
              dispatch(setProductParams({ sortBy: e.target.value }));
              setValue(e.target.value);
            }}
          />
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <CheckBoxGroup
            items={brands}
            checked={productParams.brands}
            onClick={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
        </Paper>
        <Paper sx={{ p: 2 }}>
          <CheckBoxGroup
            items={types}
            checked={productParams.types}
            onClick={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageClick={(page) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Catalog;
