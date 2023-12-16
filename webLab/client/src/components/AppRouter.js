import React, { useContext } from 'react';
import { Routes, Route} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '../index';


const NotFound = () => {
	return <>Not found!</>
}

const AppRouter = () => {
    //const isAuth = false; // авторизован пользователь или нет
    const {user} = useContext(Context)
    console.log(user)
    return (
			<Routes>
				{user.isAuth &&
					authRoutes.map(({ path, Component }) => (
						<Route key={path} path={path} element={<Component />} exact />
					))}
				{publicRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} exact />
				))}
				<Route path={'*'} Component={NotFound}></Route>
			</Routes>
		)
};

export default AppRouter;   