import styles from "./page.module.css";
import MenuBar from "@/components/MenuBar/MenuBar";
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className={styles.page}>
      <header data-testid="header" className={styles.header}>
        <MenuBar />
      </header>
      <main data-testid="main" className={styles.main}>
        <Suspense>
          <ContentWrapper />
        </Suspense>
      </main>
      <footer data-testid="footer" className={styles.footer}></footer>
    </div>
  );
}
