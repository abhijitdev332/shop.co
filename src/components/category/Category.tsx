import React from "react";

const Category = () => {
  const category = [
    {
      cataName: "casual",
      cataimage: "",
    },
    {
      cataName: "formal",
      cataimage: "",
    },
    {
      cataName: "party",
      cataimage: "",
    },
    {
      cataName: "gym",
      cataimage: "",
    },
  ];
  return (
    <section>
      <div className="wrapper">
        <div className="card w-[90%] mx-auto p-7 rounded-2xl bg-gray-300">
          <h2 className="uppercase text-3xl font-bold  text-center text-black py-6">
            browse by dress style
          </h2>

          <div className="grid grid-cols-3 gap-4 py-10">
            {category.map((ele, i) => {
              if (i + 1 == 2) {
                return (
                  <div
                    className="col-span-2 h-60"
                    style={{ background: `url(${ele.cataimage})` }}
                  >
                    {ele.cataName}
                  </div>
                );
              } else if (i + 1 == 3) {
                return (
                  <div
                    className="col-span-2 h-60"
                    style={{ background: `url(${ele.cataimage})` }}
                  >
                    {ele.cataName}
                  </div>
                );
              } else {
                return (
                  <div
                    className="h-60"
                    style={{ background: `url(${ele.cataimage})` }}
                  >
                    {ele.cataName}
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
