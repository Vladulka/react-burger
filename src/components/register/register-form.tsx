import React from 'react';
import styles from './register-form.module.css';
import { Link } from "react-router-dom";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { getRegister } from "../../services/actions/registration";
import { useNavigate } from "react-router";

const RegisterForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const onRegisterClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        getRegister(value)(dispatch).then(() => {
            navigate('/');
        })
        .catch(e => {
            alert(e.message);
        });
    }

    return (
        <div className={styles.form_block} onSubmit={() => onRegisterClick}>
            <form className={styles.form}>
                <p className="text text_type_main-medium mb-6">
                    Регистрация
                </p>
                <Input
                    placeholder={'Имя'}
                    onChange={e => setValue({...value, name: e.target.value})}
                    value={value.name}
                    name={'email'}
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
                    extraClass={"mb-6"}
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass={"mb-20"}>
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