const UserController = require('./src/controllers/UserController');
const userController = new UserController();
const ProductController = require('./src/controllers/ProductController');
const productController = new ProductController();
const PaymentController = require('./src/controllers/PaymentController');
const paymentController = new PaymentController();
const OrderController = require('./src/controllers/OrdersController');
const orderController = new OrderController();
const { carrinho_compras, comprar} = require('./src/views/OrderView');
const { autenticacao_login, criar_usuario } = require('./src/views/UserView');
const { iniciar_pagamento } = require('./src/views/PaymentView');
const { listar_produtos , buscar_produto } = require('./src/views/ProductView');
const rl = require('./src/config/readLineConfig');

/** Função para exibir o menu de opções */
const menu = () => {

    console.log('-------------------');

    console.log('Menu de opções');

    console.log('0 - Encerrar o programa');

    console.log('1 - Listar produtos');

    console.log('2 - Comprar produto');

    console.log('3 - Realizar pagamento');

    console.log('-------------------');

};

/** Função para limpar a tela */
const limparTela = () => {
    console.clear();
};

/** Função para pergunta */
const question = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};

/** Função principal */
const main = async () => {
    
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
        process.exit(0);
    }
    
    while(auth){

        menu();

        const option = await question('Escolha uma opção: ');

        switch (option) {

            case '0':
                
                console.log('Programa encerrado');
    
                process.exit(0);
    
    
            case '1':

                limparTela();
    
                const products = await listar_produtos();
    
                if (products) {

                    console.log('--------------------');
                    
                    console.log('Produtos encontrados');
    
                }else{
                    console.log('Falha ao buscar produtos');
                }
    
                break;
    
            case '2':
                
                limparTela();

                const criar = await comprar(auth);
                
                if(criar){
                
                    const carrinho = await carrinho_compras(auth);
                
                    if(carrinho){
                        console.log('Carrinho encontrado');
                    }else{
                        console.log("Falha ao buscar produto");
                    }  
                    
                 
                }
                   
                break;


            
            case '3':

                limparTela();

                const pagamento = await iniciar_pagamento(auth);

                if(pagamento){
                    console.log("Pagamento finalizado");
                }else{
                    console.log("Erro ao realizar pagamento");
                }
                break;
        }

    }
    
};

main();