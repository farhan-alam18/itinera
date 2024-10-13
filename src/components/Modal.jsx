import PropTypes from "prop-types";
import { useModalStore } from "../global/store";

const Modal = ({ children }) => {
  const isModalOpen = useModalStore((state) => state.isModalOpen); 
  if (!isModalOpen) return null; 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white my-5 rounded-lg shadow-lg w-full max-w-md ">
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired, 
  children: PropTypes.node.isRequired,
};

export default Modal;
