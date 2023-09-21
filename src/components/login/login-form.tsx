import React from 'react';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login-form.module.css';
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "../../services/actions/authorization";
import { useLocation } from "react-router";
import { useAppDispatch } from "../../utils/hooks";

const LoginForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = React.useState({
        email: '',
        password: ''
    })

    const onLoginClick = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        getAuth(value)(dispatch).then(() => {
            const redirectTo = location?.state?.redirectTo?.pathname
                ? location.state.redirectTo.pathname
                : '/';
            navigate(redirectTo);
        })
        .catch(e => {
            alert(e.message);
        });
    }

    return (
        <div className={styles.form_block}>
            <form className={styles.form} onSubmit={onLoginClick}>
                <p className="text text_type_main-medium mb-6">
                    Вход
                </p>
                <EmailInput
                    onChange={e => setValue({...value, email: e.target.value})}
                    value={value.email}
                    name={'email'}
                    extraClass={"mb-6"}
                />
                <PasswordInput
                    onChange={e => setValue({...value, password: e.target.value})}
                    value={value.password}
                    name={'password'}
                    extraClass={"mb-6"}
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass={"mb-20"} data-test-marker="submit-login-button">
                    Войти
                </Button>
                <span className={styles.text_footer}>
                    <p className="text text_type_main-default text_color_inactive">
                      Вы — новый пользователь?
                    </p>
                    <Link to={'/register'} className={styles.link}>
                        <p className="text text_type_main-default">
                          Зарегистрироваться
                        </p>
                    </Link>
                </span>
                <span className={styles.text_footer}>
                    <p className="text text_type_main-default text_color_inactive">
                      Забыли пароль?
                    </p>
                    <Link to={'/forgot-password'} className={styles.link}>
                        <p className="text text_type_main-default">
                          Восстановить пароль
                        </p>
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default LoginForm;