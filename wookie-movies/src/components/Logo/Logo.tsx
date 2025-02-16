import React from "react";
import styles from './Logo.module.scss'
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <Link className={styles.link} href='/'>
                <Image className={styles.image} width={48} height={48} alt="wookie" src='/images/chewy-icon.svg'/>
                <div className={styles.title}>
                    W-Movies
                </div>
            </Link>
        </div>
    );
};

export default Logo;
