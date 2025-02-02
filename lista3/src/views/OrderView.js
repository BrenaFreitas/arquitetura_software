const rl = require('../config/readLineConfig');
const OrderController = require('../controllers/OrdersController');
const orderController = new OrderController();

/** Função para pergunta */
const question = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};

/** Função para mostrar pedido */
const showOrder = (response) => {

    console.log("                       ");
    console.log("--------PEDIDO---------");
    console.log("Id do pedido:", response.data.order.id_order);
    console.log("Id do usuário:", response.data.order.user_id);
    console.log("Total do pedido: ",response.data.order.totalOrderValue);
    console.log("Quantidade de itens :",response.data.order.quantity_order);

}

/** Função para criar pedido */
const criar_pedido = async (authToken) => {

    console.log('');

    console.log('-------- Iniciar pedido --------');

    console.log('');

        
    try {

        const id_product = await question('Informe o código do produto: ');

        const quantity = await question('Informe a quantidade do produto: ');

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
                json: (data) => ({ code, data })
            })
        };
    

        const response = await orderController.createOrder(req,res);

        showOrder(response);

        return true;

        
    }catch(error){

        console.error('Falha ao criar pedido');

        return false;
    }

  
}

/** Função para realizar compras */
const comprar = async (authToken) =>{

    console.log('');

    console.log('------- Sessão de compras ------');

    console.log('');

    try {

        const answer = await question('Deseja realizar uma nova compra? (sim/nao) ');

        if(answer.toLowerCase() === 'sim'){
            const criar = await criar_pedido(authToken);

            if (criar) {
                                
                await comprar(authToken);
            
            
            } else {
            
                console.log('Erro ao realizar pedido');
                return false;
            }
        
        } else {
                    
            return true;
        
        }

    }catch(error){

        console.error('Falha ao realizar compra:', error.response?.data?.message || error.message);

        return false;
    }


}

/** Função para mostrar carrinho de compras */
const showCart = (response) => {

    console.log('-------------------');

            console.log('Carrinho de compras:');

            console.log('-------------------');

            const order = response.data.order;

            
            console.log('Id do pedido :', order.id_order);

            console.log('Id do usuário:', order.user_id);

            console.log('Valor total do pedido:', order.totalOrderValue);

            console.log('Quantidade de itens do pedido:', order.quantity_order);

            console.log('-------------------');
}

/** Função para carrinho de compras */
const carrinho_compras = async(authToken) =>{

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

            showCart(response);
            
           resolve(true);


        }catch(error){
            
            console.error('Falha ao carrinho de compras:', error.response?.data?.message || error.message);

            resolve(false);

        }
    });
}


module.exports = { criar_pedido, comprar , showCart, carrinho_compras};
