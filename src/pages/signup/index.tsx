import { useState, FormEvent, useContext } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Head from "@/components/Head";
import styles from "@/styles/home.module.scss";
import logoImg from "@/../public/logo.svg";

import { Input, TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

import { AuthContext } from "@/contexts/AuthContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning("Preencha todos os campos");
      return;
    }

    setLoading(true);
    await signUp({ name, email, password });
    setLoading(false);
  }

  return (
    <>
      <Head title="faça seu cadastro" />
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo pizza dev" />
        <div className={styles.login}>
          <h1>Faça seu cadastro</h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder={"seu e-mail"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button loading={loading}>Cadastrar</Button>
          </form>
          <Link href="/">
            <span className={styles.link}>Já possui conta? Faça o login</span>
          </Link>
        </div>
      </div>
    </>
  );
}
