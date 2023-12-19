import '../css/Button.css'
import React from 'react'

const Button = (props) => {
	return (
		<button className='MyButton' onClick={props.Enter}>{props.text}</button>
        )
}

Button.defaultProps = {
    text: "Выйти"
}

export default Button
