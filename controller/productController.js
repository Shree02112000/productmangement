
const product=require('../models/product')

//create Product
    
const createProduct=async(req,res)=>{
    try {
        let{productName,productCode}=req.body;

        const productExist =await product.findOne({$or:[{productName:productName},{productCode:productCode}] });
        if(productExist){
            return res.status(200).json({
                message:"product already exists"
            })
        }else{
            let createBody = {
                productName: req.body.productName,
                productCode: req.body.productCode,
                dosageForm: req.body.dosageForm,
                packingForm: req.body.packingForm,
                packingDisplay: req.body.packingDisplay,
                packingSize: req.body.packingSize,
                weight: req.body.weight,
                care: req.body.care,
                salt: req.body.salt,
                saltGroup: req.body.saltGroup,
                speciality: req.body.speciality,
                manufacturer: req.body.manufacturer,
                mrp: req.body.mrp,
                priceToCustomer: req.body.priceToCustomer,
                discount_from_MRP: req.body.discount_from_MRP,
                taxPercentage: req.body.taxPercentage,
                condition: req.body.condition,
                homepageCategory: req.body.homepageCategory,
                hsn: req.body.hsn,
                countryOfOrigin: req.body.countryOfOrigin,
                strength: req.body.strength,
                stock: req.body.stock,
                prescriptionRequired: req.body.prescriptionRequired,
                visibility: req.body.visibility,
                pap: req.body.pap,
                papOffer: req.body.papOffer,
                abcd: req.body.abcd

            }
            if (!req.body.pap) {
                delete createBody.papOffer
            }
            var Product = new product(createBody)
            var productCreation = await Product;
            if (productCreation) {
                productCreation.save();
                return res.status(200).json({ message: "Product Added Successfully :)" });
            }
        }

        
    } catch (error) {
        
    console.log(error)       
    }
}

//update Product

const updateProduct = async(req, res) => {
    try {
        const productExist = await product.findOne({ productCode: req.body.productCode, productName: req.body.productName, _id: { $ne: req.params.id } });
        if (productExist) {
            return res.status(200).json({ message: "Product Details Already Exists" });
        } else {
            const updated_product = await product.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    productName: req.body.productName,
                    productCode: req.body.productCode,
                    dosageForm: req.body.dosageForm,
                    packingForm: req.body.packingForm,
                    packingDisplay: req.body.packingDisplay,
                    packingSize: req.body.packingSize,
                    weight: req.body.weight,
                    care: req.body.care,
                    salt: req.body.salt,
                    saltGroup: req.body.saltGroup,
                    speciality: req.body.speciality,
                    manufacturer: req.body.manufacturer,
                    mrp: req.body.mrp,
                    priceToCustomer: req.body.priceToCustomer,
                    discount_from_MRP: req.body.discount_from_MRP,
                    taxPercentage: req.body.taxPercentage,
                    condition: req.body.condition,
                    homepageCategory: req.body.homepageCategory,
                    hsn: req.body.hsn,
                    countryOfOrigin: req.body.countryOfOrigin,
                    strength: req.body.strength,
                    stock: req.body.stock,
                    prescriptionRequired: req.body.prescriptionRequired,
                    visibility: req.body.visibility,
                    pap: req.body.pap,
                    papOffer: req.body.papOffer,
                    abcd: req.body.abcd
                }
            }, { new: true });
            return res.status(200).json({ message: 'Product details updated', updated_product });
        }
    } catch (err) {
        return res.status(401).json({message:err})
    }
}

//get products

const getProduct = async(req,res)=>{
    try {
    const gettingproduct = await product.findByid(req.params.id)
    if(!req.params.id){
        return res.status(404).json({message:"Product not found"})}
    return res.json(product)    
         
    } 
    catch (error) {
        console.log(error)
    }
}

//search products
const searchProduct = async(req, res) => {
    const { search } = req.query

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const start = (page - 1) * limit
    const end = page * limit

    const results = {}

    if (start > 0) {
        results.previous = {
            page: page - 1
        }
    }

    results.products = await product.find({
        $or: [
            { productName: { $regex: `${search}`,
                              $options: "i" } },
            { productCode: { $regex: `${search}`
                            , $options: "i" } }
        ]
    }).sort({ productName: 1 }).limit(limit).skip(start).exec()

    if (end < await product.countDocuments().exec()) {
        results.next = {
            page: page + 1
        }
    }
    if (!results.products) {
        return res.status(404).json({ error: "No results found" })
    }
    return res.status(200).json(results)
}

 //soft delete 
 const softDeleteProduct = async(req, res) => {
    try {
        const deletedElements = await product.softDelete({ _id: req.params._id })
        if (!req.params._id) {
            return res.status(404).json({ error: "Product not found" })
        }
        return res.status(200).json({ message: "Product Deleted", deletedElements })
    } catch (err) {
        console.log(err)
    }
}
module.exports = { createProduct, updateProduct, getProduct, softDeleteProduct, searchProduct }

