import React from 'react'
import '../css/Auth.css'
import { userApi } from '../components/Api'
import { HOME_ROUTE } from '../utils/consts'
import {GoogleLogin} from '@react-oauth/google'
import NavBar from '../components/NavBar'

class Auth extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			password_rep: '',
			error: null,
		}
	}

	handleRegistration = async () => {
		const { email, password, password_rep } = this.state
		if (password != password_rep){
			this.setState({ error: 'Пароли не совпадают' })
			return
		}
		try {
			const response = await userApi.register({ email, password })
			const token = response.data.token
			localStorage.setItem('token', token)
			//this.props.updateToken(token)
			window.location.href = HOME_ROUTE
		} catch (error) {
			this.setState({ error: 'Ошибка' })
		}
	}

	render() {
		return (
			<>
				<form>
					<input
						placeholder='Электронная почта'
						onChange={e => this.setState({ email: e.target.value })}
					/>
					<input
						placeholder='Пароль'
						type='password'
						onChange={e => this.setState({ password: e.target.value })}
					/>
					<input
						placeholder='Подтверждение пароля'
						type='password'
						onChange={e => this.setState({ password_rep: e.target.value })}
					/>
					<button
						className='LogBut'
						type='button'
						onClick={this.handleRegistration}
					>
						Зарегистрироваться
					</button>

					{this.state.error && (
						<p style={{ color: 'red' }}>{this.state.error}</p>
					)}
				</form>
				<GoogleLogin
					onSuccess={async credentialResponse => {
						const {data: {token}} = await userApi.loginGoogle(credentialResponse.credential)
						localStorage.setItem('token', token)
						window.location.href = HOME_ROUTE
					}}
					onError={console.error}
				/>
			</>
		)
	}
}

export default Auth
