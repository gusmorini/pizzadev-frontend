import Modal from "react-modal";
import styles from "./styles.module.scss";

import { FiX } from "react-icons/fi";
import { ModalItemProps } from "@/pages/dashboard";

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleFinishOrder: (id: string) => void;
  order?: ModalItemProps[];
}

export default function ModalOrder({
  isOpen,
  onRequestClose,
  handleFinishOrder,
  order,
}: ModalOrderProps) {
  const table = order ? order[0].order.table : "";
  let total = 0;
  const id = order ? order[0].id : "";

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
      className={styles.Modal}
      overlayClassName={styles.Overlay}
    >
      <a
        href="#"
        type="button"
        onClick={onRequestClose}
        className={`react-modal-close ${styles.close}`}
      >
        <FiX />
      </a>

      <div className={styles.content}>
        <h2>Detalhes do pedido</h2>
        <h3>Mesa {table} </h3>
        <ul>
          {order?.map((item) => {
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
          <h4>
            <strong>Total</strong> {formatMoney(total)}
          </h4>
          <button onClick={() => handleFinishOrder(id)}>concluir pedido</button>
        </div>
      </div>
    </Modal>
  );
}
