import styles from "./skeleton.module.scss";

export default function Skeleton({ style, children }) {
  return (
    <div className={styles.skeletonWrapper} style={style}>
      {children}
    </div>
  );
}
