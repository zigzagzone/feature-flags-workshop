//config.js 
const FEATURE = {
    promo_code: false,
    tax: true,
    service_charge: true,
    total: false
}

module.exports = {
    isActive: function(name) {
        return FEATURE[name]
    }
}
