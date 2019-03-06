const FEATURE = {
  "promo_code": false,
  "tax": true,
  "service_charge": false,
  "total": false,
  "tax_amount": 0.07,
  "global_discount": true,
}

module.exports = {
  isActive: function(name) {
    return FEATURE[name]
  },
  getConfig: function(name) {
    return FEATURE[name]
  }
}