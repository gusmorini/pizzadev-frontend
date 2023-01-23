import { useState, FormEvent } from "react";
import styles from "./styles.module.scss";
import Head from "@/components/Head";
import Header from "@/components/Header";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log("CATEGORY", categoryName);
  };

  return (
    <>
      <Head title="Nova categoria" />
      <main className={styles.container}>
        <Header />
        <div className={styles.content}>
          <h1>Nova categoria</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              placeholder="nome nova categoria"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Button loading={loading} type="submit">
              Cadastrar
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
