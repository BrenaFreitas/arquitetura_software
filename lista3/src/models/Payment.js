
class Payment {
  
  constructor(order_id,id_payment,status_payment = 'Pending'){
  
    this.id_payment = id_payment ;

    this.order_id = order_id;
  
    this.status_payment = status_payment;
  
  }



}

module.exports = Payment;