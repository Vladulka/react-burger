import React from 'react';
import styles from './block-404.module.css'
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const Block404 = () => {
    return (
        <div className={styles.block}>
            <p className={`text text_type_digits-large ${styles.main_text} ${styles.shadow_num} mb-10`}>404</p>
            <p className={`text text_type_main-default ${styles.sub_text}`}>
                Кажется, Вы заблудились. Давайте начнем все с начала 🙃
            </p>
            <Link to={'/'}>
                <Button htmlType="button" type="primary" size="large" extraClass={"mt-8"}>
                    Вернуться на главную
                </Button>
            </Link>
        </div>
    );
};

export default Block404;