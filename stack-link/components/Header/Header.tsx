import styles from "./Header.module.scss";

export default function Header () {
  return (
    <header className={styles.Header}>
      <h1 className={styles.Title}>Stack Link</h1>
      <div className={styles.About}>About</div>
    </header>
  );
}