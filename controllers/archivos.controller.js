const multer = require('multer');
const { nanoid } = require("nanoid");

const subirArchivo = async (req, res, next) => {
    const configuracionMulter = {
        limits : { fileSize : req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${nanoid()}${extension}` );
            }
        })
    }
    
    const upload = multer(configuracionMulter).single('archivo');


    upload( req, res, async (error) => {
        console.log(req.file);

        if(!error) {
            res.status(201).json({archivo: req.file.filename });
        } else {
            console.log(error);
            return next();
        }
    });
};


const borrarArchivo = async (req, res) => {
  try {
    let id = req.params.id;

    return res.status(201).json({
      status: "success",
      message: "Archivo borrado",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error borrando archivo",
      error: error.message,
    });
  }
};

module.exports = { subirArchivo, borrarArchivo };
