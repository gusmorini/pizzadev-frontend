import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

import Head from "@/components/Head";
import Header from "@/components/Header";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

import styles from "./styles.module.scss";

import Modal from "react-modal";

import ModalOrder from "@/components/ModalOrder";

type OrderItemProps = {
  id: string;
  table: number | string;
  status: boolean;
  draft: boolean;
  name: string | null;
};

interface OrderProps {
  orderList: OrderItemProps[];
}

export type ModalItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: {
    id: string;
    table: number | string;
    status: boolean;
    draft: boolean;
    name: string | null;
  };
};

export default function Dashboard({ orderList }: OrderProps) {
  const [orders, setOrders] = useState(orderList || []);

  const [modalItem, setModalItem] = useState<ModalItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);

  const handleItem = async (id: string) => {
    const api = setupAPIClient();
    const response = await api.get(`/order/${id}`);

    setModalItem(response.data);
    setModalVisible(true);
  };

  Modal.setAppElement("#__next");

  return (
    <>
      <Head title="pedidos" />
      <div>
        <Header />

        <div className={styles.list}>
          <h1>
            Últimos Pedidos
            <button>
              <FiRefreshCcw />
            </button>{" "}
          </h1>
          <ul>
            {orders.map((item) => {
              return (
                <li key={item.id}>
                  <button onClick={() => handleItem(item.id)}>
                    Mesa {item.table}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={closeModal}
            order={modalItem}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setupAPIClient(ctx);
  const response = await api.get("/order");

  return {
    props: {
      orderList: response.data,
    },
  };
});
