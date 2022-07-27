const { softDeletePlugin } = require('soft-delete-plugin-mongoose');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
productName:{
         type:String,
         unique:true
},
productCode:{
        type:String,
        unique:true

},
dosageForm:{
        type:String

},
packingForm:{
        type:String
},
packingDisplay:{
        type:String
},
packingSize:{
       type:String
},
weight:{
        type:String
},
care: {
         type: Boolean 

},

salt: { 
        type: String 
},

saltGroup: {
         type: String 
},

speciality: {
        type:String
},

manufacturer: { 
        type: String 
},

mrp: {
        type: String 
},

priceToCustomer: {
         type: String
},

discount_from_MRP: { 
        type: String 
},

taxPercentage: {
         type: String 
},

condition: {
        type:String
},

homepageCategory: { 
        type: String 
},

hsn: {
         type: String 
        },

countryOfOrigin: { 
        type: String 
},

strength: { 
        type: String 
},
stock: {
         type: Boolean 
},

prescriptionRequired: { 
        type: Boolean 
},

visibility: {
         type: Boolean 
        },

pap: {
         type: Boolean 
        },

papOffer: { 
        type: String 
},  

abcd: { type: String },

uploadImages: { type: String }

},{timestamps:true})
productSchema.plugin(softDeletePlugin);
const product = mongoose.model('product', productSchema)
module.exports = product