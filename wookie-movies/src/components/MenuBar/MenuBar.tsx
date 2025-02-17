'use client'
import React from 'react';
import {useRouter} from 'next/navigation';
import SearchBar from "@/components/Searchbar/SearchBar";
import styles from './MenuBar.module.scss';
import Logo from "@/components/Logo/Logo";

const MenuBar: React.FC = () => {
    const router = useRouter();

    const handleSearch = async (query: string) => {
        router.push(query ? `?q=${encodeURIComponent(query)}` : "?");
    };


    return (
        <div className={styles.menuBar}>
            <Logo/>
            <SearchBar onSearch={handleSearch}/>
        </div>
    );
};

export default MenuBar;
