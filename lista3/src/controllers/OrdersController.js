const Order = require('../models/Order');
const ProductController = require('../controllers/ProductController');
const UsuarioController = require('../controllers/UserController');

const userController = new UsuarioController();

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();


class OrderControllers {

    async createOrder(req, res) { 

        try {

            const user = await userController.getUserByToken(req,res);

            const user_id  = user.data.usuario.id;

            const {id_product, quantity} = req.body;

            const productController = new ProductController();
            
            const response = await productController.getProductDetails(req,res);

            if(response){

                const orderInstance = new Order();

                const order = await orderInstance.addProductOrder(user_id,response, quantity);


                if(!order) {
                    return res.status(400).json({message: 'Error creating order - '});
                }

                return res.status(201).json({order});

            }


        }catch (error) {
            return res.status(500).json({ message: error.message });
        }

    }

    async listOrder(req, res) { 

        try {

            const user = await userController.getUserByToken(req,res);

            const user_id  = user.data.usuario.id;

            console.log('ID do usuário:', user_id);

            const order = await Order.getOrderByUserId(user_id);
            
            if (!order) {
                return res.status(404).json({ message: 'No products found' });
            }
          
            return res.status(200).json({ order });

        } catch(error){
          
            return res.status(500).json({ message: error.message });
        
        }
    }
}

 module.exports = OrderControllers

