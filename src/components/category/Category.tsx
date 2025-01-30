import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Category = () => {
  const { category } = useSelector((store) => store.category);

  return (
    <section>
      <div className="wrapper">
        <div className="card w-[90%] mx-auto p-7 rounded-2xl">
          <h2 className="uppercase text-3xl font-bold  text-center text-black py-6">
            browse by dress style
          </h2>

          <div className="grid grid-cols-3 gap-4 py-10">
            {category?.map((ele, i) => {
              if (i + 1 == 2) {
                return (
                  <div
                    className="col-span-2 h-60 rounded-lg"
                    style={{
                      background: `url(${ele.categoryImage})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "top center",
                    }}
                  >
                    <Link to={`/product/category/${ele.categoryName}`}>
                      <div className="flex h-full justify-center items-center">
                        <p className="text-4xl  font-bold uppercase">
                          {ele.categoryName}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              } else if (i + 1 == 3) {
                return (
                  <div
                    className="col-span-2 h-60 rounded-lg"
                    style={{
                      background: `url(${ele.categoryImage})`,
                      backgroundPosition: "center center",
                    }}
                  >
                    <Link to={`/product/category/${ele.categoryName}`}>
                      <div className="flex h-full justify-center items-center">
                        <p className="text-4xl  font-bold uppercase">
                          {ele.categoryName}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              } else {
                return (
                  <div
                    className="h-60 rounded-xl"
                    style={{ background: `url(${ele.categoryImage})` }}
                  >
                    <Link to={`/product/category/${ele.categoryName}`}>
                      <div className="flex h-full justify-center items-center">
                        <p className="text-4xl  font-bold uppercase">
                          {ele.categoryName}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
