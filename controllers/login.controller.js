const userModel = require('../models/users.model')
// const jwt = require('jsonwebtoken')
exports.login = async (req, res)=>{
    try {
        let infoUser = req.body
        let user = await userModel.findOne({email: infoUser.email})

        if (user) {
            let clave = infoUser.password
            if (user.password == clave) {
                res.status(200).send({msj:"ingreso correcto"})
            }else{
                res.status(400).send({msj:"Credenciales invalidas"})
            }
        }else{
            res.status(400).send({msj:"Credenciales invalidas"})
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({error: "Ha ocurrido algo comunicate con el admin"})
        
    }
}