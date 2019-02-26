const fs = require('fs')

module.exports = {
  findOrderById: function(id) {
    const orders = fs.readFileSync('./orders.json', 'utf8')
    return JSON.parse(orders).find(function(order) {
      return order.id == id
    })
  },
  getSubtotalFromOrder: function(order) {
    return order.order_items.reduce(function(acc, cur) {
      return acc += cur.quantity * cur.price
    }, 0)
  },
  // TODO: Implement this function
  getDiscountFromOrder: function(order) {
    return 0
  },
  // TODO: Implement this function
  getTaxFromOrder: function(order) {
    return 0
  },
  // TODO: Implement this function
  getServiceChargeFromOrder: function(order) {
    return 0
  },
  // TODO: Implement this function
  getTotalFromOrder: function(order) {
    return 0
  }
}
