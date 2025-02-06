import React from "react";

const TableBody = ({ columnsData = [], renderItem }) => {
  return (
    <tbody className="overflow-x-auto">
      {columnsData?.map((item, inx, arr) => renderItem(item, inx, arr))}
    </tbody>
  );
};

export default TableBody;
