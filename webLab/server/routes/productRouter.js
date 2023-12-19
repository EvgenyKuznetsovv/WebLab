const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', productController.create)
router.get('/', productController.getAll)
router.get('/:id',productController.getOne)
router.delete('/:id', productController.delete)
router.put('/:id', productController.update)

module.exports = router

