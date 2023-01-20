import Head from "@/components/Head";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Header from "@/components/Header";

export default function Dashboard() {
  return (
    <>
      <Head title="painel de controle" />
      <div>
        <Header />
        <h1>Painel de controle</h1>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
