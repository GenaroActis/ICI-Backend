import jwt from 'jsonwebtoken';
import UserDaoMongoDB  from '../persistence/daos/mongodb/userDao.js';
import { PRIVATEKEYJWT } from '../config.js';
import logger from "../utils/logger.js";
import { HttpResponse } from '../utils/httpResponse.js';
const httpResponse = new HttpResponse();
const userDao = new UserDaoMongoDB();

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
        expiresIn: '60m'
    });
    return token;
};

export const checkAuth = async (req, res, next) => {
    const authHeader = req.get('authorization');
    if(!authHeader) return httpResponse.Unauthorized(res, 'Unauthorized');
    try {
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, PRIVATEKEYJWT);
        const user = await userDao.getUserById(decode.userId);
        if(!user) return httpResponse.Unauthorized(res, 'Unauthorized');
        req.user = user;
        next();
    } catch (error) {
    logger.error(error);
    return httpResponse.Unauthorized(res, 'Unauthorized');
    };
};

export const generateToken2hr = (userEmail) =>{
    const token = jwt.sign(userEmail, PRIVATEKEYJWT, {
        expiresIn: '120m'
    });
    const obj = {token: token};
    return obj;
};

export const checkAuthToRecoverPass = async (req, res, next) => {
    const authHeader = req.get('authorization');
    if(!authHeader) return httpResponse.Unauthorized(res, 'Unauthorized');
    try {
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, PRIVATEKEYJWT);
        const user = await userDao.getUserByEmail(decode.email);
        if(!user) return httpResponse.Unauthorized(res, 'Unauthorized');
        req.email = user.email;
        next();
    } catch (error) {
    logger.error(error);
    return httpResponse.Unauthorized(res, 'Unauthorized');
    };
};

export const checkAuthRegisterTeacher = async (req, res, next) => {
    const authHeader = req.get('authorization');
    if(!authHeader) return httpResponse.Unauthorized(res, 'Unauthorized');
    try {
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, PRIVATEKEYJWT);
        if(!decode) return httpResponse.Unauthorized(res, 'Unauthorized');
        next();
    } catch (error) {
    logger.error(error);
    return httpResponse.Unauthorized(res, 'Unauthorized');
    };
};