import styles from "./button.module.scss";

export default function Button({ className, children, ...props }) {
  let style = styles.button;
  if (className) style += " " + className;
  return (
    <button className={style} {...props}>
      {children}
    </button>
  );
}
