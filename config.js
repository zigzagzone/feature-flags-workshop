const FEATURE = {
  "promo_code": false,
  "tax": false,
  "service_charge": false,
  "total": false,
}

module.exports = {
  isActive: function(name) {
    return FEATURE[name]
  }
}