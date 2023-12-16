import logo from './logo.svg';
import './css/App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import React from 'react';

class Header extends React.Component{
  render(){
    return (
		<header className='App-header'>
			<img src={logo} className='App-logo' alt='logo' />
			<h2 className='NameOfTheShop'>{this.props.title}</h2>
		</header>
	)
  }
}

function App() {
  return (
		<div className='App'>
			<Header title='Clothing Shop'/>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</div>
	)
}

export default App;
