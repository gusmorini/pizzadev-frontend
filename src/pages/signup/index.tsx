import Image from "next/image";
import Head from "@/components/Head";
import styles from "@/styles/home.module.scss";
import logoImg from "@/../public/logo.svg";

import { Input, TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <Head title="faça seu cadastro" />
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo pizza dev" />
        <div className={styles.login}>
          <h1>Faça seu cadastro</h1>
          <form action="#">
            <Input type="text" placeholder="seu nome" />
            <Input type="email" placeholder={"seu e-mail"} />
            <Input type="password" placeholder="sua senha" />
            <Button loading={false}>Cadastrar</Button>
          </form>
          <Link href="/">
            <span className={styles.link}>Já possui conta? Faça o login</span>
          </Link>
        </div>
      </div>
    </>
  );
}
