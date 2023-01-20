import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import { toast } from "react-toastify";
import Router from "next/router";
import { api } from "@/services/apiClient";

type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@pizzadev.token");
    toast.success("Sessão finalizada");
    Router.push("/");
  } catch {
    toast.error("Erro ao finalizar sessão");
    console.error("error logout");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const { data } = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = data;

      setCookie(undefined, "@pizzadev.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        id,
        name,
        email,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      toast.success("Logado com sucesso");
      Router.push("/dashboard");
    } catch (err) {
      toast.error("Erro ao fazer login");
      console.error("ERROR LOGIN ", err);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", { name, email, password });
      console.log("USER CREATED", response);
      toast.success("Usuario cadastrado, faça login");
      Router.push("/");
    } catch (err) {
      toast.error("Erro ao criar usuário, tente novamente");
      console.error("ERROR SIGNUP ", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
