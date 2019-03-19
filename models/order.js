const fs = require('fs')
const config = require('../config')

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
    let promo_code = order.promo_code
    let promo = 0
    if(config.isActive("promo_code")){
      if(promo_code == "fullstackjs"){
        promo = order.subtotal * 0.1
      }else if(promo_code == "19mar"){
          promo = order.subtotal * 0.05
      }
    }
    return promo
  },
  // TODO: Implement this function
  getTaxFromOrder: function(order) {
    return (order.subtotal * 0.07).toFixed(2)
  },
  // TODO: Implement this function
  getServiceChargeFromOrder: function(order) {
    if(config.isActive('service_charge')){
      return (order.subtotal * 0.1)
    }else {
      return 0
    }
  },
  // TODO: Implement this function
  getTotalFromOrder: function(order) {
    const total = (parseFloat(order.subtotal) - parseFloat(order.discount)) + parseFloat(order.tax) + parseFloat(order.service_charge)
    return total
  }
}
