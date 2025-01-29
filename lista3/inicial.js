const readline = require('readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });


const UserController = require('./src/controllers/UserController');

const userController = new UserController();

const ProductController = require('./src/controllers/ProductController');

const productController = new ProductController();

const OrderController = require('./src/controllers/OrdersController');

const orderController = new OrderController();

const PaymentController = require('./src/controllers/PaymentController');

const paymentController = new PaymentController();

let authToken = null;

const criar_pedido = async () => {

    return new Promise((resolve) => {

        console.log('');

        console.log('-------- Iniciar pedido --------');

        console.log('');

        rl.question('Informe o código do produto: ', async (id_product) => {

            rl.question('Infome a quantidade que deseja comprar: ', async (quantity) => {
                
            try {

                const token = `${authToken}`;  

                const req = {
                    headers: {
                        authorization: `Bearer ${token}`  
                    
                    },
                    body: {
                        id_product,
                        quantity
                    }
                };

    
                const res = {
                    status: (code) => ({
                        json: (data) => {
                            console.log(`Status: ${code}`);
                            console.log("Resposta:", data);
                            return { code, data };
                        }
                    })
                };
    
                const response = await orderController.createOrder(req,res);

                console.log("                       ");
                console.log("--------PEDIDO---------");
                console.log("Id do pedido:", response.data.order.id_order);
                console.log("Id do usuário:", response.data.order.user_id);
                console.log("Total do pedido: ",response.data.order.totalOrderValue);
                console.log("Quantidade de itens :",response.data.order.quantity_order);


                resolve(true);

                
            }catch(error){

                console.error('Falha ao criar pedido');

                resolve(false);
            }

            });


        });

    });
}

const comprar = async () =>{

    return new Promise((resolve) => {

        
        console.log('');

        console.log('------- Sessão de compras ------');

        console.log('');

        rl.question('Deseja realizar compras?(SIM/NÃO) ', async (answer) => {

            if(answer.toLowerCase() === 'sim'){
                const criar = await criar_pedido();

                if (criar) {
                  
                    //console.log("Realizando compras");
                  
                    const repetirCompra = await comprar();
                    resolve(repetirCompra);
               
                
                } else {
                
                    console.log('Erro ao realizar pedido');
                    resolve(false);
                }
            
            } else {
            
                //console.log('Compra finalizada.');
            
                resolve(true);
            
            }
        });

    });

}

const carrinho_compras = async() =>{

    return new Promise( async (resolve) => {

        try{

            const token = `${authToken}`;  

            const req = {
                headers: {
                    authorization: `Bearer ${token}`  
                
                }
            };

            const res = {
                status: (code) => ({
                    json: (data) => ({ code, data })
                })
            };

            const response = await orderController.listOrder(req, res);

            console.log('-------------------');

            console.log('Carrinho de compras:');

            console.log('-------------------');

            const order = response.data.order;

            
            console.log('Id do pedido :', order.id_order);

            console.log('Id do usuário:', order.user_id);

            console.log('Valor total do pedido:', order.totalOrderValue);

            console.log('Quantidade de itens do pedido:', order.quantity_order);

            console.log('-------------------');

           resolve(true);


        }catch(error){
            
            console.error('Falha ao carrinho de compras:', error.response?.data?.message || error.message);

            resolve(false);

        }
    });
}

const listar_produtos = async () => {

    return new Promise(async (resolve) => {

        try {

            const req = {
                headers: {
                    authorization: authToken
                }
            };

            const res = {
                status: (code) => ({
                    json: (data) => ({ code, data })
                })
            };

            const response = await productController.listProducts(req, res);

            console.log('-------------------');

            console.log('Produtos disponíveis:');

            console.log('-------------------');

            response.data.products.forEach(product => {

                console.log('Id do produto:', product.id_product);

                console.log('Nome do produto:', product.name_product);

                console.log('Preço do produto:', product.price_product);

                console.log('Quantidade em estoque:', product.stock_product);

                console.log('-------------------');

            });

            resolve(true);

        } catch (error) {

            console.error('Falha ao listar produtos:', error.response?.data?.message || error.message);

            resolve(false);

        }

    });

};

const buscar_produto = async () => {

    return new Promise((resolve) => {

        console.log('');

        console.log('----Buscar produto----');

        console.log('');

        rl.question('Informe o código do produto: ', async (id_product) => {

            try{

                const req = {
                    body: {
                        id_product
                    }
                };

                const res = {
                    status: (code) => ({
                        json: (data) => ({ code, data })
                    })
                }

                const response = await productController.getProductDetails(req, res);

                console.log('-------------------');

                console.log('Produto encontrado:');

                console.log('Id do produto:', response.data.product.id_product);

                console.log('Nome do produto:', response.data.product.name_product);

                console.log('Preço do produto:', response.data.product.price_product);

                console.log('Quantidade em estoque:', response.data.product.stock_product);

                console.log('-------------------');

                resolve(true);


            }catch (error){

                console.error('Falha ao buscar produto:',error.response);
                
                resolve(false);
            }

        });
    });

}


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
                  
                    //console.log('Login successful!\n');

                    //console.log('Token:', response.data.token);

                    authToken = response.data.token;

                    resolve(authToken);

                } catch (error) {
                    
                    console.error('Falha ao autenticar usuário:', error.response?.data?.message || error.message);

                    resolve(false);

                }

            });

        });

    });

}

