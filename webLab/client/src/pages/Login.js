import React from 'react';
import "../css/Auth.css"
import { userApi } from '../components/Api'
import { HOME_ROUTE } from '../utils/consts';
import NavBar from '../components/NavBar';



class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			error: null,
		}
	}

	handleLogin = async () => {
		const { email, password } = this.state

		try {
			const response = await userApi.login({ email, password })
			const token = response.data.token
            localStorage.setItem('token', token)
            //this.props.updateToken(token)
            window.location.href = HOME_ROUTE
		   
		} catch (error) {
            this.setState({ error: "Ошибка" })
		}
	}

	render() {
		return (
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
				<button className='LogBut' type='button' onClick={this.handleLogin}>
					Войти
				</button>

				{this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
			</form>
		)
	}
}

export default Login