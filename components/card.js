import styles from "./card.module.scss";

export default function Card({ className, children }) {
  const style = className ? className + " " + styles.wrapper : styles.wrapper;
  return <div className={style}>{children}</div>;
}
