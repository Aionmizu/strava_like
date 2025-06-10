const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class authService {
    async register(name, email, password) {
        try{
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({name, email, password: hashedPassword});
            await user.save();
            return '{"message": "User created"}';
        }catch (err){
            throw new Error(err.message);
        }
    }
    async login(email, password) {
        try{
            const user = await User.findOne({where: {email}});
            if (!user){
                throw new Error('invalid credentials');
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch){
                throw new Error('invalid credentials');
            }

            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

            return{message: 'success', token};

        }catch (err){
            throw new Error(err.message);
        }


    }
}

module.exports = new authService();