const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename: (req, file,cb)=>{
        const uniqueSuffix = Date.now() +'_'+ Math.round(Math.random()*1E9);
        cb(null,file.originalname + '_' + uniqueSuffix);
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'text/markdown'];
    const extName = /\.(jpeg|jpg|png|pdf|md)$/i.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.includes(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error('Only allowed images (JPEG, JPG, PNG), PDFs, and Markdown files.'));
    }
};


module.exports=multer({
    storage,
    limits:{
        fileSize:5*1024*1024
    },
    fileFilter
})
