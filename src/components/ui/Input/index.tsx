import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";

import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export function Input({ ...rest }: InputProps) {
  return <input className={styles.input} {...rest} />;
}

export function TextArea({ ...rest }: TextareaProps) {
  return <textarea className={styles.input} {...rest}></textarea>;
}

export function Select({ children, ...rest }: SelectProps) {
  return (
    <select className={styles.input} {...rest}>
      {children}
    </select>
  );
}
