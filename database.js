function saveOrderToDB(order) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}

function deleteOrderFromDB(orderId) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders = orders.filter(order => order.id !== orderId);
    localStorage.setItem("orders", JSON.stringify(orders));
}
