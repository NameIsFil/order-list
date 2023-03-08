class OrderList {
    orderListElement = document.querySelector('#order-List');
    buyersData;
    ordersData;
    productsData;

    listOfOrders;
    listOfBuyers;

    constructor() {
        this.fetchData();
        console.log(this.buyersData);
        console.log(this.ordersData);
        console.log(this.productsData);
    }

    createOrderTile(order, buyer) {
        const tile = document.createElement('div');
        tile.style.border = '1px solid black';
        tile.style.width = '200px';
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

    createOrder() {
        this.listOfOrders = {};
        this.listOfBuyers = {};
        this.ordersData.forEach((order) => {
            console.log(order);
        })
    }

    render() {

    }

    async fetchData() {
        const [buyersResponse, ordersResponse, productsResponse] = await Promise.all([
            fetch('https://my-json-server.typicode.com/Solnick/fake-orders-db/buyers'),
            fetch('https://my-json-server.typicode.com/Solnick/fake-orders-db/orders'),
            fetch('https://my-json-server.typicode.com/Solnick/fake-orders-db/products')
        ]);
        const [buyersData, ordersData, productsData] = await Promise.all([buyersResponse.json(), ordersResponse.json(), productsResponse.json()]);

        this.buyersData = buyersData;
        this.ordersData = ordersData;
        this.productsData = productsData;
    }
}

export {OrderList};