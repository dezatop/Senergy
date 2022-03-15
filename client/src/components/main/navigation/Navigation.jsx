import React from 'react';
import styles from "./index.module.scss";

const Navigation = ({switchTab, valueTab, upTable}) => {

    return (
        <nav>
            <ul className={styles.navModule}>
                <li className={valueTab ? styles.tabActive : undefined}
                    onClick={() => {
                        switchTab(true)
                        upTable()
                    }}>
                    Users
                </li>
                <li className={!valueTab ? styles.tabActive : undefined}
                    onClick={() => {
                        switchTab(false)
                        upTable()
                    }}>
                    Groups
                </li>
                <li/>
            </ul>
        </nav>
    );
};

export default Navigation;