import { Fragment, useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catelogSlice";
const Catalog = () => {
  const dispatch = useAppDispatch();
  const { status, productsLoades } = useAppSelector((state) => state.catelog);
  const products = useAppSelector(productSelectors.selectAll);
  useEffect(() => {
    if (!productsLoades) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoades]);
  if (status.includes("pending")) return <LoadingComponent />;
  return (
    <Fragment>
      <ProductList products={products} />
    </Fragment>
  );
};

export default Catalog;
