const rl = require('../config/readLineConfig');
const PaymentController = require('../controllers/PaymentController');
const paymentController = new PaymentController();

/** Função para pergunta */
const question = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};

/** Função para realizar pagamento */
const iniciar_pagamento = async (authToken) => {

    console.log(" ");
    console.log("-----Realizar Pagamento-----");
    console.log(" ");

    try {

        const saldo = await question('Informe o seu saldo : ');

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


        return true;

    }catch(error){
        console.log("Erro ao realizar pagamento");
        return false;
    }


}

module.exports = { iniciar_pagamento };
