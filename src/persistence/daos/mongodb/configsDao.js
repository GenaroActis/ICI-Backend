import { ConfigsModel } from "./models/configsModel.js";
import logger from "../../../utils/logger.js";

export default class ConfigsDaoMongoDB{
    async createConfig (config){
        try {
            const response = await ConfigsModel.create(config);
            return response;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
    async getConfig (key){
        try {
            const response = await ConfigsModel.findOne({key: key});
            return response;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
    async updateConfig (key, newValue){
        try {
            const response = await ConfigsModel.updateOne(
                {key: key},
                {$set: {value: newValue}}
            );
            return response;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
};