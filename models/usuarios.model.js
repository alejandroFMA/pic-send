const { Schema, model } = require("mongoose");


const UsuariosSchema = Schema({

  email: {
    type: String,
    required: true,
    unique:true,
    lowercase: true,
    trim:true
  },

  nombre: {
    type: String,
    required: true,
    trim:true
  },

  password:{
    type:String,
    required:true,
    trim:true
  },
  
  created_at: {
    type: Date,
    default: Date.now,
  }
});

module.exports = model("Usuarios", UsuariosSchema)
