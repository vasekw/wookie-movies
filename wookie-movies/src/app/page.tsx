import styles from "./page.module.css";
import MovieList from "@/components/MovieList/MovieList";
import MenuBar from "@/components/MenuBar/MenuBar";


export default function Home() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <MenuBar/>
            </header>
            <main className={styles.main}>
                <MovieList/>
            </main>
            <footer className={styles.footer}>
            </footer>
        </div>
    );
}
