const fs = require("fs");
const config = require('../config')
const PROMO_CODE = true;
const SERVICE_CHARGE = true;
const GLOBAL_DISCOUNT = false;

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
    if(config.isActive('tax')) {
      return +(order.subtotal * config.getConfig('tax_amount')).toFixed(2);
    } else {
      return 0
    }
  },
  // TODO: Implement this function
  getServiceChargeFromOrder: function(order) {
    return SERVICE_CHARGE ? order.subtotal * 0.1 : 0;
  },
  // TODO: Implement this function
  getTotalFromOrder: function(order) {
    const total =
      order.subtotal + order.service_charge + order.tax - order.discount;
    const globalDiscount = 0
    if(config.isActive('global_discount')) globalDiscount = total * 0.5
    return total - globalDiscount
  }
};
