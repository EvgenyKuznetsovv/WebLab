import React from 'react';
import { userApi } from '../components/Api'
import { useEffect, useState } from 'react'
import "../css/Admin.css"
import { ADMIN_ROUTE } from '../utils/consts';
import axios from 'axios'

const apiUrl = `http://ip-api.com/json/`
const BitUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json'




const Admin = () => {
	const [products, setProduct] = useState([])
	const [brands, setBrand] = useState([])
	const [types, setType] = useState([])
	const [country, setCountry] = useState("")
	const [timeZone, setZone] = useState("")
	const [bitUSD, setUSD] = useState("")
	const [BitEUR, setEUR] = useState("")
    useEffect(() => {
			const effect = async () => {
				const newProducts = await userApi.getAllProducts()
				const [new_brands, new_types] = await Promise.all([
					userApi.getAllBrands(),
					userApi.getAllTypes(),
				])

				axios.get(apiUrl).then(res => {
					setCountry(res.data.country)
					setZone(res.data.timezone)
				})

				axios.get(BitUrl).then(res => {
					setUSD(res.data.bpi.USD.rate)
					setEUR(res.data.bpi.EUR.rate)
					
				})

				setType(new_types.data)
				setBrand(new_brands.data)
				setProduct(newProducts.data.rows)
			}
			effect().catch(console.error)
		}, [])

	 const handleCreate = async () => {
		try{
			const name = document.getElementById('create-name').value
			const description = document.getElementById('create-dis').value
			const price = document.getElementById('create-price').value
			const img = document.getElementById('create-imageInput').files[0]
			const brandId = document.getElementById('create-brand').value
			const typeId = document.getElementById('create-type').value

			const formData = new FormData();
			formData.append('name', name)
			formData.append('description', description)
			formData.append('price', price)
			formData.append('brandId', brandId)
			formData.append('typeId', typeId)
			formData.append('img', img)


			const response = await userApi.createProduct(formData)
			window.location.href = ADMIN_ROUTE
			
		}
		catch{
			console.error('Ошибка при отправке запроса:')
		}
		}

		const userApi_temp = {
			updateProduct: async (id, name, description, price, brandId, typeId) => {
				try {
					const response = await fetch(
						`http://localhost:5000/api/product/${id}`,
						{
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								name,
								description,
								price,
								brandId,
								typeId,
							}),
						}
					)

					if (!response.ok) {
						throw new Error('Ошибка при обновлении продукта')
					}

					return response.json()
				} catch (error) {
					throw error
				}
			},
		}

		const userApi_del = {
			deleteProduct: async (id) => {
				try {
					const response = await fetch(
						`http://localhost:5000/api/product/${id}`,
						{
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json',
							},
						}
					)

					if (!response.ok) {
						throw new Error('Ошибка при удалении продукта')
					}

					return response.json()
				} catch (error) {
					throw error
				}
			},
		}

		const handleDelete = async (id) => {
			try {
				const deleteMessage = await userApi_del.deleteProduct(id)
				window.location.href = ADMIN_ROUTE
			} catch (error) {
				console.error('Ошибка при удалении продукта:', error)
			}
		}

	
		const handleUpdate = async () => {
			try {
				
				const id = document.getElementById('update-id').value
				const name = document.getElementById('update-name').value
				const description = document.getElementById('update-dis').value
				const price = document.getElementById('update-price').value
				const brandId = document.getElementById('update-brand').value
				const typeId = document.getElementById('update-type').value


				const updatedProduct = await userApi_temp.updateProduct(id, name, description, price, brandId, typeId);
				window.location.href = ADMIN_ROUTE
			} catch {
				console.error('Ошибка при отправке запроса:')
				alert("такого ID нету")
			}
		}

		
		
	

    return (
			<div>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Наименование</th>
							<th>Изображение</th>
							<th>Описание</th>
							<th>Цена</th>
							<th>TypeId</th>
							<th>brandId</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product.id}>
								<td>{product.id}</td>
								<td>{product.name}</td>
								<td>
									<img
										className='Image-Prod-Admin'
										src={'http://localhost:5000/' + product.img}
										alt={product.name}
									/>
								</td>
								<td>{product.description}</td>
								<td>{product.price}</td>
								<td>{product.typeId}</td>
								<td>{product.brandId}</td>
								<td>
									<button onClick={() => handleDelete(product.id)}>X</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<form className='Create-form'>
					<input placeholder='Наименование' id='create-name' />
					<input placeholder='Описание' id='create-dis' />
					<input
						type='number'
						id='create-price'
						max={1000000}
						placeholder='Цена'
					/>
					<input type='file' id='create-imageInput' accept='image/*' />
					<select id='create-brand'>
						<option value='' disabled>
							Бренд
						</option>
						<option value='1'>Nike</option>
						<option value='2'>Adidas</option>
						<option value='3'>Puma</option>
						<option value='4'>Reebok</option>
						<option value='5'>Celvin Klein</option>
					</select>
					<select id='create-type'>
						<option value='' disabled>
							Категория
						</option>
						<option value='1'>Мужская</option>
						<option value='2'>Женская</option>
						<option value='3'>Детская</option>
						<option value='4'>Унисекс</option>
					</select>
					<br></br>
					<button className='LogBut' type='button' onClick={handleCreate}>
						Добавить
					</button>
				</form>

				<form className='Create-form'>
					<input
						type='number'
						id='update-id'
						max={products.length}
						placeholder='ID'
					/>
					<input placeholder='Наименование' id='update-name' />
					<input placeholder='Описание' id='update-dis' />
					<input
						type='number'
						id='update-price'
						max={1000000}
						placeholder='Цена'
					/>
					<select id='update-brand'>
						<option value='' disabled>
							Бренд
						</option>
						<option value='1'>Nike</option>
						<option value='2'>Adidas</option>
						<option value='3'>Puma</option>
						<option value='4'>Reebok</option>
						<option value='5'>Celvin Klein</option>
					</select>
					<select id='update-type'>
						<option value='' disabled>
							Категория
						</option>
						<option value='1'>Мужская</option>
						<option value='2'>Женская</option>
						<option value='3'>Детская</option>
						<option value='4'>Унисекс</option>
					</select>
					<button className='LogBut' type='button' onClick={handleUpdate}>
						Редактировать
					</button>
				</form>
				<div className='Info-admin'>
					<p>
						<b>Страна: </b>
						{country}
					</p>
					<p>
						<b>timeZone: </b>
						{timeZone}
					</p>
					<p>
						<b>Курс биткоина</b>
						<br></br>
						{bitUSD} <b> USD</b>
						<br></br>
						{BitEUR} <b> EUR</b>
					</p>
				</div>
			</div>
		)
};

export default Admin;