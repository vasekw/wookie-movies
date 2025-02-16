import styles from "./page.module.css";
import MovieList from "@/components/MovieList/MovieList";


export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <MovieList/>
            </main>
            <footer className={styles.footer}>
            </footer>
        </div>
    );
}
