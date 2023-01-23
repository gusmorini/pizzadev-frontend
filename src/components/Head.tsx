import NextHead from "next/head";

export default function Head({ title = "" }) {
  return (
    <NextHead>
      <title>{title ? `${title} | ` : ""} Pizza Dev</title>
    </NextHead>
  );
}
