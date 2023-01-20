import { useContext } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "@/contexts/AuthContext";

export default function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src="/logo.svg" alt="logo pizzadev" width={190} height={60} />
        </Link>
        <nav className={styles.menuNav}>
          <Link href="/category">Categoria</Link>
          <Link href="/product">Cardapio</Link>
          <Link href="#" onClick={signOut}>
            <FiLogOut />
          </Link>
        </nav>
      </div>
    </header>
  );
}
