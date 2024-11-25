import { createContext, useState, useContext } from "react";
const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);
export const ModalContextProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [message, setMessage] = useState(null);
  const handleModalClose = () => {
    setActiveModal(null);
  };
  const handleModalShow = (modalId, message) => {
    setActiveModal(modalId);
    setMessage(message);
  };
  return (
    <ModalContext.Provider
      value={{ activeModal, handleModalShow, handleModalClose, message }}
    >
      {children}
    </ModalContext.Provider>
  );
};
