const readline = require('readline');
const OrderController = require('../controllers/OrdersController');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const orderController = new OrderController();

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
                                    
                    const repetirCompra = await comprar();
                    resolve(repetirCompra);
               
                
                } else {
                
                    console.log('Erro ao realizar pedido');
                    resolve(false);
                }
            
            } else {
                        
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

module.exports = { criar_pedido, comprar , carrinho_compras};
