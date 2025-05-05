const UserService = require('../services/userService')

class UserController{
    async getAllUser(req,res){
        try{
            const users = await UserService.getAllUsers();
            res.json(users)
        }catch(err){
            res.status(500).json({message: err.message});
        }
    }

    async getUserById(req, res){
        try{
            const user = await UserService.getUserById(req.params.id)
            res.json(user);
        }catch(err){
            res.status(500).json({message: err.message})
        }
    }

    async createUser(req, res){
        try{
            const user = await UserService.createUser(req.body);
            res.json(user);
        }catch {
            res.status(500).json({message: err.message});
        }
    }

    async updateUser(req, res){
        try{
            const user = await UserService.updateUser(req.params.id, req.body);
            res.json(user);
        }catch (err){
            res.status(500).json({message : err.message})
        }
    }

    async deleteUser(req, res){
        try{
            const user = await UserService.deleteUser(req.params.id);
            res.json(user);
        }catch(err){
            res.status(500).json({message : err.message})
        }
    }
}

module.exports = new UserController();