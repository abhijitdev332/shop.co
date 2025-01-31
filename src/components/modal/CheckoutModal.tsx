const CheckoutModal = ({
  url,
  isOpen,
  onClose,
}: {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="bg-white rounded-lg p-4 w-[90%] max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✖
        </button>

        {/* iFrame for Stripe Checkout */}
        <iframe
          src={url}
          className="w-full h-[500px] rounded-lg border"
          title="Stripe Checkout"
        ></iframe>
      </div>
    </div>
  );
};

export default CheckoutModal;
