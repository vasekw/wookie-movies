'use client'
import React from 'react';
import SearchBar from "@/components/Searchbar/Searchbar";
import styles from './MenuBar.module.scss';
import Logo from "@/components/Logo/Logo";
import {searchMovies} from "@/helpers/movieApi";


const MenuBar: React.FC = () => {
    const handleSearch = async (query: string) => {
        const response = await searchMovies(query);
        console.log(response)
    };

    return (
        <div className={styles.menuBar}>
            <Logo/>
            <SearchBar onSearch={handleSearch}/>
        </div>
    );
};

export default MenuBar;
