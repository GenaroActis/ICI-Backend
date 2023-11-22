import multer from 'multer';
const date = new Date();
const formattedDate = date.toISOString().split('T')[0];

const paymentStorage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, `./src/public/paymentReceipt`)
    },
    filename: (req, file, cb) =>{
        const fileOriginalName = file.originalname.replace(/\s+/g, '');
        cb(null, formattedDate + fileOriginalName);
    }
});

export const uploadPayment = multer({
    storage: paymentStorage
});