import { useRef, useState } from "react";
import { GrSort } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { LoaderBtn, ReviewCard } from "../component";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { newReview } from "../../querys/productQuery";

export function ProductReviews({
  reviews = [],
  totalReviews = 0,
  productId = "",
}) {
  const queryclient = useQueryClient();
  const { userDetails } = useSelector((store) => store.user);
  let userId = userDetails?._id;
  const modalRef = useRef(null);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleStarHover = (index: number) => {
    setHoverRating(index);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };
  const { mutate: reviewMutaion, isPending } = useMutation({
    mutationKey: ["addreview", productId],
    mutationFn: ({ id, data }) => newReview({ id, data }),
    onSuccess: (data) => {
      modalRef.current.close();
      toast.success(data?.data?.message);
      setRating(0);
      setComment("");
      queryclient.invalidateQueries(["product", productId]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment == "") {
      return toast.info("Please enter a valid comment!!");
    }
    // Perform the form submission logic here
    reviewMutaion({ id: productId, data: { userId, rating, comment } });
  };

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
            <div className="flex flex-wrap justify-center gap-3">
              {reviews.map((ele) => (
                <ReviewCard
                  customerName={ele?.user?.username}
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
        <div className="modal-box bg-white">
          <div className="wrapper">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center p-3"
            >
              {/* Star Rating */}
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span>
                    <FaStar
                      size={24}
                      className={`cursor-pointer transition-all ${
                        (hoverRating || rating) >= star
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                    />
                  </span>
                ))}
                {/* Text Review */}
              </div>
              <textarea
                className="w-full p-2 border rounded-lg resize-none bg-transparent"
                rows={4}
                placeholder="Write your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              {/* Submit Button */}
              <div className="mt-4">
                <LoaderBtn
                  type="submit"
                  pending={isPending}
                  className="w-full !btn btn-neutral"
                >
                  Submit Review
                </LoaderBtn>
              </div>
            </form>
          </div>
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
