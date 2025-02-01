const rl = require('../config/readLineConfig');
const UserController = require('../controllers/UserController');
const userController = new UserController();

let authToken = null;

/** Função para pergunta */
const question = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};

/** Função de criação de usuário */
const criar_usuario = async () => {

    console.log('');

    console.log('----Registro de novo usuário----');

    console.log('');

    try {

        const new_name = await question('Informe o nome do usuário: ');

        const new_email = await question('Informe o email do usuário: ');

        const new_password = await question('Informe a senha do usuário: ');
                   
        const req = {
            body: {
                new_name,
                new_email,
                new_password
            }
        };

        const res = {
            status: (code) => ({
                json: (data) => ({ code, data })
            })
        };
    
        const response = await userController.register(req, res);
    
        console.log('--------------------------------');
        
        console.log('Id do usuário:', response.data.user.id_user);

        console.log('Nome do usuário:', response.data.user.name_user);

        console.log('Email do usuário:', response.data.user.email_user);

        return true;

    } catch (error) {
        
        console.error('Falha ao criar usuário:', error.response?.data?.message || error.message);

        return false;
    }

    
};


/** Função de autenticação de usuário */
const autenticacao_login = async () => { 
    
    console.log('');

    console.log('--------Login de usuário--------');

    console.log('');

    try {

        const email_user = await question('Informe o email do usuário: ');

        const password_user = await question('Informe a senha do usuário: ');
                    
                                
        const req = {
            body: {
                email_user,
                password_user
            }
        };

        const res = {
            status: (code) => ({
                json: (data) => ({ code, data })
            })
        };
    
        const response = await userController.login(req, res);
    
        console.log('--------------------------------');

        authToken = response.data.token;

        return authToken;

    } catch (error) {
        
        console.error('Falha ao autenticar usuário:', error.response?.data?.message || error.message);

        return false;

    }

}

module.exports = { criar_usuario, autenticacao_login, rl };
