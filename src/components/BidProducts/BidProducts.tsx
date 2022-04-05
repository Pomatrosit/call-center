import classes from "./BidProducts.module.scss";
import { Form, Spinner } from "react-bootstrap";
import {
  loadingErrorMessage,
  emptyProductMessage,
} from "../../constants/messages";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import axios from "axios";
import { IProduct } from "../../common-types/product";

export interface IProducts {
  list: IProduct[];
  isLoading: boolean;
  error: string | null;
  active: number;
}

interface IProps {
  products: IProducts;
  setProducts: Dispatch<SetStateAction<IProducts>>;
  setPasspordFields: Dispatch<SetStateAction<boolean>>;
  setCreditFields: Dispatch<SetStateAction<boolean>>;
}

const BidProducts: FC<IProps> = ({
  setPasspordFields,
  setCreditFields,
  products,
  setProducts,
}) => {
  const handleProductClick = (id: number): void => {
    if (id === 10) setPasspordFields(true);
    else setPasspordFields(false);
    if (id === 9) setCreditFields(true);
    else setCreditFields(false);
    setProducts((prev) => ({ ...prev, active: id }));
  };

  const loadProducts = async () => {
    setProducts((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axios.get("products/list");
      const mainProduct = response.data.find(
        (prod: IProduct) => prod.main === true
      );
      setProducts((prev) => ({
        ...prev,
        list: response.data,
        active: mainProduct ? mainProduct.id : 0,
      }));
    } catch (e) {
      setProducts((prev) => ({ ...prev, error: loadingErrorMessage }));
    } finally {
      setProducts((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    loadProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h5 className={classes.subtitle}>Продукт</h5>
      {products.isLoading ? (
        <div className={classes.loader}>
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : products.error ? (
        <p className={classes.errorMessage}>{loadingErrorMessage}</p>
      ) : !products.list.length ? (
        <p className={classes.emptyMessage}>{emptyProductMessage}</p>
      ) : (
        products.list.map((product) => (
          <div key={product.id} className={classes.itemWrapper}>
            <Form.Check
              className={classes.item}
              type="radio"
              label={product.name}
              id={String(product.id)}
              checked={product.id === products.active}
              onChange={() => handleProductClick(product.id)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default BidProducts;
