import React from 'react';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import styles from "./forgot-password.module.css";
import {useDispatch} from "react-redux";
import {forgotPassword} from "../../utils/api";
import {useNavigate} from "react-router";
import {setCookie} from "../../utils/cookie";

const ForgotPassword = () => {

    const [email, setEmail] = React.useState('')

    const navigate = useNavigate();

    const onBtnClick = (e) => {
        e.preventDefault();
        forgotPassword(email).then(() => {
            localStorage.setItem('reset-email', email);
            navigate('/reset-password');
        })
        .catch(e => {
            alert(e.message);
        });
    }

    return (
        <div className={styles.form_block} onSubmit={onBtnClick}>
            <form className={styles.form}>
                <p className="text text_type_main-medium mb-6">
                    Восстановление пароля
                </p>
                <EmailInput
                    placeholder={"Укажите e-mail"}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'name'}
                    isIcon={false}
                    extraClass={"mb-6"}
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass={"mb-20"}>
                    Восстановить
                </Button>
                <span className={styles.text_footer}>
                    <p className="text text_type_main-default text_color_inactive">
                      Вспомнили пароль?
                    </p>
                    <Link to={'/login'} className={styles.link}>
                        <p className="text text_type_main-default">
                          Войти
                        </p>
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default ForgotPassword;