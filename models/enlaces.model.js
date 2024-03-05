const { Schema, model } = require("mongoose");

const EnlacesSchema = Schema({
  url: {
    type: String,
    required: true,
  },

  nombre: {
    type: String,
    required: true,
  },

  nombre_original: {
    type: String,
    required: true,
  },

  descargas: {
    type: Number,
    default:1
  },

  autor: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    default: null,
  },
  password: {
    type: String,
    default: null
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Enlaces", EnlacesSchema);
