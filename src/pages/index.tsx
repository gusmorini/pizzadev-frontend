import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Head from "@/components/Head";
import styles from "@/styles/home.module.scss";
import logoImg from "../../public/logo.svg";

import { Input, TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

import { AuthContext } from "@/contexts/AuthContext";
import { canSSRGuest } from "@/utils/canSSRGuest";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (!email || !password) {
      toast.warning("Preencha todos os campos");
      return;
    }

    const data = {
      email,
      password,
    };
    setLoading(true);
    await signIn(data);
    setLoading(false);
  }

  return (
    <>
      <Head title="faça seu login" />
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo pizza dev" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button loading={loading} type="submit">
              Acessar
            </Button>
          </form>
          <Link href="/signup">
            <span className={styles.link}>
              Não possui uma conta? Cadastre-se
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
