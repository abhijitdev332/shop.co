export function ProductDetails({ details = {} }) {
  delete details?._id;
  return (
    <section>
      <div className="wrapper">
        <div className="flex flex-col gap-3">
          {Object.entries(details)?.map((ele) => (
            <p className="flex gap-2">
              <span className="font-medium text-lg capitalize">{ele[0]}:</span>
              <span className="capitalize font-medium">{ele[1]}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
