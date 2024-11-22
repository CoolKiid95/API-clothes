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
        let product = req.body
        let ownerid = req.usuario.id
        let roll = req.usuario.roll
        if (roll == ("user")|| ("SuperAdmin")) {
            
            let newProduct = new productModel(product);
            newProduct.owner = ownerid
            await newProduct.save();
            res.json(newProduct);
        }else{
            res.status(500).send({error: "Roll no es el correcto"})
        }
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
exports.updateProduct=async(req,res)=>{
    try {
        let id = await req.params.id
        let body = req.body
        if (id.length==24) {
            let product = await productModel.findById(id)
            if (product) {
                Object.assign(product, body)
                await productModel.findOneAndUpdate({_id:id})
                res.status(200).send("producto modificado")
            }
        }else{
            res.status(400).send({msj:"Id no contiene los caracteres sufucientes"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Ha ocurrido un error, comunicate con el admin"})
    }
}
exports.getProductByOwner=async(req, res)=>{
    try {
        let owner = req.params.id
        if (owner.length==24) {
            let myproducts = await productModel.find({owner:owner})
            res.json(myproducts)
        }else{
            res.send({error:"ID incorrecto" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Ha ocurrido un error, comunicate con el admin"})
    }
}