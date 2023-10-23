import UserDaoMongoDB from "../persistence/daos/mongodb/userDao.js";
import { HttpResponse } from "../utils/httpResponse.js";
import { generateToken } from '../jwt/auth.js';
import logger from '../utils/logger.js';
const userDao = new UserDaoMongoDB();
const httpResponse = new HttpResponse();

export const registerUserController = async (req, res, next) =>{
    try {
        const { firstName, lastName, email, password, role, dni } = req.body;
        const user = { firstName, lastName, email, password, role, dni };
        const newUser = await userDao.createUser(user);
        if(newUser === 'credentialsRegistered') return httpResponse.Conflict(res, 'credentialsRegistered')
        return httpResponse.Ok(res, newUser);
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const loginUserController = async (req, res, next) =>{
    try {
        const { email, password } = req.body;
        const search = await userDao.loginUser({email, password});
        if(search === 'invalidPassword') return httpResponse.BadRequest(res, 'invalidCredentials');
        if(search === 'notRegistered') return httpResponse.BadRequest(res, 'notRegistered');
        const accessToken = generateToken(search);
        res.status(200)
        .header('Authorization', accessToken)
        .json({
            status: 200,
            message: 'Success',
            data: accessToken
        });
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

