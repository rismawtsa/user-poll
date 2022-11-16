import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";

export default function Layout({ children, home, error }) {
  return (
    <>
      <Head>
        <title>User Poll</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>
      {!home && <Link href="/">Back</Link>}
      <br />
      {error && <div className={styles.error}>{error}</div>}
      {children}
    </>
  );
}
