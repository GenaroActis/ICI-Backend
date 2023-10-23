import jwt from 'jsonwebtoken';
import UserDao from '../persistence/daos/mongodb/userDao.js';
import { PRIVATEKEYJWT } from '../config.js';
import logger from "../utils/logger.js";
import { HttpResponse } from '../utils/httpResponse.js';
const httpResponse = new HttpResponse();
const userDao = new UserDao();

export const generateToken = (user) =>{
    const payload = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dni: user.dni,
        role: user.role
    };
    const token = jwt.sign(payload, PRIVATEKEYJWT, {
        expiresIn: '40m'
    });
    return token;
};

export const checkAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) return httpResponse.Unauthorized(res, 'Unauthorized1');
    try {
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, PRIVATEKEYJWT);
        const user = await userDao.getUserById(decode.userId);
        if(!user) return httpResponse.Unauthorized(res, 'Unauthorized2');
        req.user = user;
        next();
    } catch (error) {
    logger.error(error);
    return httpResponse.Unauthorized(res, 'Unauthorized3');
    };
};

export const generateTokenToRecoverPass = (userEmail) =>{
    const token = jwt.sign(userEmail, PRIVATEKEYJWT, {
        expiresIn: '60m'
    });
    return token;
};

export const checkAuthToRecoverPass = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) return httpResponse.Unauthorized(res, 'Unauthorized');
    try {
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, PRIVATEKEYJWT);
        const user = await adminDao.getAdminByEmail(decode.email);
        if(!user) return httpResponse.Unauthorized(res, 'Unauthorized');
        req.email = user.email;
        next();
    } catch (error) {
    logger.error(error);
    return httpResponse.Unauthorized(res, 'Unauthorized');
    };
};