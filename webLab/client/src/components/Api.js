import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:5000/api',
})

export const userApi = {
	login: data => instance.post('/user/login', data),
	loginGoogle: token => instance.post('/user/login-google', { token }),
	register: data => instance.post('/user/registration', data),
	getAllProducts: data => instance.get('/product', data),
	getProductById: id => instance.get(`/product/${id}`),
	getAllTypes: data => instance.get('/type', data),
	getAllBrands: data => instance.get('/brand', data),
	createProduct: data => instance.post('/product', data),
}
    