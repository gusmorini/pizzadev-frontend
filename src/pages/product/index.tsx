import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { toast } from "react-toastify";

import { canSSRAuth } from "@/utils/canSSRAuth";

import styles from "./styles.module.scss";
import Head from "@/components/Head";
import Header from "@/components/Header";

import { Input, Select, TextArea, Files } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { api } from "@/services/apiClient";
import { setupAPIClient } from "@/services/api";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  const [file, setFile] = useState({});
  const [url, setUrl] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { id: category_id } = categories[categorySelected];

    if (!name || !price || !description || !file || !category_id) {
      toast.warning("Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", category_id);
      data.append("file", file as Blob);

      const response = await api.post("/product", data);

      toast.success("produto cadastrado");

      setFile({});
      setCategorySelected(0);
      setName("");
      setPrice("");
      setDescription("");
      setUrl("");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao criar o produto");
    }

    setLoading(false);
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
            <Select
              value={categorySelected}
              onChange={(e) => setCategorySelected(Number(e.target.value))}
            >
              {categories.map((item: ItemProps, index) => (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              ))}
            </Select>
            <Input
              placeholder="nome do item"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="valor"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextArea
              rows={10}
              placeholder="descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextArea>
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
  const api = setupAPIClient(ctx);
  const response = await api.get("/category");

  return {
    props: {
      categoryList: response.data,
    },
  };
});
