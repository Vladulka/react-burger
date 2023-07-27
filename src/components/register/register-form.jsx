import React, {useEffect} from 'react';
import styles from './register-form.module.css';
import {Link} from "react-router-dom";
import {Button, Input, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import {getRegister} from "../../services/actions/registration";
import {useNavigate} from "react-router";

const RegisterForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const onRegisterClick = (e) => {
        e.preventDefault();
        getRegister(value)(dispatch).then(() => {
            navigate('/');
        })
    }

    return (
        <div className={styles.form_block}>
            <form className={styles.form}>
                <p className="text text_type_main-medium mb-6">
                    Регистрация
                </p>
                <Input
                    placeholder={'Имя'}
                    onChange={e => setValue({...value, name: e.target.value})}
                    value={value.name}
                    name={'email'}
                    isIcon={false}
                    extraClass={"mb-6"}
                />
                <EmailInput
                    onChange={e => setValue({...value, email: e.target.value})}
                    value={value.email}
                    name={'name'}
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
                <Button htmlType="button" type="primary" size="medium" extraClass={"mb-20"} onClick={onRegisterClick}>
                    Зарегистрироваться
                </Button>
                <span className={styles.text_footer}>
                    <p className="text text_type_main-default text_color_inactive">
                      Уже зарегистрированы?
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

export default RegisterForm;