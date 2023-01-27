import Modal from "react-modal";
import styles from "./styles.module.scss";

import { FiX } from "react-icons/fi";

import { ModalItemProps } from "@/pages/dashboard";

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order?: ModalItemProps[];
}

export default function ModalOrder({
  isOpen,
  onRequestClose,
  order,
}: ModalOrderProps) {
  const customStyleModal = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "2rem",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
    },
  };

  console.log(order);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyleModal}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className={`react-modal-close ${styles.close}`}
      >
        <FiX />
      </button>

      <div className={styles.content}>
        <h1>Detalhes do pedido</h1>
        <h3>Mesa </h3>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>

        <div className={styles.total}>
          <h3>Total</h3>
          <h4>R$ 0,00</h4>
        </div>

        <button>concluir pedido</button>
      </div>
    </Modal>
  );
}
