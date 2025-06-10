const authService = require('../services/authService');
const User = require('../models/user');

class authController {
    async register(req, res) {
        if (!req.body) {
            return res.status(400).json({ message: 'Corps de la requête manquant' });
        }

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Champs manquants' });
        }

        try {
            const result = await authService.register(name, email, password);
            res.status(201).json(JSON.parse(result));
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async login(req, res) {
        if (!req.body) {
            return res.status(400).json({ message: 'Corps de la requête manquant' });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Champs manquants' });
        }

        try {
            const result = await authService.login(email, password);
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    }

    async me(req, res) {
        try {
            const user = await User.findByPk(req.userId, {
                attributes: { exclude: ['password'] } // ne renvoie pas le mot de passe
            });

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new authController();
