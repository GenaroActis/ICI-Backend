import ConfigsDaoMongoDB from "../persistence/daos/mongodb/configsDao.js";
import { HttpResponse } from "../utils/httpResponse.js";
import logger from "../utils/logger.js";
const configsDao = new ConfigsDaoMongoDB()
const httpResponse = new HttpResponse();

export const createConfigController = async (req, res, next) =>{
    try {
        const newConfig = req.body;
        const response = await configsDao.createConfig(newConfig);
        if(!response) return httpResponse.BadRequest(res, 'configCreateError');
        return httpResponse.Ok(res, response)
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const getConfigController = async (req, res, next) =>{
    try {
        const {key} = req.params;
        const response = await configsDao.getConfig(key);
        if(!response) return httpResponse.NotFound(res, 'configNotFound');
        return httpResponse.Ok(res, response);
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const updateConfigController = async (req, res, next) =>{
    try {
        const {key, newValue} = req.body;
        const response = await configsDao.updateConfig(key, newValue);
        if(!response) return httpResponse.BadRequest(res, 'updateConfigError');
        return httpResponse.Ok(res, response);
    } catch (error) {
        logger.error(error);
        next(error);
    };
};