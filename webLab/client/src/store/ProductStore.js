import { makeAutoObservable } from 'mobx'

export default class ProductStore {
	constructor() {
		this._types = [
			{ id: 1, name: 'Мужская' },
			{ id: 2, name: 'Женская' },
		]
		this._brands = [
			{ id: 1, name: 'Nike' },
			{ id: 2, name: 'Adidas' },
		]
		this._products = [
			{
				id: 1,
				name: 'Куртка',
				description: 'хорошая куртка очень',
				price: 210,
				img: '6ff3e2f0-4e49-4711-8cf1-27eb0705f355.jpg',
			},
			{
				id: 2,
				name: 'Куртка2',
				description: 'хорошая куртка очень2',
				price: 220,
				img: 'cbf97278-5929-4a70-a6cf-b2a3f40b0011.jpg',
			},
			{
				id: 3,
				name: 'Куртка3',
				description: 'хорошая куртка очень3',
				price: 230,
				img: '6ff3e2f0-4e49-4711-8cf1-27eb0705f355.jpg',
			},
			{
				id: 4,
				name: 'Куртка4',
				description: 'хорошая куртка очень4',
				price: 240,
				img: 'cbf97278-5929-4a70-a6cf-b2a3f40b0011.jpg',
			},
		]
		makeAutoObservable(this)
	}

	setTypes(types) {
		this._types = types
	}

	setBrands(brands) {
		this._brands = brands
	}

	setDevices(products) {
		this._products = products
	}

	get types() {
		return this.types
	}

	get brands() {
		return this._brands
	}

	get products() {
		return this._products
	}
}
