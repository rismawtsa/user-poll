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
      <main>
        <header>
          <a
            href="https://github.com/rismawtsa/user-poll"
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
            className={styles.githubLink}
          >
            <img src="/images/github.png" alt="github" />
          </a>
        </header>
        {!home && (
          <Link className={styles.link} href="/">
            Back
          </Link>
        )}
        <br />
        {error && <div className={styles.error}>{error}</div>}
        {children}
      </main>
    </>
  );
}
