import React from "react";
import cl from "classnames";
const Modal = ({ modalRef, style = "", children, ...others }) => {
  return (
    <>
      <dialog id="my_modal_2" className="modal" ref={modalRef} {...others}>
        <div className={cl("modal-box bg-white", style)}>
          <div className="wrapper">{children}</div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
