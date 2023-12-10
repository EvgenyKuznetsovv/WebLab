// генерит ID которые не будут повторяться
const uuid = require('uuid')
const path = require('path')
const{Product} = require('../models/models')
const ApiError = require('../error/ApiError')


class ProductController {
	async create(req, res, next) {
		
		try{
			const { name, description, price, brandId, typeId } = req.body
			const { img } = req.files
			let fileName = uuid.v4() + '.jpg'
			img.mv(path.resolve(__dirname, '..', 'static', fileName))

			const product = await Product.create({
				name,
				description,
				price,
				brandId,
				typeId,
				img: fileName,
			})

			return res.json(product)

		}catch(e){
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res) {
		let {brandId, typeId, limit, page} = req.query;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;
		let products;

		if(!brandId && !typeId){
			products = await Product.findAndCountAll({limit, offset})
		}
		if (brandId && !typeId) {
			products = await Product.findAndCountAll({where:{brandId}, limit, offset})
		}
		if (!brandId && typeId) {
			products = await Product.findAndCountAll({where:{typeId}, limit, offset})
		}
		if (brandId && typeId) {
			products = await Product.findAndCountAll({where:{typeId, brandId}, limit, offset})
		}
		
		return res.json(products);
	}

    async getOne(req, res){
		const {id} = req.params;
		const product = await Product.findOne(
			{where: {id}}

		)
			return res.json(product);
	}

	async delete(req, res, next){
		try {
			const {id} = req.params;
			const product = await Product.findOne({ where: { id } })

			if (!product) {
				return next(ApiError.badRequest(`Товар с id ${id} не найден`))
			}

			await Product.destroy({ where: { id } })

			return res.json({ message: 'Товар успешно удален' })
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async update(req, res, next){
		try {
			const { id } = req.params;
			const { name, description, price, brandId, typeId } = req.body;
			const product = await Product.findOne({ where: { id } });

			if (!product) {
				return next(ApiError.badRequest(`Товар с id ${id} не найден`));
			}

			// Обновляем только те поля, которые переданы в запросе
			if (name) product.name = name;
			if (description) product.description = description;
			if (price) product.price = price;
			if (brandId) product.brandId = brandId;
			if (typeId) product.typeId = typeId;

			await product.save();

			return res.json(product);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}
	

}

module.exports = new ProductController()
