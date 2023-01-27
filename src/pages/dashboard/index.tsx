import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

import Head from "@/components/Head";
import Header from "@/components/Header";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

import styles from "./styles.module.scss";

type OrderItem = {
  id: string;
  table: number | string;
  status: boolean;
  draft: boolean;
  name: string | null;
};

interface OrderRequest {
  orderList: OrderItem[];
}

export default function Dashboard({ orderList }: OrderRequest) {
  const [orders, setOrders] = useState(orderList || []);

  const handleItem = async (id: string) => {
    const api = setupAPIClient();
    const response = await api.get(`/order/${id}`);
    console.log("RESPONSE ", response.data);
  };

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
