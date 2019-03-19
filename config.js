//config.js 
const FEATURE = { 
    promo_code: true,
    tax: false,
    service_charge: true,
    total: false
}

module.exports = {
    isActive: function(name) {
        return FEATURE[name]
    }
}
