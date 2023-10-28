import { createTransport,  } from 'nodemailer';
import { OWNERMAIL, NODEMAILERPASS, FRONTURL } from '../config.js';
import { HttpResponse } from '../utils/httpResponse.js';
import logger from "../utils/logger.js";
import UserDaoMongoDB from '../persistence/daos/mongodb/userDao.js';
import { generateToken2hr } from '../jwt/auth.js';
import TokenDaoMongoDB from '../persistence/daos/mongodb/tokenDao.js';
const userDao = new UserDaoMongoDB();
const tokenDao = new TokenDaoMongoDB();
const httpResponse = new HttpResponse();

export const teacherRegistrationEmailController = async (req, res, next) =>{
    try {
        const { teacherEmail } = req.body;
        const validateToken = generateToken2hr(req.body);
        const saveToken = await tokenDao.saveToken(validateToken);
        const transporter = createTransport({
            service: 'gmail',
            port: 465,
            scure: true,
            auth: {
                user: OWNERMAIL,
                pass: NODEMAILERPASS
            }
        });
        //////
        const mailOptions = {
            from: OWNERMAIL,
            to: teacherEmail,
            subject: 'Email registro ICI',
            html: `
            <div class='card'>
                <h1>Ingresa al siguiente link y completa el formulario</h1>
                <a href=${FRONTURL}/teacher/${saveToken._id} >Registrarse</a>
            </div>
            `
        };
        const response = await transporter.sendMail(mailOptions);
        if(!response){
            logger.error('error send register teacher mail');
            return httpResponse.ServerError(res, 'error send register teacher mail');
        } else {
            return httpResponse.Ok(res, 'sentSuccessfully');
        };
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const sendRecoverPasswordEmailController = async (req, res, next) =>{
    try {
        const userEmail = req.body.email;
        const existenceValidation = await userDao.getUserByEmail(userEmail);
        if(!existenceValidation) return httpResponse.NotFound(res, 'theMailIsNotRegistered');
        const validateToken = generateToken2hr(req.body);
        const saveToken = await tokenDao.saveToken(validateToken);
        const transporter = createTransport({
            service: 'gmail',
            port: 465,
            scure: true,
            auth: {
                user: OWNERMAIL,
                pass: NODEMAILERPASS
            }
        });
        // // //
        const gmailOptions = {
            from: OWNERMAIL,
            to: userEmail,
            subject: 'Recupera tu contraseña!!',
            html: `
            <div class='card'>
                <h1>Si no has solicitado el cambio de contraseña ignora este email</h1>
                <a href=${FRONTURL}/recover/${saveToken._id}>Recuperar Contraseña</a>
            </div>
            `
        };
        const response = await transporter.sendMail(gmailOptions);
        if(!response) {
            logger.error('error sent recover email');
            return httpResponse.ServerError(res, 'error sent recover email');
        } else {
            return httpResponse.Ok(res, 'sentSuccessfully');
        };
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const sendPaymentEmail = async (req, res, next) =>{
    try {
        const userEmail = req.body.email;
        const transporter = createTransport({
            service: 'gmail',
            port: 465,
            scure: true,
            auth: {
                user: OWNERMAIL,
                pass: NODEMAILERPASS
            }
        });
        const gmailOptions = {
            from: OWNERMAIL,
            to: userEmail,
            subject: 'Efectua el pago de tu Inscripcion!!',
            html: `
            <div class='card'>
                <h1></h1>
                <a href=/recover>Recuperar Contraseña</a>
            </div>
            `
        };
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

