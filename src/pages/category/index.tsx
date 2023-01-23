import { useState, FormEvent, useEffect } from "react";
import { toast } from "react-toastify";

import { canSSRAuth } from "@/utils/canSSRAuth";

import styles from "./styles.module.scss";
import Head from "@/components/Head";
import Header from "@/components/Header";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { api } from "@/services/apiClient";

type ItemResponse = {
  id: string;
  name: string;
};

export default function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  function getCategories() {
    api
      .get("/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => console.log(err.response.data));
  }

  useEffect(() => {
    getCategories();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!categoryName) {
      toast.warn("Preencha o nome da categoria");
      return;
    }

    setLoading(true);

    api
      .post("/category", { name: categoryName })
      .then((res) => {
        toast.success(`categoria cadastrada`);
        getCategories();
        setCategoryName("");
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR ", err.response.data);
        toast.error("categoria já existe");
        setLoading(false);
      });
  }

  return (
    <>
      <Head title="Nova categoria" />
      <main className={styles.container}>
        <Header />
        <div className={styles.content}>
          <h1>Cadastrar categoria</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              placeholder="nome categoria"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Button loading={loading} type="submit">
              Cadastrar
            </Button>
          </form>

          <div className={styles.categories}>
            {categories.map((item: ItemResponse, index) => (
              <div key={index}> {item.name}</div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
