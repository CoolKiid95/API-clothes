const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    telefono:{
        type: Number,
        required: true,
        default: 0
    }
})

module.exports=mongoose.model('user', userModel)

/*

{
    "nombre":"Diego",
    "apellido":"Delgado",
    "email":"diegoal.delgado@gmail.com",
    "password":"asdfasdf1*",
    "telefono":"3125302489"
}

    */