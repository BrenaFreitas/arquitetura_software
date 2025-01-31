const UserController = require('../controllers/UserController');

const userController = new UserController();

const rl = require('../config/readLineConfig');

let authToken = null;



const criar_usuario = async () => {

    return new Promise((resolve) => {

        console.log('');

        console.log('----Registro de novo usuário----');

        console.log('');

        rl.question('Informe o nome do usuário: ', (new_name) => {

            rl.question('Informe o email do usuário: ', (new_email) => {

                rl.question('Informe a senha do usuário: ', async (new_password) => {

                    try {

                                            
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
                      
                        //console.log('Register successful!\n');

                        console.log('Id do usuário:', response.data.user.id_user);

                        console.log('Nome do usuário:', response.data.user.name_user);

                        console.log('Email do usuário:', response.data.user.email_user);

                        resolve(true);

                    } catch (error) {
                        
                        console.error('Falha ao criar usuário:', error.response?.data?.message || error.message);

                        resolve(false);

                    }

                });

            });

        });


    });

};

const autenticacao_login = async () => { 
    
    return new Promise((resolve) => {

        console.log('');

        console.log('--------Login de usuário--------');

        console.log('');

        rl.question('Informe o email do usuário: ', (email_user) => {

            rl.question('Informe a senha do usuário: ', async (password_user) => {

                try {

                                            
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

                    resolve(authToken);

                } catch (error) {
                    
                    console.error('Falha ao autenticar usuário:', error.response?.data?.message || error.message);

                    rl.close();
                    resolve(false);

                }

            });

        });

    });

}


module.exports = { criar_usuario, autenticacao_login, rl };
