const proxy = require('@sap/cds-odata-v2-adapter-proxy')
const cds = require('@sap/cds')
cds.on('bootstrap', app => app.use(proxy()))
// cds.before ('CREATE','Cetegories', (req)=>{
//     // const order = req.data
//     // if (order.quantity > 11)  throw 'Order quantity must not exceed 11'
//   })
module.exports = cds.server