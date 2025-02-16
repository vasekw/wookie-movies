import styles from "@/app/page.module.css";
import MenuBar from "@/components/MenuBar/MenuBar";
import MovieView from "@/components/MovieView/MovieView";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function Page({params}: PageProps) {
    const {id} = params;

    return (
        <div>
            <header className={styles.header}>
                <MenuBar/>
            </header>
            <div className={styles.content}>
                <MovieView id={id}/>
            </div>
        </div>
    );
}
