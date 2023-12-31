import React, { useEffect } from 'react';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./reset-password.module.css";
import { getCookie } from "../../utils/cookie";
import { useNavigate } from "react-router";
import { resetPassword } from "../../utils/api";

const ResetPassword = () => {

    const navigate = useNavigate();

    const reset = localStorage.getItem('reset-email');

    useEffect(() => {
        if (getCookie('accessToken') && localStorage.getItem('refreshToken')) navigate('/');
        if(!reset) navigate('/forgot-password');
        if (reset) localStorage.removeItem('reset-email')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [value, setValue] = React.useState({
        code: '',
        password: ''
    })

    const onBtnClick = () => {
        resetPassword(value).then((data) => {
            alert(data);
            navigate('/login')
        })
        .catch(e => {
            alert(e.message);
        });
    }

    return (
        <div className={styles.form_block}>
            <form className={styles.form} onSubmit={onBtnClick}>
                <p className="text text_type_main-medium mb-6">
                    Восстановление пароля
                </p>
                <PasswordInput
                    placeholder={"Введите новый пароль"}
                    onChange={e => setValue({...value, password: e.target.value})}
                    value={value.password}
                    name={'name'}
                    extraClass={"mb-6"}
                />
                <Input
                    placeholder={'Введите код из письма'}
                    onChange={e => setValue({...value, code: e.target.value})}
                    value={value.code}
                    name={'code'}
                    extraClass={"mb-6"}
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass={"mb-20"}>
                    Сохранить
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

export default ResetPassword;