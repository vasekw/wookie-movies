import styles from "./page.module.css";
import MenuBar from "@/components/MenuBar/MenuBar";
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";

export default function Home() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <MenuBar/>
            </header>
            <main className={styles.main}>
                <ContentWrapper/>
            </main>
            <footer className={styles.footer}></footer>
        </div>
    );
}
