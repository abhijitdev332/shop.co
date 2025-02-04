import React from "react";

const TableBody = ({ columnsData = [], renderItem }) => {
  return (
    <tbody className="overflow-x-auto">
      {columnsData?.map((item) => renderItem(item))}
    </tbody>
  );
};

export default TableBody;
