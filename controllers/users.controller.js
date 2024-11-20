const userModel = require("../models/users.model")
exports.getusers=async(req,res)=>{
    try {
        let data = await userModel.find()
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Ha ocurrido un error comunicate con el admin"})
        
    }
}
exports.getOneuser=async(req,res)=>{
    try {
        let id = req.params.id
        let user = await userModel.findOne({_id:id})
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Ha ocurrido un error comunicate con el admin"})
    }
}
exports.addUser=async(req,res)=>{
  try {
    let regexEmail = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/
    let email = req.body.email
    
    if (regexEmail.test(email)) {
        let exist = await userModel.findOne({email: email})
        if (!exist) {
            let user = req.body
            let newUser = new userModel(user)
            await newUser.save()
            res.status(201).json(newUser)
        } else {
            res.status(400).send({msj:"Correo ya existe"})
        }
    } else {
        res.status(400).send({error:"Correo Invalido"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({error:"ha ocurrido un error comunicate con el admin"})
  }
}
exports.deleteUser=async(req,res)=>{

}