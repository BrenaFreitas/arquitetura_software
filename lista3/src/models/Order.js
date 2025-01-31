
class Order {
    static currentId = 0; 
    static orders = [];  

    constructor(user_id){
       
        this.id_order = Order.getId() ;

        this.user_id = user_id;
                     
        this.totalOrderValue = 0;

        this.quantity_order = 0;

    }

    static getId() {

        return Order.currentId++;
    
        
    }

    static getUOrders() {
  
        return Order.orders;
      
    }
    
    static getOrderByUserId(userId) {
        return Order.orders.find(order => order.user_id === userId) || null;
    }

    static getOrderByOrderId(orderId) {
        return Order.orders.find(order => order.id_order === orderId) || null;
    }

    static getOrders() {
  
        return Order.orders;
      
    }
    

    async addProductOrder(user_id,response, quantity) {

        const product = response.data.product;

        if(product.stock_product < quantity) {

            console.log("Estoque insuficiente");
        
            return false;
        
        }else {

            let order = Order.getOrderByUserId(user_id);

            if (!order) {
                order = new Order(user_id);  
                Order.orders.push(order);
            }

            order.totalOrderValue += product.price_product * quantity;

            order.quantity_order += parseInt(quantity);

            return order;
        
        }

    }


}

Order.orders = [
    new Order(1,1,100.36, 3),
    new Order(2,2,37.90, 1),
    new Order(3,3,55.90, 2)
];

module.exports = Order;