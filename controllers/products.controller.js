const productModel = require("../models/products.model")
exports.getProducts=async(req,res)=>{
    try {
        let dataproducts = await productModel.find();
        res.json(dataproducts)
    } catch (error) {
        console.log(error);
        res.send({ error: "Ha ocurrido algo inesperado, comuncate con el admin" });
    }
}
exports.getOneProduct=async(req,res)=>{
    try {
        let id = req.params.id;
        if (id.length == 24) {
            let product = await productModel.findOne({_id:id})
            if (product) {
              res.send({error: "No se encuentra el producto"})  
            }else{
                res.send({ error: "No se encuentra el producto" });
            }
        }else{
            res.send({ error: "ID incorrecto" });
        }
    } catch (error) {
        console.log(error);
        res.send({ error: "Ha ocurrido algo inesperado, comuncate con el admin" });
    }
}
exports.addProduct=async(req,res)=>{
    try {
        let newProduct = new productModel(product);
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        console.log(error);
        res.send({ error: "Ha ocurrido algo inesperado, comuncate con el admin" });
    }
}
exports.deleteProduct=async(req,res)=>{
    try {
        let id = req.params.id
        if (id.length == 24) {
            let product = await productModel.findById(id)
            if (product) {
                let deletedProduct = await productModel.findOneAndDelete({ _id: id });
                res.json(deletedProduct);
            }else{
                res.send({ error: "No se encuentra ningun producto" });
            }
        }else{
            res.send({error: "No se encuentra ningun producto"})
        }   
    } catch (error) {
        console.log(error);
    res.send({ error: "Ha ocurrido algo inesperado, comuncate con el admin" });
    }
}