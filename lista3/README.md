# Lista 3 (Arquitetura Baseada em Microsserviço)

## Objetivo 
Simulação de arquitetura de microsserviços para um sistema de gerenciamento de pedidos.
Interação entre os serviços ocorre através de métodos e objetos.

## Requisitos da aplicação
1. O sistema de gerenciamento de pedidos deve ser composto por pelo menos 4 microsserviços.
2. Serviço de Autenticação: Gerencia o login dos usuários(OK) e autentica os acessos ao sistema.(OK)
3. Serviço de Catálogo de Produtos: Gerencia os dados dos produtos, como nome, preço e estoque. (OK)
4. Serviço de Pedidos: Gerencia a criação de pedidos, associando usuários aos itens comprados e calculando o total da compra.
5. Serviço de Pagamentos: Processa os pagamentos de pedidos e altera o estado do pedido para "pago" ou "pendente".
6. Adicione um mecanismo de simulação de falhas. Por exemplo, o pagamento pode falhar por saldo insuficiente ou o estoque de um produto pode não estar disponível.
7. Crie logs (mensagens no console) que descrevam cada etapa do processo e as interações entre os serviços.

## Fluxo do sistema 
1. Um usuário realiza o cadastro 
2. Um usuário faz login.
3. Após autenticado, o usuário vizualiza o menu(0 - sair; 1 - listar produtos 2 - realizar compra).
4. Opção 1:  o usuário visualiza o catálogo de produtos.
5. Opção 2:  o usuário lista os produtos.
6. Opção 2:  o usuário lista os produtos.
O usuário seleciona itens e os adiciona ao carrinho, criando um pedido no Serviço de Pedidos.
O pedido é enviado para o Serviço de Pagamentos, que processa o pagamento e atualiza o status.
Controle de Fluxo:

## Diagrama 


## Arquitetura
.
├── src
│   ├── config
|   ├── controllers
|   |   ├── OrdersController.js
|   |   ├── PaymentsController.js
|   |   ├── ProductController.js
|   |   ├── UserController.js
│   ├── models
|   |   ├─ Order.js
|   |   ├─ Payment.js
|   |   ├─ Product.js
|   |   ├─ User.js
|   ├── views
|   |   ├─ OrderView.js
|   |   ├─ PaymentView.js
|   |   ├─ ProductView.js
|   |   ├─ UserView.js
├── .env
├── main.py
└── README.md

## Instalação
- A máquina deve ter o Node.js instalado.

``` bash
npm 
```

## Rodar a aplicação

``` bash
node main.js

```





