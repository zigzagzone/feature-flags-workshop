//config.js 
const FEATURE = {
    promo_code: false,
    tax: false,
    service_charge: true,
    total: true
}

module.exports = {
    isActive: function(name) {
        return FEATURE[name]
    }
}
