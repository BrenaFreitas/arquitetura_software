const readline = require('readline');
const PaymentController = require('../controllers/PaymentController');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const paymentController = new PaymentController();


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

                resolve(true);

            }catch(error){
                console.log("Erro ao realizar pagamento");
            }

        });



    });
}

module.exports = { iniciar_pagamento };
