import { TokenModel } from "./models/tokenModel.js";
import logger from '../../../utils/logger.js';

export default class TokenDaoMongoDB {
    async saveToken(token){
        try {
            const response = await TokenModel.create(token);
            return response;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
    async deleteToken(tokenId){
        try {
            const response = await TokenModel.findByIdAndDelete(tokenId);
            return response;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
    async getToken(tokenId){
        try {
            const response = await TokenModel.findById(tokenId);
            if(!response) return null
            return response.token;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
};