import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalContextProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(null);

  const openModal = (component) => {
    setShowModal(true);
    setModal(component);
  };

  const closeModal = () => {
    setShowModal(false);
    setModal(null);
  };

  const changeModal = (component) => {
    setModal(component);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, modal, openModal, closeModal, changeModal }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
