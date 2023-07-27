import React     from 'react';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login-form.module.css';
import {Link, useNavigate} from "react-router-dom";
import {authUser} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "../../services/actions/authorization";

const LoginForm = () => {

    const {authData} = useSelector(store => store.authData)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = React.useState({
        email: '',
        password: ''
    })

    const onLoginClick = (e) => {
        e.preventDefault();
        getAuth(value)(dispatch).then(() => {
            navigate('/')
        })
    }

    return (
        <div className={styles.form_block}>
            <form className={styles.form}>
                <p className="text text_type_main-medium mb-6">
                    Вход
                </p>
                <EmailInput
                    onChange={e => setValue({...value, email: e.target.value})}
                    value={value.email}
                    name={'email'}
                    isIcon={false}
                    extraClass={"mb-6"}
                />
                <PasswordInput
                    onChange={e => setValue({...value, password: e.target.value})}
                    value={value.password}
                    name={'password'}
                    isIcon={true}
                    extraClass={"mb-6"}
                />
                <Button htmlType="button" type="primary" size="medium" extraClass={"mb-20"} onClick={onLoginClick}>
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