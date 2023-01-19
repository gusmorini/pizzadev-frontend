import NextHead from "next/head";

export default function Head({ title = "" }) {
  return (
    <NextHead>
      <title>
        Pizza Dev {title ? " | " : ""} {title}
      </title>
    </NextHead>
  );
}
