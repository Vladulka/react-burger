import React, { useEffect } from 'react';
import { Outlet, useMatch, useNavigate } from "react-router";
import { CLEAN_USER_DATA, GET_USER_SUCCESS, getUserInfo } from "../../services/actions/user";
import { logoutUser, updateUserData } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import styles from "./profile-block.module.css";
import { NavLink } from "react-router-dom";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const ProfilePage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const profilePage = !!useMatch('/profile');

	const style = ({ isActive }: { isActive: boolean }) =>
		isActive
			? `${ styles.link } ${ styles.active_text } text text_type_main-medium`
			: `${ styles.link } text text_type_main-medium text_color_inactive`;

	const { user } = useAppSelector((store) => store.userData) || {} || undefined;

	const [ value, setValue ] = React.useState({
		name: '',
		email: '',
		password: '',
	})

	useEffect(() => {
		getUserInfo()(dispatch).then((data) => {
			data && setValue({ ...value, email: data.email, name: data.name })
		})
			.catch(e => {
				alert(e.message);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onExitClick = () => {
		logoutUser().then(() => {
			setCookie('accessToken', '', -1);
			localStorage.removeItem('refreshToken');
			dispatch({
				type: CLEAN_USER_DATA
			});
			navigate('/login');
		})
			.catch(e => {
				alert(e.message);
			});
	}

	const resetForm = () => {
		setValue({
			name: user.name,
			email: user.email,
			password: '',
		});
	}

	const updateBtnClick = () => {
		updateUserData(value).then(data => {
			dispatch({
				type: GET_USER_SUCCESS,
				data: data
			});
			alert("Данные успешно обновлены!")
		})
			.catch(e => {
				alert(e.message);
			});
	}

	useEffect(() => {
	}, [ value, dispatch ])

	return (
		<div className={ styles.main_block }>
			<div className={ styles.item }>
				<NavLink
					to={ { pathname: "/profile" } }
					className={ style({ isActive: profilePage }) }
				>
					<p className="text text_type_main-medium mb-4">
						Профиль
					</p>
				</NavLink>
				<NavLink
					to={ { pathname: "/profile/orders" } }
					className={ style({ isActive: !profilePage }) }
				>
					<p className={ `text text_type_main-medium mb-4` }>
						История заказов
					</p>
				</NavLink>
				<p className={ `text text_type_main-medium ${ styles.inactive_text } mb-20` } onClick={ onExitClick }>
					Выход
				</p>
				<p className="text text_type_main-default text_color_inactive">
					{profilePage ? 'В этом разделе вы можете изменить свои персональные данные' : 'В этом разделе вы можете просмотреть свою историю заказов'}
				</p>
			</div>
			<div className={ styles.item_orders }>
				<Outlet/>
				{ profilePage && <form onSubmit={ updateBtnClick }>
                    <Input
                        value={ value.name }
                        name={ 'name' }
                        placeholder="Имя"
                        onChange={ e => setValue({ ...value, name: e.target.value }) }
                        extraClass="mb-2"
                    />
                    <EmailInput
                        value={ value.email }
                        name={ 'email' }
                        placeholder="E-mail"
                        isIcon={ true }
                        onChange={ e => setValue({ ...value, email: e.target.value }) }
                        extraClass="mb-2"
                    />
                    <PasswordInput
                        onChange={ e => setValue({ ...value, password: e.target.value }) }
                        value={ value.password }
                        name="password"
                        placeholder="Пароль"
                        icon="EditIcon"
                        extraClass="mb-6"
                    />
					{ (value.name !== user.name ||
						value.email !== user.email || value.password.length > 0) && (
						<div className={ "mt-5" }>
							<Button
								htmlType="button"
								type="secondary"
								size="medium"
								extraClass={ "mr-5" }
								onClick={ resetForm }
							>
								Отмена
							</Button>
							<Button
								htmlType="submit"
								type="primary"
								size="medium"
							>
								Сохранить
							</Button>
						</div>
					) }
                </form> }
			</div>
		</div>
	);
};

export default ProfilePage;