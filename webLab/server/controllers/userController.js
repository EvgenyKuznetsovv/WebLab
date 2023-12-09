class UserController {
    async registration(req, res){

    } 

    async login(req, res){
        
    } 

    async check(req, res){
        const {id} = req.query // получаем параметр строки запроса
        res.json(id) 
    } 
}

module.exports = new UserController()