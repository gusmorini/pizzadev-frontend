import Image from "next/image";
import Head from "@/components/Head";
import styles from "@/styles/home.module.scss";
import logoImg from "../../public/logo.svg";

import { Input, TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Head title="faça seu login" />
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo pizza dev" />
        <div className={styles.login}>
          <form action="#">
            <Input type={"email"} placeholder={"seu e-mail"} />
            <Input type={"password"} placeholder="sua senha" />
            <Button loading={false}>Acessar</Button>
          </form>
        </div>
      </div>
    </>
  );
}
