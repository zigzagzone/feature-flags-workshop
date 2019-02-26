const express = require('express')
const {
  findOrderById,
  getSubtotalFromOrder,
  getDiscountFromOrder,
  getTaxFromOrder,
  getServiceChargeFromOrder,
  getTotalFromOrder
} = require('./models/order')

const PORT = process.env.PORT || 3000

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/orders/:id', function(request, response) {
  const { id } = request.params
  const { promo_code } = request.query
  const order = findOrderById(id)

  order.subtotal = getSubtotalFromOrder(order)

  // TODO: Calculate discount from promocode
  order.promo_code = promo_code
  order.discount = getDiscountFromOrder(order)

  // TODO: Calculate tax
  order.tax = getTaxFromOrder(order)

  // TODO: Calculate service charge
  order.service_charge = getServiceChargeFromOrder(order)

  // TODO: Calculate total
  order.total = getTotalFromOrder(order)

  response.render('orders/show', { order })
})

app.listen(PORT)
