import React, { useContext , useState, useEffect} from 'react'
import {Context} from "../index"
import { SHOP_ROUTE, HOME_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, ADMIN_ROUTE, BASKET_ROUTE } from '../utils/consts'
import { NavLink } from 'react-router-dom'
import Nav from "../css/Nav.css"
import Button from './Button'
import {observer} from 'mobx-react-lite';

const NavBar = () => {
    //const {user} = useContext(Context)
    //let token = localStorage.getItem('token')

	const [token, setToken] = useState(localStorage.getItem('token'))

	// Функция обновления токена после успешной регистрации
	const updateToken = newToken => {
		setToken(newToken)
	}

	// Эффект для обновления токена из localStorage
	useEffect(() => {
		const storedToken = localStorage.getItem('token')
		setToken(storedToken)
	}, [])
    return (
			<div>
				<nav>
					{token ? (
						<div className='navigation'>
							<NavLink
								to={HOME_ROUTE}
								className='nav-link'
								activeClassName='active'
							>
								Главная страница
							</NavLink>
							<NavLink
								to={SHOP_ROUTE}
								className='nav-link'
								activeClassName='active'
							>
								Каталог
							</NavLink>
							<NavLink
								to={ADMIN_ROUTE}
								className='nav-link'
								activeClassName='active'
							>
								Админка
							</NavLink>
							<Button title='Выйти' Enter={() =>{
								localStorage.removeItem('token')
								window.location.href = HOME_ROUTE
							}} />
						</div>
					) : (
						<div className='navigation'>
							<NavLink
								to={HOME_ROUTE}
								className='nav-link'
								activeClassName='active'
							>
								Главная страница
							</NavLink>
							<NavLink
								to={SHOP_ROUTE}
								className='nav-link'
								activeClassName='active'
							>
								Каталог
							</NavLink>
							<NavLink
								to={LOGIN_ROUTE}
								className='nav-link'
								activeClassName='active'
							>
								Авторизация
							</NavLink>
							<NavLink
								to={REGISTRATION_ROUTE}
								className='nav-link'
								activeClassName='active'
							>
								Регистрация
							</NavLink>
						</div>
					)}
				</nav>
			</div>
		)
}


export default NavBar;
