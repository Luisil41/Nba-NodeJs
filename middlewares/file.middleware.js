const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const ACCEPTED_FILES_EXTENSIONS = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        callback(null, fileName);
    },
    destination: (req, file, cb) => {
        const directory = path.join(__dirname, '../public/uploads');
        cb(null, directory);
    },
});

const fileFilter = (req, file, cb) => {
    console.log(file);
    if (!ACCEPTED_FILES_EXTENSIONS.includes(file.mimetype)) {
        const error = new Error('invalad file type');
        error.status = 400;

        return cb(error, true);
    }
    return cb(null, true);
};


const upload = multer({
    storage,
    fileFilter,
});

const uploadToCloudinary = async (req, res, next) => {
    if(req.file) {
        const path = req.file.path;
        // Si tengo archivo, lo subo a cloudinary
        const avatar = await cloudinary.uploader.upload(path);
        
        // Cojo la url que me devuelve cloudinary y lo meto al req.fileUrl para poder recibirlo en el controlador
        req.fileUrl = avatar.secure_url;

        // Eliminamos el archivo de nuestro servidor.
        await fs.unlinkSync(path);

        return next();
    } else {
        // No lo subo a cloudinary
        return next();
    }
};


module.exports = { upload, uploadToCloudinary };
