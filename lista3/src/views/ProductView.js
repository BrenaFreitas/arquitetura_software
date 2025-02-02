const rl = require('../config/readLineConfig');
const ProductController = require('../controllers/ProductController');
const productController = new ProductController();

const question = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};


const listar_produtos = async (authToken) => {

    return new Promise(async (resolve) => {

        try {

            const req = {};

            const res = {
                status: (code) => ({
                    json: (data) => ({ code, data })
                })
            };

            const response = await productController.listProducts(req, res);

            console.log('--------------------------------');

            console.log('Produtos disponíveis:');

            console.log('--------------------------------');

            response.data.products.forEach(product => {

                console.log('Id do produto:', product.id_product);

                console.log('Nome do produto:', product.name_product);

                console.log('Preço do produto:', product.price_product);

                console.log('Quantidade em estoque:', product.stock_product);

                console.log('--------------------------------');

            });

            resolve(true);

        } catch (error) {

            console.error('Falha ao listar produtos:', error.response?.data?.message || error.message);

            resolve(false);

        }

    });

};


const buscar_produto = async () => {

    return new Promise((resolve) => {

        console.log('');

        console.log('----Buscar produto----');

        console.log('');

        rl.question('Informe o código do produto: ', async (id_product) => {

            try{

                const req = {
                    body: {
                        id_product
                    }
                };

                const res = {
                    status: (code) => ({
                        json: (data) => ({ code, data })
                    })
                }

                const response = await productController.getProductDetails(req, res);

                console.log('--------------------------------');

                console.log('Produto encontrado:');

                console.log('Id do produto:', response.data.product.id_product);

                console.log('Nome do produto:', response.data.product.name_product);

                console.log('Preço do produto:', response.data.product.price_product);

                console.log('Quantidade em estoque:', response.data.product.stock_product);

                console.log('--------------------------------');

                resolve(true);


            }catch (error){

                console.error('Falha ao buscar produto:',error.response);
                
                resolve(false);
            }

        });
    });

}


module.exports = { listar_produtos , buscar_produto };
