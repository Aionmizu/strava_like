const User = require('../models/users');

class UserService{
    async getAllUsers(){
        try{
            return await User.findAll();
        }catch (err){
            throw new Error(err.message);
        }
    }

    async getUserById(id){
        try{
            return await User.findByPk(id);
        }catch (err){
            throw new Error(err.message);
        }
    }

    async createUser(data){
        try{
            return await User.create(data)
        }catch(err){
            throw new Error(err.message);
        }
    }

    async updateUser(id, data){
        try{
            const user = await User.findByPk(id);
            if (user){
                return await user.update(data);
            }
            return null
        }catch (err){
            throw new Error(err.message);
        }
    }

    async deleteUser(id){
        try{
            const user = await User.findByPk(id);
            if (user){
                return await user.destroy();
            }
            return null
        }catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new UserService();