const iniciar_pagamento = async () => {

    return new Promise( (resolve) => {

        console.log(" ");
        console.log("-----Realizar Pagamento-----");
        console.log(" ");

        rl.question('Informe o seu saldo : ', async (saldo) => {
            
            try {

                const token = `${authToken}`;  

                const req = {
                    headers: {
                        authorization: `Bearer ${token}`  
                    
                    },
                    body:{
                        saldo
                    }
                };

                const res = {
                    status: (code) => ({
                        json: (data) => ({ code, data })
                    })
                };
            
                const response = await paymentController.payment(req, res);

            }catch(error){
                console.log("Erro ao realizar pagamento");
            }

        });



    });
}

const menu = () => {

    console.log('-------------------');

    console.log('Menu de opções');

    console.log('0 - Encerrar o programa');

    console.log('1 - Listar produtos');

    console.log('2 - Comprar produto');

    console.log('-------------------');

};

const main = async () => {
    /*
    const new_user = await criar_usuario();
    if (new_user) {
        console.log('Usuário criado com sucesso.');
    }else{
        console.log('Falha ao criar usuário.');
    }

    const auth = await autenticacao_login();
    if(auth) {
        console.log('Usuario autenticado');
    }else{
        console.log('Falha na autenticação.');
    }

    const list = await listar_produtos();
    if(list){
        console.log('Produtos listados com sucesso.');
    }
    else{
        console.log('Falha ao listar produtos.');
    }

    const buscar = await buscar_produto();
    if(buscar){
        console.log('Produto encontrado');
    }else{
        console.log("Falha ao buscar produto");
    }*/
    const new_user = await criar_usuario();
    if (new_user) {
        console.log('Usuário criado com sucesso.');
    }else{
        console.log('Falha ao criar usuário.');
    }

    const auth = await autenticacao_login();
    if(auth) {
        console.log('Usuario autenticado');
    }else{
        console.log('Falha na autenticação.');
    }
    
    const criar = await comprar();
    if(criar){
        const carrinho = await carrinho_compras();
        if(carrinho){
            console.log('Carrinho encontrado');
        }else{
            console.log("Falha ao buscar produto");
        }    
    }else{
        console.log('Erro ao realizar pedido');
    }

    const pagamento = await iniciar_pagamento();
    if(pagamento){
        console.log("Pagamento finalizado");
    }else{
        console.log("Erro ao realizar pagamento");
    }



};

main();