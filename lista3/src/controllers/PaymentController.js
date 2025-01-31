const Payments = require('../models/Payment');
const OrdersController = require('./OrdersController');
const orderController = new OrdersController();

class PaymentController {

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

            return res.json({ message: 'Pagamento efetuado com sucesso', payment });


        }catch (error) {
        
            return res.status(500).json({ message: error.message });
        }

    }

}

module.exports = PaymentController;