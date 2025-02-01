const Payments = require('../models/Payment');
const OrdersController = require('./OrdersController');
const orderController = new OrdersController();

class PaymentController {

    /**
     * @async
     * @function payment
     * @description Processa um pagamento baseado no saldo do usuário e no valor do pedido.
     * @param {Object} req - Objeto de requisição do Express contendo o corpo da requisição.
     * @param {Object} req.body - Corpo da requisição contendo informações do usuário.
     * @param {number} req.body.saldo - Saldo atual do usuário.
     * @param {Object} res - Objeto de resposta do Express para retornar os resultados.
     * @returns {Promise<Object>} Retorna um JSON indicando sucesso ou falha do pagamento.
    */

    async payment(req, res) {

        const {saldo} = req.body;

        const order = await orderController.listOrder(req, res);

        const orderValue = order.data.order.totalOrderValue;       
        
        const orderId = order.data.order.id_order;

        try {

            const payment = await Payments.doPayment(saldo, orderValue, orderId);

            if (!payment) {
            
                return res.status(404).json({ message: 'Pagamento não encontrado' });
            
            }

            return res.status(201).json({payment});


        }catch (error) {
        
            return res.status(500).json({ message: error.message });
        }

    }

}

module.exports = PaymentController;