import React, { useContext } from 'react';
import { Routes, Route} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '../index';


const NotFound = () => {
	return <>Not found!</>
}

const AppRouter = () => {
    //const isAuth = false; // авторизован пользователь или нет
    //const {user} = useContext(Context)
	//localStorage.setItem('token', "vava");
	const token = localStorage.getItem('token')
	console.log(token)
	let user = true;
    return (
			<Routes>
				{user &&
					authRoutes.map(({ path, Component }) => (
						<Route  path={path} Component={Component} exact />
					))}
				{publicRoutes.map(({ path, Component }) => (
					<Route path={path} Component={Component} exact />
				))}
				<Route path={'*'} Component={NotFound}></Route>
			</Routes>
		)
};

export default AppRouter;   