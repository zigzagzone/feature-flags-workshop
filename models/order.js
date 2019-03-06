const fs = require("fs");
const PROMO_CODE = true;
const SERVICE_CHARGE = true;

module.exports = {
  findOrderById: function(id) {
    const orders = fs.readFileSync("./orders.json", "utf8");
    return JSON.parse(orders).find(function(order) {
      return order.id == id;
    });
  },
  getSubtotalFromOrder: function(order) {
    return order.order_items.reduce(function(acc, cur) {
      return (acc += cur.quantity * cur.price);
    }, 0);
  },
  getDiscountFromOrder: function(order) {
    const { promo_code, subtotal } = order;
    let discount = 0;

    if (PROMO_CODE) {
      switch (promo_code) {
        case "FULLSTACK":
          discount = 10;
          break;
        case "5MAR":
          discount = 5;
          break;
        default:
          break;
      }
    }

    return subtotal * (discount / 100);
  },
  // TODO: Implement this function
  getTaxFromOrder: function(order) {
    return +(order.subtotal * 0.07).toFixed(2);
  },
  // TODO: Implement this function
  getServiceChargeFromOrder: function(order) {
    return SERVICE_CHARGE ? order.subtotal * 0.1 : 0;
  },
  // TODO: Implement this function
  getTotalFromOrder: function(order) {
    const total =
      order.subtotal + order.service_charge + order.tax - order.discount;
    return total - total * 0.5;
  }
};
