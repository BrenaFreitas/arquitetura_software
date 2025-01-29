const Payments = require('../models/Payment');

class PaymentController {

    async statePayment(req, res) {
        
        const { id } = req.params;
        
        const { state } = req.body;

        const payment = await Payments.query().findById (id);

        if (!payment) {
        
            return res.status(404).json({ message: 'Pagamento não encontrado' });
        
        }

        await Payments.query().findById(id).patch({ state });

        return res.json({ message: 'Pagamento atualizado com sucesso' });
    }


}

module.exports = PaymentController;