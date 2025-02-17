import React from "react";
import styles from './Logo.module.scss'
import Image from "next/image";
import Link from "next/link";
import {Bangers} from 'next/font/google'
import classNames from "classnames";

const bangers = Bangers({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
})


const Logo: React.FC = () => {
    return (
        <div data-testid="Logo" className={styles.wrapper}>
            <Link className={styles.link} href='/'>
                <Image className={styles.image} width={48} height={48} alt="wookie" src='/images/chewy-96.png'
                       priority={true}/>
                <div className={classNames(styles.title, bangers.className)}>
                    W-Movies
                </div>
            </Link>
        </div>
    );
};

export default Logo;
