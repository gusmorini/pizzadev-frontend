import { FormEvent, useContext } from "react";
import Image from "next/image";
import Head from "@/components/Head";
import styles from "@/styles/home.module.scss";
import logoImg from "../../public/logo.svg";

import { Input, TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

import { AuthContext } from "@/contexts/AuthContext";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    console.log(event);
    const data = {
      email: "teste@test",
      password: "123456",
    };
    await signIn(data);
  }

  return (
    <>
      <Head title="faça seu login" />
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo pizza dev" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input name="email" type="email" placeholder="seu e-mail" />
            <Input name="password" type="password" placeholder="sua senha" />
            <Button loading={false} type="submit">
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
