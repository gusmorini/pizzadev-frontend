import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { toast } from "react-toastify";

import { canSSRAuth } from "@/utils/canSSRAuth";

import styles from "./styles.module.scss";
import Head from "@/components/Head";
import Header from "@/components/Header";

import { Input, Select, TextArea, Files } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { api } from "@/services/apiClient";
import { forEachChild, isTemplateExpression } from "typescript";

type ItemCategory = {
  id: string;
  name: string;
};

export default function Product() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [file, setFile] = useState({});
  const [url, setUrl] = useState("");

  function getCategories() {
    api
      .get("/category")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type !== "image/jpeg" && image.type !== "image/png") {
      return;
    }

    setUrl(URL.createObjectURL(image));
    setFile(image);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Head title="Novo produto" />
      <main className={styles.container}>
        <Header />
        <div className={styles.content}>
          <h1>Cadastrar produto</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <Files
              accept="image/png, image/jpeg,"
              url={url}
              onChange={handleUpload}
            />
            <Select>
              {categories.map((category: ItemCategory) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Input placeholder="nome do item" />
            <Input placeholder="valor" />
            <TextArea rows={10} placeholder="descrção"></TextArea>
            <Button loading={loading} type="submit">
              Cadastrar
            </Button>
          </form>
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
