const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

class UserController {

    // Função para realizar o login
    async login (req,res) {
        
        const {email_user, password_user} = req.body;
        
        const user = await User.findByEmail(email_user);
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid  email credentials' });
        }

        const isValidPassword = await user.verifyPassword(password_user);
        
        if(!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password credentials' });
        }

        const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }

    // Função para realizar o registro
    async register (req,res) {
        
        const {new_name , new_email, new_password} = req.body;

        const user = await User.addNewUser(new_name,new_email,new_password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        return res.status(200).json({ user });
    }  

    // Função para pegar o usuário através do token
    async getUserByToken(token) {
    
        try {
            const usuario = jwt.verify(token, process.env.JWT_SECRET);
            return usuario;
    
        } catch (error) {
            console.error('Erro ao pegar usuário:', error);
        }
    
    };
  
    // Função para verificar se o usuário é válido através do token
    async isValidaUserByToken(req, res) {
        
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Token não fornecido ou inválido' });
            }
            const token = authHeader.split(' ')[1]; 
            if (!token) {
                return res.status(400).json({ message: 'Token não fornecido ou inválido' });
            }
            const usuario = await this.getUserByToken(token);
            return res.status(200).json({ usuario });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;
