const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client({
	clientId:
		'671862990159-a8topj51d8ru1rt4p3q99phca0bp0vr3.apps.googleusercontent.com',
})

const generateJwt = (id, email, role) => {
    return jwt.sign(
			{ id, email, role },
			process.env.SECRET_KEY,
            {expiresIn: '24h'}
	)
}

class UserController {
    async registration(req, res, next){
        const {email, password, role} = req.body
        console.log(req.body)
        console.log(email, password)
        if(!email || !password){
            return next(ApiError.badRequest('Некорректный email или password'))
        }

        const candidate  = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5) // 5 - число сколько раз хэшируем пароль
        const user = await User.create({email,role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    } 

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    } 

    async loginGoogle(req, res) {
        const idToken = req.body.token
        const ticket = await client.verifyIdToken({ idToken })

        const { email } = ticket.getPayload()

        const user = await User.findOne({ where: { email } })

        if (user) {
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({ token })
        }

        const newUser = await User.create({
            email,
            password: 'google',
        })

        const token = generateJwt(newUser.id, newUser.email, newUser.role)
        return res.json({ token })

    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token}) 
    } 
}

module.exports = new UserController()