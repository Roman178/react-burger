import { useCallback, useState } from "react";

const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  return { isOpenModal, closeModal, openModal };
};

export { useModal };
