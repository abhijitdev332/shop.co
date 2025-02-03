import Modal from "./Modal";
import { FaRegTrashCan } from "react-icons/fa6";

const DeleteModal = ({ modalRef, style = "", func, ...others }) => {
  return (
    <Modal modalRef={modalRef} style={style}>
      <div className="card flex justify-center flex-col gap-3 items-center">
        <div className="flex justify-center border-spacing-1 bg-red-400 w-20 rounded-full p-5">
          <span>
            <FaRegTrashCan size={30} color="white" />
          </span>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-bold text-xl">Delete Product and Variants!!</h3>
          <p className="py-4">Press Delete or Cancel !!</p>
        </div>

        <div className="btn-group w-full px-5 flex justify-between">
          <button
            className="btn btn-outline text-lg font-medium"
            onClick={() => {
              if (modalRef?.current) {
                modalRef.current?.close();
              }
            }}
          >
            Cancel
          </button>
          <button className="btn btn-error text-lg font-medium" onClick={func}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
