import UserDaoMongoDB from "../persistence/daos/mongodb/userDao.js";
import TokenDaoMongoDB from '../persistence/daos/mongodb/tokenDao.js'
import { HttpResponse } from "../utils/httpResponse.js";
import { generateToken } from '../jwt/auth.js';
import logger from '../utils/logger.js';
import { FRONTURL } from "../config.js";
const userDao = new UserDaoMongoDB();
const tokenDao = new TokenDaoMongoDB();
const httpResponse = new HttpResponse();

export const registerUserController = async (req, res, next) =>{
    try {
        const { firstName, lastName, email, password, dni } = req.body;
        const user = { firstName, lastName, email, password, dni };
        const newUser = await userDao.createUser(user);
        if(newUser === 'credentialsRegistered') return httpResponse.Conflict(res, 'credentialsRegistered')
        tokenDao.deleteToken(req.body.tokenId);
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

export const recoverPasswordController = async(req, res, next)=>{
    try {
        const { email, password } = req.body;
        const recoverPass = await userDao.recoverPassword({email, password});
        if(recoverPass === 'thePasswordsAreTheSame') return httpResponse.Conflict(res, 'thePasswordsAreTheSame');
        if(recoverPass === 'passwordUpdated') {
            tokenDao.deleteToken(req.body.tokenId);
            return httpResponse.Ok(res, 'passwordUpdated');
        };
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const getTokenController = async (req, res, next) =>{
    try {
        const authHeader = req.get('Authorization');
        const token = await tokenDao.getToken(authHeader);
        if (!token) return httpResponse.Unauthorized(res, 'expiredToken');
        req.headers.authorization = `BearerAuth ${token}`;
        req.body.tokenId = authHeader;
        next();
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const deleteUserController = async (req, res, next) =>{
    try {
        const {userId} = req.params;
        const deletedUser = await userDao.deleteUser(userId);
        if(!deletedUser){
            logger.error(`user with id ${userId} not found`);
            return httpResponse.NotFound(res, 'userNotFound');
        } else {
            return httpResponse.Ok(res, deletedUser);
        };
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const getUsersController = async (req, res, next) =>{
    try {
        const { page, limit, key, value, sortField, sortOrder } = req.query;
        const allUsers = await userDao.getAllUsers(page, limit, key, value, sortField, sortOrder);
        const nextLink = allUsers.hasNextPage ? `${FRONTURL}/users/page=${allUsers.nextPage}` : null
        const prevLink = allUsers.hasPrevPage ? `${FRONTURL}/users/page=${allUsers.prevPage}` : null
        const usersFile = {
            results: allUsers.docs,
            info: {
                count: allUsers.totalDocs,
                pages: allUsers.totalPages,
                actualPage: allUsers.page,
                hasPrevPage: allUsers.hasPrevPage,
                hasNextPage: allUsers.hasNextPage,
                nextPageLink: nextLink,
                prevPageLink: prevLink
            }
        };
        return httpResponse.Ok(res, usersFile)
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const changeRoleUserController = async (req, res, next) =>{
    try {
        const {userId} = req.params;
        const updUser = await userDao.changeRoleUser(userId);
        if(updUser.acknowledged === false) return httpResponse.ServerError(res, updUser);
        return httpResponse.Ok(res, updUser);
    } catch (error) {
        logger.error(error);
        next(error);
    };
};