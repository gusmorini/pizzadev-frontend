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

  const table = order ? order[0].order.table : "";
  let total = 0;

  const formatMoney = (value: string | number = 0) => {
    return Number(value).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      // style={customStyleModal}
      className={styles.Modal}
      overlayClassName={styles.Overlay}
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
        <h3>Mesa {table} </h3>
        <ul>
          {order?.map((item) => {
            console.log("ITEM ", item);

            total += item.amount * Number(item.product.price) || 0;

            return (
              <li>
                <p>
                  {item.amount}
                  <strong>{item.product.name}</strong>{" "}
                  {formatMoney(item.product.price)}
                </p>
                <small>{item.product.description}</small>
              </li>
            );
          })}
        </ul>

        <div className={styles.total}>
          <h3>Total</h3>
          <h4>{formatMoney(total)}</h4>
        </div>

        <button>concluir pedido</button>
      </div>
    </Modal>
  );
}
