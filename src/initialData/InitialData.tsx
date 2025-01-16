import { useEffect } from "react";
import { AxiosInt } from "../services/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../services/store/products/productSlice";

const InitialData = () => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const fetchData = async (url: string, signal: AbortSignal) => {
    let res = await AxiosInt.get(url, {
      signal: signal,
    });
    if (res.status == 200) {
      dispatch(setProducts(res.data));
    }
  };
  useEffect(() => {
    let abortCon = new AbortController();
    // calls fetch data
    if (product?.length > 0) {
      return;
    }
    fetchData("/products", abortCon.signal);
    return () => abortCon.abort();
  }, []);

  return null;
};

export default InitialData;
