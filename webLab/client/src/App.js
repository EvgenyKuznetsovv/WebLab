import './css/App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import React from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { GoogleOAuthProvider } from '@react-oauth/google'


function App() {
  return (
		<div className='App'>
			<BrowserRouter>
				<GoogleOAuthProvider clientId='671862990159-a8topj51d8ru1rt4p3q99phca0bp0vr3.apps.googleusercontent.com'>
					<Header title='Clothing Shop' />
					<NavBar />
					<AppRouter />
				</GoogleOAuthProvider>
			</BrowserRouter>
		</div>
	)
}

export default App;
