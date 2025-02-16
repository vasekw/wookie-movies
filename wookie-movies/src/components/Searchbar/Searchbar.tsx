import React, {useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import styles from './Searchbar.module.scss'

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [query, setQuery] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
                className={styles.input}
            />
            <button className={styles.button} onClick={handleSearch}>
                <SearchIcon/>
            </button>
        </div>
    );
};

export default SearchBar;
