import logo from '../logo.svg'
import '../css/App.css'
import React from 'react'

class Header extends React.Component {
	render() {
		return (
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<h2 className='NameOfTheShop'>{this.props.title}</h2>
			</header>
		)
	}
}

export default Header