import React, {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Searchbar.module.scss";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [query, setQuery] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onSearch(newQuery); // Trigger search on each input change
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSearch(query); // Trigger search on Enter press
        }
    };

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className={styles.input}
            />
            <button className={styles.button} onClick={() => onSearch(query)}>
                <SearchIcon/>
            </button>
        </div>
    );
};

export default SearchBar;
