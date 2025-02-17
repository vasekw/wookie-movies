import styles from "./page.module.css";
import MenuBar from "@/components/MenuBar/MenuBar";
import CategoryView from "@/components/CategoryView/CategoryView";


export default function Home() {

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <MenuBar/>
            </header>
            <main className={styles.main}>
                <CategoryView/>
            </main>
            <footer className={styles.footer}></footer>
        </div>
    );
}
