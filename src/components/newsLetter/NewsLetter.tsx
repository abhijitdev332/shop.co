import { FiMail } from "react-icons/fi";

function NewsLetter() {
  return (
    <section className="py-10 lg:container lg:mx-auto">
      <div className="wrapper  w-[90%] mx-auto rounded-2xl p-10 bg-black ">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <h2 className="uppercase font-extrabold whitespace-normal text-white  md:text-4xl  basis-1/3">
            Stay upto date with about our latest offers
          </h2>
          <div className="flex flex-col justify-center items-center gap-2 basis-1/3">
            <label
              htmlFor=""
              className="flex items-center gap-2   bg-white w-[18rem] py-2 rounded-badge px-2  h-fit"
            >
              <span>
                <FiMail />
              </span>
              <input
                type="text"
                className="bg-transparent outline-none px-2"
                placeholder="Enter Your Mail"
              />
            </label>

            <button className="capitalize w-[18rem] bg-white  btn hover:text-white rounded-badge px-7">
              Subscribe to NewsLetter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
