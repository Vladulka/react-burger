import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css"

const AppHeader = () => {
    return (
        <header className={`${style.header} pt-4 pb-4`}>
            <nav className={style.nav}>
                <ul className={`${style.header_item} ${style.header_ul}`}>
                    <a href={"#"} className={style.link}>
                        <li className={`${style.header_li} p-5`}>
                            <BurgerIcon type="primary"/>
                            <p className="text text_type_main-default ml-2">
                                Конструктор
                            </p>
                        </li>
                    </a>
                    <a href={"#"} className={style.link}>
                        <li className={`${style.header_li} p-5 ml-2`}>
                            <ListIcon type="secondary"/>
                            <p className="text text_type_main-default text_color_inactive ml-2">
                                Лента заказов
                            </p>
                        </li>
                    </a>
                </ul>
                <div className={style.header_item}><Logo/></div>
                <div className={`${style.header_item} p-5`}>
                    <a href={"#"} className={style.link}>
                        <div className={style.header_login_btn}>
                            <ProfileIcon type="secondary"/>
                            <p className="text text_type_main-default text_color_inactive ml-2">
                                Личный кабинет
                            </p>
                        </div>
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;