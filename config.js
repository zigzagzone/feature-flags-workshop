//config.js 
const FEATURE = {
    promo_code: true,
    tax: false,
    service_charge: false,
    total: true
}

module.exports = {
    isActive: function(name) {
        return FEATURE[name]
    }
}
