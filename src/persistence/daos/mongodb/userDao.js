import { UserModel } from "./models/userModel.js";
import { createHash, isValidPassword } from '../../../utils/utils.js';
import logger from '../../../utils/logger.js'
import nonSensitiveUserDto from '../../dtos/nonSensitiveUserData.js'
import { OWNERDNI } from "../../../config.js";

export default class UserDaoMongoDB {
    async createUser (userData) {
        try {
            const {password, dni, email} = userData
            const existDni = await UserModel.findOne({dni});
            const existEmail = await UserModel.findOne({email});
            if(existDni) return 'credentialsRegistered'
            if(existEmail) return 'credentialsRegistered'
            if( userData.dni === OWNERDNI) userData.role = 'owner'
            const newUser = await UserModel.create({...userData, password: createHash(password)});
            const newUserDtoRes = new nonSensitiveUserDto(newUser)
            return newUserDtoRes
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
    
    async loginUser (userData) {
        try {
            const { email, password } = userData;
            const search = await UserModel.findOne({email});
            if(search){
                const passValidate = isValidPassword(password, search);
                if (!passValidate) return 'invalidPassword'
                else {
                    return search;
                };
            } else {
                return 'notRegistered';
            };
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };

    async getUserById (userId) {
        try {
            const response = await UserModel.findById(userId);
            if(!response){
                return null
            } else{
                return response
            };
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };

    async getUserByEmail (userEmail) {
        try {
            const response = await UserModel.findOne({userEmail});
            if(!response) {
                return null
            } else{
                return response
            };
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };

    async getUserByDni (userDni) {
        try {
            const response = await UserModel.findOne({userDni});
            console.log(response)
            if(!response) {
                return null
            } else{
                return response
            };
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
};