import React from "react";
import styles from "./NoResults.module.scss";
import Image from "next/image";

import { Fragment_Mono } from "next/font/google";
import classNames from "classnames";

export const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const NoResults: React.FC = () => {
  return (
    <div className={styles.noResults}>
      <div
        className={classNames(fragmentMono.className, styles.noResultsTitle)}
      >
        We searched Earth to no avail.
      </div>
      <Image src="/images/earth.png" alt="earth" width={250} height={250} />
      <div
        className={classNames(fragmentMono.className, styles.noResultsTitle)}
      >
        Try searching for something else.
      </div>
    </div>
  );
};

export default NoResults;
