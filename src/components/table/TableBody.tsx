import React from "react";

const TableBody = ({ columnsData = [], renderItem }) => {
  return <tbody>{columnsData?.map((item) => renderItem(item))}</tbody>;
};

export default TableBody;
