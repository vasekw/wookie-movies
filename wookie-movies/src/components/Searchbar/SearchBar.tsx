import React, {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [query, setQuery] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSearch(query);
        }
    };

    return (
        <div data-testid="SearchBar" className={styles.wrapper}>
            <input
                data-testid="SearchBar-input"
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
