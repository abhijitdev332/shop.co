import { useRef } from "react";
import { GrSort } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { ReviewCard } from "../component";

export function ProductReviews({ reviews = [], totalReviews = 0 }) {
  const modalRef = useRef(null);
  return (
    <>
      <section>
        <div className="wrapper">
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-4 justify-between">
              <h3 className="flex space-x-1 items-center">
                <span className="font-bold text-lg">All Reviews</span>
                <span className="text-sm text-gray-rounded-badge ">
                  ({totalReviews})
                </span>
              </h3>
              {/* fillter and write review */}
              <div className="flex gap-3 items-center">
                <div className="rounded-full bg-gray-300 p-3 ">
                  <GrSort />
                </div>
                <div className="rounded-badge bg-gray-300 px-3 py-2 flex gap-1 items-center ">
                  <span>Latest</span>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </div>
                <button
                  className="rounded-badge px-3 py-2  text-sm bg-black text-white"
                  onClick={() => modalRef.current?.showModal()}
                >
                  Write a Review
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {reviews.map((ele) => (
                <ReviewCard
                  customerName={ele?.name}
                  stats={ele?.rating}
                  reviewText={ele?.comment}
                />
              ))}
            </div>
            <div className="flex w-full justify-center">
              <button className="btn rounded-badge  btn-active capitalize">
                Load more Reviews
              </button>
            </div>
          </div>
        </div>
      </section>

      <dialog
        id="my_modal_5"
        ref={modalRef}
        className="modal modal-bottom  sm:modal-middle"
      >
        <div className="modal-box bg-primary">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ProductReviews;
