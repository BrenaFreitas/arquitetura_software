const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

class UserController {

    
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

    async register (req,res) {
        
        const {new_name , new_email, new_password} = req.body;

        const user = await User.addNewUser(new_name,new_email,new_password);

        if (!user) {
            
            return res.status(401).json({ message: 'Invalid credentials' });
        
        }

        return res.status(200).json({ user });
    }

    async listUsers(req, res) {
          
        try{
            const users = User.getUsers();
            if (!users) {
                return res.status(404).json({ message: 'No users found' });
            }
            return res.status(200).json({ users });
        }

        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    
    }

    

    async pegarUsuarioAtravesDoToken (token) {
    
        try {
    
            const usuario = jwt.verify(token, process.env.JWT_SECRET);

            //console.log('Usuário autenticado:', usuario);
    
            return usuario;
    
        } catch (error) {
            console.error('Erro ao pegar usuário:', error);
        }
    
    };
  
}

module.exports = UserController;
