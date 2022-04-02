import classes from "./BidProducts.module.scss";
import { Form, Spinner } from "react-bootstrap";
import {
  loadingErrorMessage,
  emptyProductMessage,
} from "../../constants/messages";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import axios from "axios";

export interface IProducts {
  list: any[];
  isLoading: boolean;
  error: string | null;
  active: number;
}

interface IProps {
  products: IProducts;
  setProducts: Dispatch<SetStateAction<IProducts>>;
  setPasspordFields: Dispatch<SetStateAction<boolean>>;
}

const BidProducts: FC<IProps> = ({
  setPasspordFields,
  products,
  setProducts,
}) => {
  const handleProductClick = (id: number): void => {
    if (id === 10) setPasspordFields(true);
    else setPasspordFields(false);
    setProducts((prev) => ({ ...prev, active: id }));
  };

  const loadProducts = async () => {
    setProducts((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users?limit=10"
      );
      setProducts((prev) => ({
        ...prev,
        list: Array.isArray(response?.data) ? response.data : [],
        active: Array.isArray(response?.data) ? response.data[0].id : 0,
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
          <Form.Check
            key={product.id}
            type="radio"
            label={product.username}
            id={product.id}
            checked={product.id === products.active}
            onChange={() => handleProductClick(product.id)}
          />
        ))
      )}
    </div>
  );
};

export default BidProducts;
