import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} position="bottom-right" />
    </AuthProvider>
  );
}
