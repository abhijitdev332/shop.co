import React from "react";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { id } = useParams();
  return <div>CategoryProducts for {id}</div>;
};

export default CategoryProducts;
