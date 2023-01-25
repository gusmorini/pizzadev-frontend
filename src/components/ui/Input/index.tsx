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

interface UploadProps extends InputHTMLAttributes<HTMLInputElement> {
  url?: string;
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

export function Files({ url, ...rest }: UploadProps) {
  return (
    <div className={styles.upload}>
      <label>
        {url && <img src={url} alt="preview" draggable={false} />}
        <span>+</span>
        <input type="file" {...rest} />
      </label>
    </div>
  );
}
