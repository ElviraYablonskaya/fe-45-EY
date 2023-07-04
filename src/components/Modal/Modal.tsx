import ReactModal from "react-modal";
import { Children } from "../../@types";
import { FC } from "react";
import style from "./Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: Children;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={style.modal}
    >
      <div onClick={onClose} className={style.closeIcon}>
        <AiOutlineClose size={22} />
      </div>
      {children}
    </ReactModal>
  );
};

export default Modal;
