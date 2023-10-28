import { UserModel } from "./models/userModel.js";
import { createHash, isValidPassword } from '../../../utils/utils.js';
import logger from '../../../utils/logger.js'
import nonSensitiveUserDto from '../../dtos/nonSensitiveUserData.js'
import { OWNERDNI } from "../../../config.js";

export default class UserDaoMongoDB {
    async createUser (userData) {
        try {
            const {password, dni, email} = userData
            const existDni = await UserModel.findOne({dni: dni});
            const existEmail = await UserModel.findOne({email: email});
            if(existDni) return 'credentialsRegistered'
            if(existEmail) return 'credentialsRegistered'
            if(dni == OWNERDNI) userData.role = 'owner'
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
            const search = await UserModel.findOne({email : email});
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

    async recoverPassword (userData) {
        try {
            const { email, password } = userData
            const userSearch = await UserModel.findOne({email: email}); 
            const passwordValidate = isValidPassword(password, userSearch);
            if(passwordValidate) {
                return 'thePasswordsAreTheSame';
            } else {
                const newPassword = createHash(password);
                await UserModel.findByIdAndUpdate(userSearch._id, { password: newPassword });
                return 'passwordUpdated';
            };
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };

    async deleteUser (userId) {
        try {
            const response = await UserModel.findByIdAndDelete(userId);
            if(!response) return null
            const userDtoRes = new nonSensitiveUserDto(response)
            return userDtoRes
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
            const response = await UserModel.findOne({email : userEmail});
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
            const response = await UserModel.findOne({dni : userDni});
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

    async getAllUsers (page = 1, limit = 10, key, value, sortField = 'dni', sortOrder = 'desc') {
        try {
            const query = {};
            if(key && value){
                query[key] = value;
            };
            const options = {page, limit, sort:{}};
            if(sortField && sortOrder){
                options.sort[sortField] = sortOrder
            };
            const response = await UserModel.paginate(query, options);
            const usersDto = response.docs.map(user => new nonSensitiveUserDto(user));
            response.docs = usersDto;
            return response ;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };

    async changeRoleUser(userId) {
        try {
            const user = await this.getUserById(userId)
            if(user.role === 'teacher') {
                const response = await UserModel.updateOne(
                    {_id: user._id},
                    {$set: {role:'admin'}}
                );
                return response;
            };
            if(user.role === 'admin') {
                const response = await UserModel.updateOne(
                    {_id: user._id},
                    {$set: {role:'teacher'}}
                );
                return response;
            };
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
};