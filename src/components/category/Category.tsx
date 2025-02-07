import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cl from "classnames";
import style from "./category.module.scss";
const Category = () => {
  const { category } = useSelector((store) => store.category);
  return (
    <section>
      <div className="wrapper">
        <div className="card w-[90%] mx-auto p-7 rounded-2xl">
          <h2 className="uppercase text-3xl font-bold  text-center text-black py-6">
            browse by dress style
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10">
            {category?.map((ele) => {
              return (
                <div className=" w-auto rounded-lg relative overflow-hidden">
                  <Link to={`/product/category/${ele.categoryName}`}>
                    <img
                      src={ele?.categoryImage}
                      className="w-full h-full"
                      alt="image"
                    />
                    <div className="flex h-full justify-center items-center">
                      <p
                        className={cl(
                          "text-5xl absolute top-1/2 left-0 text-gray-900  font-bold uppercase",
                          style.title
                        )}
                      >
                        {ele.categoryName}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
