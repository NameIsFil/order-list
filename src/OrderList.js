class OrderList {
  orderListElement = document.querySelector('#order-List');
  buttonElement = document.querySelector('#btn-render');
  buyersData;
  ordersData;
  productsData;

  listOfOrders;
  listOfBuyers;
  listOfProducts;

  constructor() {
    this.fetchData()
  }

  createOrderTile(order, buyer) {
    const tile = document.createElement('div');
    tile.style.border = '1px solid black';
    tile.style.width = '250px';
    tile.style.height = '100px';
    const orderDetails = document.createElement('span');
    orderDetails.innerText = `order: ${order.id} \n ${order.product.amount}: ${order.product.name}`;
    const buyerDetails = document.createElement('span');
    buyerDetails.innerHTML = `bought by: ${buyer.name}`;

    tile.append(orderDetails);
    tile.append(document.createElement('p'));
    tile.append(buyerDetails);

    return tile;
  }

  render() {
    this.listOfOrders.forEach((order) => {
      this.orderListElement.append( this.createOrderTile(order, {
        name: order.buyer
      }));
    })
  }

  createOrder() {
    this.listOfOrders = [];
    this.listOfBuyers = {};
    this.listOfProducts = {};
    let orderNumber = 0;

    this.buyersData.forEach((buyer) => {
      this.listOfBuyers[buyer.id] = {
        name: buyer.name
      }
    })

    this.productsData.forEach((product) => {
      this.listOfProducts[product.id] = {
        name: product.name
      }
    })

    this.ordersData.forEach((order) => {
      this.listOfOrders[orderNumber] = {
        id: order.id,
        buyer: this.listOfBuyers[order.buyerId].name,
        product: {
          amount: 1,
          name: this.listOfProducts[order.productId].name
        }
      };
      orderNumber += 1;
    });
  }

  async fetchData() {
    const [buyersResponse, ordersResponse, productsResponse] =
      await Promise.all([
        fetch(
          'https://my-json-server.typicode.com/Solnick/fake-orders-db/buyers',
        ),
        fetch(
          'https://my-json-server.typicode.com/Solnick/fake-orders-db/orders',
        ),
        fetch(
          'https://my-json-server.typicode.com/Solnick/fake-orders-db/products',
        ),
      ]);
    const [buyersData, ordersData, productsData] = await Promise.all([
      buyersResponse.json(),
      ordersResponse.json(),
      productsResponse.json(),
    ]);

    this.buyersData = buyersData;
    this.ordersData = ordersData;
    this.productsData = productsData;

    this.createOrder();

    this.buttonElement.addEventListener("click", () => {
      this.render();
    });
  }
}



export { OrderList };
