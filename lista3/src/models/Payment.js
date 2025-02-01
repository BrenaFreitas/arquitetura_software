
class Payment {

  static currentId = 1; 
  static payments = [];  

  //Construtor da classe
  constructor(order_id,status_payment = 'Pending'){

    this.id_payment = Payment.getId() ;

    this.order_id = order_id;

    this.status_payment = status_payment;

  }

  //Método para gerar id
  static getId() {
    return Payment.currentId++;
  }

  //Método para efetuar pagamento
  static async doPayment(saldo, orderValue,orderId){
  
    if (saldo < orderValue){
      console.log("Saldo insuficiente");
      return false;
      
    }else{

      console.log("Saldo suficiente");

      try {

        const paymentNew = new Payment(orderId);  
        
        Payment.payments.push(paymentNew);

        paymentNew.order_id = orderId;
       
        paymentNew.status_payment = 'Paid';

        if(!paymentNew){
          console.log("Pagamento não efetuado");
          return false;
        }        
        return true;

      }catch (error) {
        
          console.log("Erro ao efetuar pagamento");
          return false; 

      } 

    }
  
  }


}

module.exports = Payment;