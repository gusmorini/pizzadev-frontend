import Head from "@/components/Head";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Dashboard() {
  return (
    <>
      <Head title="dashboard" />
      <div>
        <h1>dashboard</h1>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
