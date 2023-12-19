import { userApi } from '../components/Api'
import React, { useState, useEffect } from 'react'
import '../css/Shop.css'
import { Link } from 'react-router-dom'
import { PRODUCT_ROUTE } from '../utils/consts'


const Shop = () => {
	const [products, setProducts] = useState([])
	const [typeId, setTypeId] = useState(null)
	const [brandId, setBrandId] = useState(null)
	const [brands, setBrands] = useState([])
	const [types, setTypes] = useState([])

	useEffect(() => {
		// Функция для загрузки данных с бэкенда
		const fetchData = async () => {
			try {
				const response = await userApi.getAllProducts({ typeId, brandId })
				setProducts(response.data.rows);

				console.log(response)

			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			}
		}

		fetchData() 
	}, []);

	return (
		<div>
			{products.map(product => (
				<div key={product.id} className='Product-Info'>
					<h3>{product.name}</h3>
					<img
						className='Image-Prod'
						src={'http://localhost:5000/' + product.img}
						alt={product.name}
					/>
					<div className='Description'>
						<b>Описание: </b>
						{product.description}
					</div>
					<p>
						<b>Цена: </b> {product.price}
					</p>
					<Link to={`${PRODUCT_ROUTE}/${product.id}`}>
						<button className='Description-button'>Подробнее</button>
					</Link>
				</div>
			))}
		</div>
	)
}

export default Shop
