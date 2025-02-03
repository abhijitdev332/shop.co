import cl from "classnames";

const TableHeader = ({
  columns = [],
  style = "",
  input = false,
  oncheck,
  onchange,
}) => {
  return (
    <>
      <thead className={cl("sticky top-0 bg-gray-200 p-2 z-10", style)}>
        {columns?.map((td, ind) => {
          if (input && ind + 1 == 1) {
            return (
              <th className=" px-4 py-2 text-left">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    //   checked={selectedProducts.length === products?.length}
                    //   onChange={toggleSelectAll}
                    checked={oncheck}
                    onChange={onchange}
                    className="checkbox"
                  />

                  <span>{td}</span>
                </div>
              </th>
            );
          }
          return <th className=" px-4 py-2 text-left">{td}</th>;
        })}
      </thead>
    </>
  );
};

export default TableHeader;
