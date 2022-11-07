import styles from "./skeleton.module.scss";

export default function Skeleton({ style }) {
  return (
    <div
      className={`${styles.skeleton} ${styles.skeletonText}`}
      style={style}
    ></div>
  );
}
