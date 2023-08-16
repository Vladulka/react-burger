import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css"
import { Link, NavLink } from "react-router-dom";
import { useMatch } from "react-router";

const AppHeader = () => {
    const active = `text text_type_main-default ${style.link}`;
    const inactive = `text text_type_main-default text_color_inactive ${style.link_inactive}`;

    const profilePage = !!useMatch('/profile');
    const homePage = !!useMatch('/');

    return (
        <header className={`${style.header} pt-4 pb-4`}>
            <nav className={style.nav}>
                <ul className={`${style.header_item} ${style.header_ul}`}>
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            isActive ? active : inactive
                        }
                    >
                        <li className={`${style.header_li} p-5`}>
                            <BurgerIcon type={ homePage ? "primary" : "secondary"} />
                            <p className="text text_type_main-default ml-2">
                                Конструктор
                            </p>
                        </li>
                    </NavLink>
                    <a href={"#"} className={style.link}>
                        <li className={`${style.header_li} p-5 ml-2`}>
                            <ListIcon type="secondary"/>
                            <p className="text text_type_main-default text_color_inactive ml-2">
                                Лента заказов
                            </p>
                        </li>
                    </a>
                </ul>
                <div className={style.header_item}>
                    <Link to={'/'}>
                        <Logo/>
                    </Link>
                </div>
                <div className={`${style.header_item} p-5`}>
                    <NavLink
                        to='/profile'
                         className={({isActive}) =>
                             isActive ? active : inactive
                         }
                    >
                        <div className={style.header_login_btn}>
                            <ProfileIcon type={ profilePage ? "primary" : "secondary"} />
                            <p className="text ml-2">
                                Личный кабинет
                            </p>
                        </div>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;